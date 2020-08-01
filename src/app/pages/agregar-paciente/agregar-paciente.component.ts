import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Usuario , Paciente, Centro_Medico, Aseguranza } from '../../models/Modelos';
import { Observable, BehaviorSubject,forkJoin, fromEvent,of} from 'rxjs';
import { RestService } from '../../services/rest.service';
import { SearchPacienteResponse,SearchPacienteRequest,SearchObject } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { SeleccionarDoctorComponent } from '../../components/seleccionar-doctor/seleccionar-doctor.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent extends BaseComponent implements OnInit {
	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	file:File = null;
	show_import:boolean = false;
	centro_medico:Centro_Medico;
	usuario:Usuario = {
		id_organizacion: null,
		id_imagen: null,
		contrasena: '',
		correo_electronico:'',
		factura_rfc:'',
		factura_razon_social:'',
		factura_codigo_postal:'',
		tipo: 'PACIENTE',
		id_aseguranza: null
	};
	paciente:Paciente = {
		id:null,
		id_organizacion:null,
		nombre:'',
		apellidos:'', 
		sexo:'',
		fecha_nacimiento:'',
		telefono:'',
//		domicilio: '',
	};

	confirmar_contrasena:string = '';
	aseguranzas:Aseguranza[]=[];

	ngOnInit()
	{
		this.centro_medico = this.rest.getCurrentCentroMedico();
		this.route.paramMap.subscribe( params =>{
			this.usuario.id_centro_medico = this.centro_medico.id;
			this.usuario.id_organizacion = this.centro_medico.id_organizacion;
			this.paciente.id_organizacion = this.usuario.id_organizacion
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			this.is_loading = true;
			console.log('el id de usuario',id);
			if( id )
			{
				forkJoin([
					this.rest.usuario.get( id )
					,this.rest.paciente.search({ eq:{ id_usuario: id } })
					// ,this.rest.aseguranza.getAll({}) ,
				])
				.subscribe((responses)=>
				{
					this.is_loading = false;
					this.usuario	= responses[0];
					this.paciente	= responses[1].datos[0];
					// this.aseguranzas = responses[2].datos;
				}
				,(error)=>
					this.showError(error));
			}else{
				forkJoin([
					this.rest.aseguranza.getAll({}),
				])
				.subscribe((responses)=>
				{
			
					this.aseguranzas = responses[0].datos;
					this.is_loading = false;
				}
				,(error)=>
					this.showError(error));
			}
				this.is_loading= false;

		});
	}

	registrarse()
	{
		console.log('paciente',this.paciente,'usuario',this.usuario);
		this.is_loading = true;
		if( this.usuario.id )
		{
		// 	forkJoin([
		// 		this.rest.usuario.create( this.usuario )
		// 		,this.rest.paciente.create(this.paciente)
		// 	])
		// 	.subscribe((responses)=>
		// 	{
		// 		this.is_loading = false;
		// 		this.router.navigate(['/pacientes']);
		// 	}
		// 	,(error)=>
		// 		this.showError(error));
		forkJoin([
			this.rest.usuario.update( this.usuario )
			,this.rest.paciente.update(this.paciente )
		]).subscribe(
			(responses)=>
			{
				this.router.navigate(['/pacientes']);
			}
			,(error)=>
			{
				this.showError( error );
			}
		);

		}
		else
		{
			this.rest.registrarUsuarioPaciente( this.usuario, this.paciente ).subscribe((usuario)=>
			{
				this.is_loading = false;
				this.router.navigate(['/pacientes']);
			}, error=> this.showError(error) );
		}

	}

	uploadImage(evt) {
		if (evt.target.files.length) {
			this.rest.uploadImage(evt.target.files[0], false).subscribe((imageData) => {
				this.usuario.id_imagen = imageData.id;
			}, error => this.showError(error));
		}
	}
	onFileChanged(event)
	{
		if (event.target.files.length)
		{
			this.file = event.target.files[0];
		}
	}


	uploadFile()
	{
		this.is_loading = true;
		this.rest.xlsx2json( this.file,["nombre","apellidos","telefono","correo_electronico","fecha_nacimiento","sexo","domicilio"]).then((json)=>
		{
			//Filter json then upload
			console.log(json);
			json.forEach(lista => {
				console.log(lista);
				 let centro_medico = this.rest.getCurrentCentroMedico();
				this.usuario = {
					id_centro_medico: centro_medico.id,
					id_imagen: null,
					contrasena:lista.correo_electronico? lista.correo_electronico:lista.telefono,
					correo_electronico:lista.correo_electronico,
					usuario:lista.correo_electronico? lista.correo_electronico:lista.telefono,
					factura_rfc:'',
					factura_razon_social:'',
					factura_codigo_postal:'',
					tipo:'PACIENTE',
					id_aseguranza: null
				};
				// let fecha_nacimiento = lista.fecha_nacimiento?this.rest.getMysqlStringFromLocaDate(lista.fecha_nacimiento):'';
				// console.log(fecha_nacimiento);
				// let fecha_nacimiento = new Date(this.rest.getDateFromMysqlString(lista.fecha_nacimiento));
				this.paciente = {
					id_organizacion:centro_medico.id_organizacion,
					nombre:lista.nombre,
					apellidos:lista.apellidos, 
					sexo:lista.sexo,
					fecha_nacimiento: lista.fecha_nacimiento?lista.fecha_nacimiento: null,
					telefono:lista.telefono,
					domicilio: lista.domicilio,
				};

				this.rest.registrarUsuarioPacienteImport( this.usuario, this.paciente ).subscribe((usuario)=>
				{
					this.is_loading = false;
					this.router.navigate(['/pacientes']);
				}, error=> this.showError(error) );

			});
			// this.rest.cliente.batchUpdate(json).subscribe((result)=>
			// {
			// 	if( this.pacientes.length == 0 )
			// 	{
			// 		this.setPages( 0, result.length );
			// 		this.pacientes = result.slice(0,this.pageSize);
			// 	}
			// 	this.is_loading =  false;
            //     this.show_import = false;
            //     this.showSuccess('Imported succesfully '+result.length+' items');

			// },(error)=>this.showError(error));
		});
	}

	
}
