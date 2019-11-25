import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Centro_Medico, Doctor } from 'src/app/models/Modelos';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { CitasService } from 'src/app/services/citas.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Location } from	'@angular/common';
import { Router } from "@angular/router"
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-configurar-horario',
  templateUrl: './configurar-horario.component.html',
  styleUrls: ['./configurar-horario.component.css']
})

export class ConfigurarHorarioComponent extends BaseComponent implements OnInit {

	centroMedico:Centro_Medico={}
	doctor:Doctor={}
	id_centro_medico:number;
	id_doctor:number;
	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];
	counterId = 1;
	calendarEvents = [];


	constructor(
		public rest:RestService,
		public router:Router,
		public route:ActivatedRoute,
		public location: Location,
		public titleService: Title,
		private citasService:CitasService,
	) {
		super( rest,router,route,location,titleService );
		//this.rest.getNetworkMonitor().subscribe((is_loading)=>
		//{
		//	console.log('is_loading');
		//});
	}

	@ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;


	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			this.id_centro_medico = parseInt(params.get('id_centro_medico'));
			this.id_doctor = parseInt(params.get('id_doctor'));
			//Hacer forkjoin
			//XXX Para que queremos el centro medico????
			this.rest.centro_medico.get( this.id_centro_medico ).subscribe( centroMedico =>
			{
				this.centroMedico = centroMedico;
			});

			//XXX Para que queremos el doctor???? Para Mostrar la informacion de que estamos editando su horario
			this.rest.doctor.get( this.id_doctor ).subscribe( doctor =>
			{
				this.doctor = doctor;
			});
		});

	}


	// @Input() id_doctor:number;
	// @Input() id_centro_medico:number ;


	ngAfterViewInit(): void {

		const events = this.citasService.getDisponibilidadDoctor(this.id_doctor, this.id_centro_medico).subscribe(citas =>
		{
			this.calendarEvents = citas.datos.map(event =>
			{
				const id = this.counterId;
				this.counterId += 1;
				return {
					id			: id,
					title		: 'Disponible',
					startTime	: event.hora_inicio,
					endTime		: event.hora_final,
					daysOfWeek	: [event.dia_semana]
				}
			});

			const calendarAPI = this.calendarComponent.getApi();
			calendarAPI.render();
		});
	}

	header = {
		left	: '',
		center	: '',
		right	: ''
	}

	columnHeaderText(date)
	{
		switch(date.getDay()){
			case 0: return 'Domingo';
			case 1: return 'Lunes';
			case 2: return 'Martes';
			case 3: return 'Miercoles';
			case 4: return 'Jueves';
			case 5: return 'Viernes';
			case 6: return 'Sabado';
		}
	}

	addEvent(event)
	{
		this.calendarEvents.push({ id: this.counterId, title: 'Disponible', start: event.start, end: event.end });
	}

	deleteEvent(events, eventId)
	{
		const calendarEvents = events.slice();
		const event = calendarEvents.find((event) => event.id == eventId )
		const index = calendarEvents.indexOf(event);
		calendarEvents.splice(index, 1);
		return calendarEvents;
	}

	updateEvent(events, eventId, newEvent)
	{
		const calendarEvents = this.deleteEvent(events, eventId);
		calendarEvents.push({
			id: newEvent.id,
			title: 'Disponible',
			daysOfWeek: [newEvent.start.getDay()],
			startTime: moment(newEvent.start).format("HH:mm"),
			endTime: moment(newEvent.end).format("HH:mm")
		});
		return calendarEvents;
	}

	eventClick(info)
	{
		this.calendarEvents = this.deleteEvent(this.calendarEvents, info.event.id);
	}

	eventDrop(info)
	{
		this.calendarEvents = this.updateEvent(this.calendarEvents, info.event.id, info.event);
	}

	eventResize(info)
	{
		this.calendarEvents = this.updateEvent(this.calendarEvents, info.event.id, info.event);
	}

	dateClick(date)
	{
		let calendarEvents = this.calendarEvents.slice();
		calendarEvents.push({
			id: this.counterId,
			title: 'Disponible',
			daysOfWeek: [date.date.getDay()],
			startTime: moment(date.date).format("HH:mm"),
			end: moment(date.date).add(1, 'hour').format("HH:mm")
		});
		this.calendarEvents = calendarEvents;
		this.counterId += 1;
	}

	onGuardarHorarioClick()
	{
		const disponibilidadDoctor = this.calendarEvents.map((event) => ({
			startTime: event.startTime,
			endTime: event.endTime,
			daysOfWeek: event.daysOfWeek
		}));
		this.citasService.setDisponibilidadDoctor(this.id_doctor, this.id_centro_medico ,disponibilidadDoctor);
	}
}
