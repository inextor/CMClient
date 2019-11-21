import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor,Paciente } from '../../models/Modelos';
import { SearchCitaResponse,SearchCitaRequest } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { Cita } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { SearchObject } from '../../models/Respuestas';
import { forkJoin } from 'rxjs';
import { empty } from 'rxjs';

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
	citas:Cita[] = [];

	currentInfoCita:SearchCitaResponse = null;

	showConfirmDoctor:boolean = false;
	showConfirmPaciente:boolean = false;
	showConfirmCancelar:boolean = false;
	showConfirmActivar:boolean = false;

	id_paciente:number;
	id_doctor:number;
	fecha_inicio:string;
	nombre:string;
	pagina:number;

	cita_search:SearchObject<Cita> = {

	};

	constructor(public rest:RestService,public router:Router,public route:ActivatedRoute,public location: Location)
	{
		super( rest,router,route,location);
	}

	ngOnInit()
	{
		let d = new Date();
		d.setHours( d.getHours() - 3 );
		let z = (i)=> i<10 ? '0'+i : i;

		this.route.queryParams.subscribe( params =>
		{

		//this.route.paramMap.subscribe( params =>
		//{
			this.cita_search = {
				eq: {},
				ge: {},
				le: {}
			};

			console.log("Nueva pagina");

			console.log( params );

			this.id_paciente	= 'id_paciente' in params ? params.id_paciente:null;
			this.id_doctor		= 'id_paciente' in params ? params.id_doctor:null;
			this.pagina			= 'id_paciente' in params ? params.pagina:0;
			this.fecha_inicio	= 'id_paciente' in params ? params.fecha_inicio:null;

			let currentDate = new Date();

			if( this.fecha_inicio == null )
				this.fecha_inicio = ''+currentDate.getFullYear()+'-'+z(currentDate.getMonth()+1)+'-'+z(currentDate.getDate())+' '+z(currentDate.getHours())+':'+z(currentDate.getMinutes())+':00';

			this.cita_search.ge.inicio		= this.fecha_inicio;
			this.cita_search.eq.id_paciente	= this.id_paciente;
			this.cita_search.eq.id_doctor	= this.id_doctor;
			this.cita_search.limite			= this.pageSize;
			this.cita_search.pagina			= this.pagina;

			let rjoinObj:any = {};
			let fjarray = [];
			console.log("MMMMMM");
			forkJoin([
				this.rest.searchCita.search( this.cita_search )
				,this.id_paciente ? this.rest.paciente.get( this.id_paciente ) : empty()
				,this.id_doctor ? this.rest.doctor.get( this.id_doctor ) : empty()
			]).subscribe((result)=>
			{
				console.log("WTF");
				this.setPages( this.cita_search.pagina, result[0].total );
				this.info_citas = result[0].datos;
				this.paciente = result[ 1 ];
				this.doctor = result[ 2];
				this.setPages( this.currentPage, result[0].total );
			},error=>this.showError( error ));
		});
	}

	getPathFromSearchObj()
	{
	}

	buscar()
	{
		//this.cita.search( this.cita_search );
		this.rest.searchCita.search(this.cita_search).subscribe((citaResponse)=>
		{
			console.log( citaResponse );
			this.setPages( this.cita_search.pagina, citaResponse.total );
			this.info_citas = citaResponse.datos;
		},error=>this.showError( error ));
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

		this.router.navigate(['/citas/',{ fecha_inicio:this.fecha_inicio,nombre:this.nombre,id_paciente:this.id_paciente,id_doctor:this.id_doctor}]);
		//if( nombre.trim() )
		//	this.crequest.nombre = nombre.trim();
		//else
		//	this.crequest.nombre = '';

		//this.rest.searchCitas( this.crequest ).subscribe((respuesta)=>
		//Esperando que funcione la siguiente linea
		//this.rest.searchCita.getAll( this.crequest ).subscribe((respuesta)=>
		//{
		//	this.is_loading = false;
		//	this.info_citas = respuesta.datos;
		//}, this.showError );
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
			let index = this.info_citas.findIndex(i=> i.cita.id ==	infoCita.cita.id );
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
			let index = this.info_citas.findIndex(i=> i.cita.id ==	infoCita.cita.id);
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
			let index = this.info_citas.findIndex(i=> i.cita.id ==	infoCita.cita.id );
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
			let index = this.info_citas.findIndex(i=> i.cita.id ==	infoCita.cita.id );
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
