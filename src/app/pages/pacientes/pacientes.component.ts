import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchPacienteResponse,SearchPacienteRequest } from '../../models/Respuestas';
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

		this.route.paramMap.subscribe( params =>
		{

			let usuario = this.rest.getUsuarioSesion();
			if(usuario.tipo=="DOCTOR")
			{
				this.rest.doctor.get( usuario.id ).subscribe(doctor=> this.doctor = doctor);
			}

			this.is_loading = true;
			this.currentPage = params.get('pagina') == null ? 0 : parseInt(params.get('pagina') );

			this.usuario = usuario;

			this.rest.paciente.getAll({},{pagina:this.currentPage,limite:this.pageSize,id_organizacion: usuario.id_organizacion}).subscribe((respuesta)=>
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
			this.router.navigate(['/doctores',usuario.id,'centro-medico',this.centro_medico.id,'agendar-cita',paciente.id]);
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
		this.rest.paciente.getAll({nombre: evt.target.value}).subscribe(respuesta => {
			this.pacientes = respuesta.datos;
		})
		console.log("FOOOOO make a search", evt);
		this.search( evt.target.value );
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
	search(nombre)
	{
		if( nombre.trim() )
			this.crequest.nombre = nombre.trim();
		else
			this.crequest.nombre = '';

		//this.rest.searchCitas( this.crequest ).subscribe((respuesta)=>
		this.rest.searchCita.getAll( this.crequest ).subscribe((respuesta)=>
		{
			this.info_pacientes = respuesta.datos;
			this.is_loading = false;
		},
		()=>
		{
			this.is_loading = false;
		}
		);
	}
}
