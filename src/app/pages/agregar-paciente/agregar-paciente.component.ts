import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Usuario , Paciente, Centro_Medico } from '../../models/Modelos';
import { Observable, BehaviorSubject,forkJoin, fromEvent,of} from 'rxjs';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent extends BaseComponent implements OnInit {
	centro_medico:Centro_Medico;
	usuario:Usuario = {
		id_organizacion: 1,
		id_imagen: null,
		contrasena: '',
		correo_electronico:'',
		factura_rfc:'',
		factura_razon_social:'',
		factura_codigo_postal:'',
		tipo: 'PACIENTE'
	};
	paciente:Paciente = {
		id:null,
		id_organizacion:1,
		nombre:'',
		apellidos:'', 
		sexo:'',
		fecha_nacimiento:'',
		telefono:'',
//		domicilio: '',
	};

	confirmar_contrasena:string = '';

	ngOnInit()
	{
		this.centro_medico = this.rest.getCurrentCentroMedico();
		this.route.paramMap.subscribe( params =>{
			this.usuario.id_centro_medico = this.centro_medico.id;
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			this.is_loading = true;

			if( id )
			{
				forkJoin([
					this.rest.usuario.get( id )
					,this.rest.paciente.search({ eq:{ id_usuario: id } })
				])
				.subscribe((responses)=>
				{
					this.is_loading = false;
					this.usuario	= responses[0];
					this.paciente	= responses[1].datos[0];
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
}
