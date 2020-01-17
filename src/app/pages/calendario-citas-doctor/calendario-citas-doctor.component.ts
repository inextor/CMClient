import { Component, OnInit,OnChanges,SimpleChanges,Input,Output,ViewChild,AfterViewInit,EventEmitter } from '@angular/core';
import { Cita,Horario_Doctor,Doctor,Centro_Medico,Paciente } from 'src/app/models/Modelos';
import { RestService } from 'src/app/services/rest.service';
import { Observable, BehaviorSubject,forkJoin, fromEvent,of} from 'rxjs';
import { Router,ActivatedRoute,Params, ParamMap} from "@angular/router"
import { BaseComponent } from 'src/app/pages/base/base.component';


import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

export interface SimpleMap{
	 [key: string]: Object;
}

@Component({
  selector: 'app-calendario-citas-doctor',
  templateUrl: './calendario-citas-doctor.component.html',
  styleUrls: ['./calendario-citas-doctor.component.css']
})
export class CalendarioCitasDoctorComponent extends BaseComponent implements OnInit , OnChanges {

	@Input() doctor:Doctor= null;
	@Input() centro_medico:Centro_Medico = null;
	@Input() paciente:Paciente;
	@Output() citaAgendada = new EventEmitter<Cita>();

	//calendarEvents:EventInput[] = [];
	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];
	@ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;


	events:SimpleMap = {};

	show_modal:boolean	= false;
	counterId:number = 0;
	calendarOptions= {
			editable: false,
			header: {
				left: 'title',
				center: 'timeGridDay,timeGridWeek,dayGridMonth',
				right: 'prev,today,next anterior,siguiente',
			},
			footer: true,
			allDaySlot: false,
			eventLimit: true,
			height: 'auto',
			defaultView: "timeGridWeek"
	};

	cita:Cita = {
		inicio: null
  }

	cita_fecha:Date = null;

	ngOnInit()
	{
		this.counterId = 0;
	}

	ngAfterViewInit()
	{
		console.log('Here is the fail');
		this.good();
		//this.good();
		//setTimeout(()=>{ this.loadData();console.log('yeahhh')}, 1000 );
	}


	ngOnChanges(changes:SimpleChanges)
	{
		let loadCounter:number = 0

		//if( changes['doctor'] || changes['centro_medico'] || changes['paciente'] )
		//{
		//	if( this.doctor !== null && this.centro_medico !== null && this.paciente !== null )
		//	{
		//		this.good();
		//	}
		//}
	}

	good()
	{
		const calendarAPI = this.calendarComponent.getApi();
		calendarAPI.addEventSource({
			id: 'citas'
			,events: (info,successCallback,failureCallback)=>
			{
				console.log( info,typeof successCallback, typeof failureCallback );
				this.getEvents( info, successCallback, failureCallback );
			}
		});

		calendarAPI.addEventSource({
			id: 'nueva_cita'
			,events: []
		});

		//calendarAPI.addEvent({id: 'disponibilidad', events: this.calendarEvents });
		//calendarAPI.addEvent({id: 'citas', events: citas});
		calendarAPI.refetchEvents();
		calendarAPI.render();
	}


	getEventsForWeek(start,disponibilidad)
	{
		disponibilidad.map
	}


	getEvents(info,successCallback,errorCallback )
	{
		console.log('Getting events for',info.start  );

		let centro_medico = this.rest.getCurrentCentroMedico();
		let id_centro_medico = 1;
		let usuario = this.rest.getUsuarioSesion();

		console.log('Consultando para', centro_medico, usuario );

		let id_doctor = usuario.id;

		forkJoin([
			this.rest.horario_doctor.getAll({id_centro_medico: id_centro_medico },{ id_doctor: id_doctor })
			,this.rest.cita.search
			(
				{
					eq:
					{
						id_centro_medico: id_centro_medico
						,id_doctor: id_doctor
						,estatus: 'ACTIVA'
					}
					,ge:
					{
						inicio: this.rest.getMysqlStringFromLocaDate( info.start )
					}
					,le:
					{
						inicio: this.rest.getMysqlStringFromLocaDate( info.end )
					}
				}
			)
		])
		.subscribe((responses)=>
		{
			let disponibilidad	= [];
			let citas			= [];
			let calendarEvents 	= [];

			let fooo = this.map(info.start, responses[0].datos );

			fooo.forEach(i=>
			{
				let id = this.counterId+1;
				this.counterId++;
				//console.log( i );
				let obj = {
					id:i.id
					,rendering		: 'background'
					,classNames		: ['disponibilidad']
					,title			: 'ffffff'
					,editable		: false
					,start			: i.start
					,end			: i.end
					//daysOfWeek: [i.dia_semana]
				};

				if( !this.events[ obj.id ] )
				{
					this.events[ obj.id ] = obj;
				}
				calendarEvents.push( obj );
			});

			responses[1].datos.forEach((cita)=>
			{
				const id = this.counterId;
				this.counterId += 1;

				let hora_final	= cita.inicio;
				let hora		= this.rest.getLocalDateFromMysqlString( cita.inicio );
				hora.setHours( hora.getHours()+1 );

				console.log( cita );

				let obj = {
					id:''+cita.id
					,classNames: ['evento_normal']
					,title: 'MUAHHHH'
					,editable: false
					,start: cita.inicio
					,end: cita.fin == null ? hora : cita.fin
				};

				if( !this.events[ obj.id ] )
				{
					this.events[ obj.id ] = obj;
				}
				calendarEvents.push( obj );
			});

			console.log('Events are', calendarEvents );

			successCallback( calendarEvents );
		},(error)=>{  errorCallback( error ); });
	}

	map(startDate:Date,horario_doctor:Horario_Doctor[])
	{
		let currentDay	= startDate.getDay();
		let dates		= [];
		let increments	= [];

		let initDates = [0,1,2,3,4,5,6];


		for( let i=0;i<7;i++)
		{
			if( currentDay >= i )
				increments.push( i-currentDay );
			else
				increments.push( i-currentDay );
		}

		for(let i=0;i<7;i++ )
		{
			let date = new Date();
			date.setTime( startDate.getTime() );
			date.setDate( date.getDate()+increments[ i ] );
			dates.push( date );
		}

		console.log('Current day',startDate.getDay() );
		return horario_doctor.map(i=>
		{
			let startDate = dates[ i.dia_semana ];
			let start = new Date();
			start.setTime( startDate.getTime() );

			let hour = parseInt(i.hora_inicio.substring(0,2),10);
			let minutes = parseInt( i.hora_inicio.substring(3,5),10);

			start.setHours( hour );
			start.setMinutes( minutes );

			let end = new Date();
			end.setTime( startDate.getTime() );

			//console.log( 'End', end );
			//console.log( 'Hour', i.hora_final );
			let finalHour = parseInt( i.hora_final.substring(0,2 ) )
			let finalMinutes = parseInt( i.hora_final.substring(3,5) );

			//console.log('finalHour', finalHour );
			//console.log('minutes', finalMinutes );

			end.setHours( finalHour );
			end.setMinutes( finalMinutes );

			console.log('Mapped from ',i.dia_semana+' '+i.hora_inicio, 'to', start.getDay(), start, );
			let d = this.rest.getMysqlStringFromLocaDate( start );
			let str = d.substring(0,10);
			console.log('Date id', str );
			return {
				id	: i.id+str
				,start: start
				,end: end
				,render: 'background'
			};
		});
	}

	eventClicked(evt)
	{
		console.log( evt );
		console.log('Has id',evt.event.id );
		this.router.navigate(['agregar-consulta-cita',evt.event.id]);
	}

	dateClick(evt)
	{
	//	this.cita_fecha = evt.date;
	//	console.log("Click on ", evt.date );
	//	console.log( evt );
	//	const calendarAPI = this.calendarComponent.getApi();

	//	//calendarAPI.addEvent({
	//	//	title: 'Cita'
	//	//	,id:'nueva_cita'
	//	//	,start: evt.date
	//	//	,editable: true
	//	//},'nueva_cita');
	//	//

	//	let fecha = this.rest.getMysqlStringFromLocaDate( evt.date );
	//	this.cita.inicio = fecha.substring(0,20);

		console.log('Fecha inicio', evt );
	}
}