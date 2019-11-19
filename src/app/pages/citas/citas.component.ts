import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor,Paciente } from '../../models/Modelos';
import { SearchCitaResponse,SearchCitaRequest } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { Cita } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent extends BaseComponent implements OnInit {

	cita:Cita = {};
	info_citas:SearchCitaResponse[] = [];
	orderBy = 'Fecha';
	orderDirection='ASC';
	tipo_busqueda = 'nombre';
	paciente:Paciente = {};
	doctor:Doctor = {};

	currentInfoCita:SearchCitaResponse = null;

	showConfirmDoctor:boolean = false;
	showConfirmPaciente:boolean = false;
	showConfirmCancelar:boolean = false;
	showConfirmActivar:boolean = false;

	crequest:SearchCitaRequest = {

	};

	constructor(public rest:RestService,public router:Router,public route:ActivatedRoute,public location: Location) {
		super( rest,router,route,location);
	  }
	ngOnInit() {

		let d = new Date();
		d.setHours( d.getHours() - 3 );
		let z = (i)=> i<10 ? '0'+i : i;


		this.route.paramMap.subscribe( params =>
		{

			let id_paciente	= params.get('id_paciente') ==null ? null : parseInt(params.get('id_paciente') );

			if( id_paciente )
			{
				console.log("PACIENTE FOOOOO No paso NADA");
				this.tipo_busqueda = 'fecha'
				this.crequest.id_paciente = id_paciente;
				//this.rest.getPaciente( id_paciente ).subscribe(paciente=> this.paciente = paciente);
				this.is_loading= true;
				this.rest.paciente.get( id_paciente ).subscribe((paciente)=> {
					this.is_loading=false;
					this.paciente = paciente
				}, this.showError );
			}

			let id_doctor  = params.get('id_doctor') == null ? null : parseInt(params.get('id_doctor') );

			if( id_doctor )
			{
				this.tipo_busqueda = 'fecha'
				this.crequest.id_doctor = id_doctor;
				//this.rest.getDoctor( id_doctor ).subscribe(doctor=> this.doctor = doctor);
				this.rest.doctor.get( id_doctor ).subscribe((doctor)=> {
					this.is_loading = false ;
					this.doctor = doctor
				}, this.showError );
			}

			if( !this.crequest.id_paciente && !this.crequest.id_doctor )
			{
			  let fecha_inicio:string = ''+d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())+' '+z(d.getHours())+':'+z(d.getMinutes())+':00';
			  this.crequest.fecha_inicio = fecha_inicio;
			}

			console.log("crequest",this.crequest );

			this.search('');
			//this.rest.searchCitas( this.crequest ).subscribe( respuesta => {
			//	console.log( respuesta.datos );
			//	this.info_citas = respuesta.datos;
			//	this.is_loading = false;
			//},
			//()=>
			//{
			//	this.is_loading = false;
			//});
		});
	}

	changeSearch( evt )
	{
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
		//Esperando que funcione la siguiente linea
		this.rest.searchCita.getAll( this.crequest ).subscribe((respuesta)=>
		{
			this.is_loading = false;
			this.info_citas = respuesta.datos;
		}, this.showError );
	}

	confirmarDoctor(infoCita:SearchCitaResponse)
	{
		this.rest.cita.update({
			id: infoCita.cita.id
			,confirmado_por_doctor: 'SI'
		}).subscribe((cita)=>
		{
			this.is_loading = false;
			this.showConfirmDoctor = false;
			let index = this.info_citas.findIndex(i=> i.cita.id ==  infoCita.cita.id );
			if( index >= 0 )
				this.info_citas[ index ].cita = cita;
		},
		(error)=>
		{
			this.showConfirmDoctor = false;
			this.is_loading = false;
			this.showError( error );
		});
	}

	confirmarPaciente(infoCita:SearchCitaResponse)
	{
		this.is_loading = true;
		this.rest.cita.update({
			id: infoCita.cita.id
			,confirmado_por_paciente : 'SI'
		}).subscribe((cita)=>
		{
			this.is_loading = false;
			this.showConfirmPaciente= false;
			let index = this.info_citas.findIndex(i=> i.cita.id ==  infoCita.cita.id);
			if( index >= 0 )
				this.info_citas[ index ].cita = cita;
		},(error)=>
		{
			this.is_loading = false;
			this.showConfirmPaciente= false;
			this.showError( error );
		});
	}

	cancelar(infoCita:SearchCitaResponse)
	{
		this.rest.cita.update({
			id: infoCita.cita.id
			,estatus: 'CANCELADA'
		}).subscribe((cita)=>
		{
			console.log( infoCita );
			this.showConfirmCancelar = false;
			this.is_loading = false;
			let index = this.info_citas.findIndex(i=> i.cita.id ==  infoCita.cita.id );
			if( index >= 0 )
				this.info_citas[ index ].cita = cita;
		},
		(error)=>
		{
			this.is_loading = false;
			this.showConfirmCancelar = false;
			this.showError(error)
		});
	}

	activar(infoCita:SearchCitaResponse)
	{
		this.rest.cita.update({
			id: infoCita.cita.id
			,estatus: 'ACTIVA'
		}).subscribe((cita)=>
		{
			this.showConfirmActivar = false;
			let index = this.info_citas.findIndex(i=> i.cita.id ==  infoCita.cita.id );
			this.is_loading = false;
			if( index >= 0 )
				this.info_citas[ index ].cita = cita;
		}
		,(error)=>
		{
			this.is_loading = false;
			this.showConfirmActivar = false;
			this.showError( error );
		});
	}
}
