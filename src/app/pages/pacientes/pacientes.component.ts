import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchPacienteResponse,SearchPacienteRequest,SearchObject } from '../../models/Respuestas';
import { Doctor,Cita, Usuario,Paciente,Centro_Medico} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { SeleccionarDoctorComponent } from '../../components/seleccionar-doctor/seleccionar-doctor.component';
import { BaseComponent } from '../../pages/base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent extends BaseComponent implements OnInit {

	pacientes:Paciente[] = [];
	info_pacientes:SearchPacienteResponse[] = [];
	tipo_busqueda = 'nombre';
	orderBy = 'Fecha';
	orderDirection='ASC';
	doctor:Doctor = {};
	cita:Cita = {};
	//Sacarlo de la session del recepcionista
	centro_medico:Centro_Medico = { id: 1 };
	crequest:SearchPacienteRequest = {};
	usuario:Usuario = {};
	paciente_search:SearchObject<Paciente> = {};

	//TODO agregar Paginación,Busqueda ó filtros segun sea necesario

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	//Usuario tiene que tener id_organizacion si es admin,Doctor,Recepcionista ó Asistente
	ngOnInit() {
		// this.rest.doctor.get({}).subscribe((respuesta)=>
		// {this.doctor = respuesta.datos;});
		//this.rest.getDoctor( id_doctor ).subscribe(doctor=> this.doctor = doctor);
		this.titleService.setTitle('Pacientes');
		this.route.queryParams.subscribe( params =>
		{
			this.paciente_search = {
				lt: {}
				,eq: {}
				,ge: {}
				,gt: {}
				,le: {}
				,lk: {}
				,csv: {}
			};


			let usuario:Usuario = this.rest.getUsuarioSesion();
			console.log( usuario );

			if(usuario.tipo=="DOCTOR")
			{
				this.rest.doctor.get( usuario.id ).subscribe(doctor=> this.doctor = doctor);
			}

			console.log('params', params );
			//this.paciente_search.eq.id_organizacion = usuario.id_organizacion;
			this.paciente_search.lk.nombre = "lk.nombre" in params ?params["lk.nombre"]:'';
			this.paciente_search.pagina = 'pagina' in params ? parseInt(params['pagina'] ) : 0;
			this.paciente_search.limite	= this.pageSize;

			this.is_loading = true;
			this.currentPage = this.paciente_search.pagina;
			this.usuario = usuario;

			let tokens = this.paciente_search.lk.nombre.trim().split(/\s+/);


			if( tokens.length> 1 )
			{
				this.paciente_search.eq.nombre = tokens[0];
				this.paciente_search.lk.nombre	= null;
				this.paciente_search.lk.apellidos = tokens[1];
			}

			this.rest.paciente.search( this.paciente_search ).subscribe((respuesta)=>
			{
				this.pacientes = respuesta.datos;
				this.is_loading = false;
				this.setPages( this.currentPage, respuesta.total );
			},
			(error)=>
			{
				this.is_loading = false;
				this.showError( error );
			});
		});
	}

	seleccionarDoctorNuevaCita(paciente)
	{
		let usuario = this.rest.getUsuarioSesion();

		if( usuario.tipo == 'DOCTOR' )
		{
			this.router.navigate(['/agendar-cita','doctor',usuario.id,'centro-medico',this.centro_medico.id,'paciente',paciente.id]);
			return;
		}

		let s = this.rest.getSesion();

		//this.rest.getDoctores().subscribe(response=>
		//this.rest.doctor.getAll({id_organizacion:1}).subscribe(response=>
		//FIX LA ORGANIZACION
		this.rest.doctor.getAll({}).subscribe(response=>
		{
			let doctores = response.datos;

			if( doctores.length == 0 )
			{
				console.log("ESTO NUNCA DEBIO SUCEDER: por favor reportarlo, no existen doctores medicos");
			}
			else
			{
				/*
				this.modalController.create({
					component: SeleccionarDoctorComponent,
					componentProps: {
						'doctores' : doctores
					},
				}).then((modal)=>
				{
					console.log("A modal?",modal);
					modal.onDidDismiss().then((d) => {
						//navigate
						let doctor= d.data;
						console.log("Paciente",paciente);
						//this.router.navigate(['/doctores',doctor.id, 'configurar-horario',centro_medico.id]);
						//Agendar Cita
						this.router.navigate(['/doctores',doctor.id,'centro-medico',this.centro_medico.id,'agendar-cita',paciente.id]);
					})

					modal.present().then((result)=>{
						console.log('Todo bien',result);
					},(error)=>
					{
						console.error( 'error',error );
					});
				});
				*/
			}
		});

	}

	changeSearch( evt )
	{
		this.paciente_search.lk.nombre = evt.target.value;
		this.search();
	}

	ordenar(item)
	{
		if( this.orderBy === item )
		{
			this.orderDirection == 'ASC' ? 'DESC' : 'ASC';
		}
		else
		{
			this.orderBy = item;
			this.orderDirection = 'ASC';
		}
	}

	getParams()
	{

	}

	search()
	{
		this.is_loading = true;
		this.paciente_search.pagina= 0;
		let search = {};
		let array = ['eq','le','lt','ge','gt','csv','lk'];
		for(let i in this.paciente_search )
		{
			console.log( 'i',i,array.indexOf( i ) );
			if(array.indexOf( i ) > -1 )
			{
				for(let j in this.paciente_search[i])
					search[i+'.'+j] = this.paciente_search[i][j];
			}
		}
		//this.paciente_search.eq.id_organizacion = null;
		console.log('search',this.paciente_search );
		console.log('Busqueda', search );
		this.router.navigate(['/pacientes'],{queryParams: search });
	}

	verCitasPaciente(id_paciente){

		this.router.navigate
	}

}
