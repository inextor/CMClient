import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitasService } from 'src/app/services/citas.service';
import { Usuario, Doctor } from '../../models/Modelos';
import { RestService } from '../../services/rest.service';
import {Router, ActivatedRoute} from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';


@Component({
  selector: 'app-ver-doctor',
  templateUrl: './ver-doctor.component.html',
  styleUrls: ['./ver-doctor.component.css']
})
export class VerDoctorComponent implements OnInit {

	constructor(
		private router: Router,
		private rest:RestService,
		private citasService:CitasService,
		private activatedRoute: ActivatedRoute )
	{ }



	counterId = 1;
	@ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

	ngOnInit()
	{
		// TODO
		//
		//XXX Desde donde se ve esta pagina
		let idCentroMedico = 1;
		let idDoctor = this.activatedRoute.snapshot.paramMap.get('idDoctor')

		return this.rest.horario_doctor.getAll({ id_centro_medico:idCentroMedico },{id_doctor:idDoctor}).subscribe( respuesta =>
		{
			let disponibilidad = [];
			respuesta.datos.forEach( i=>
			{
				disponibilidad.push({
					id : ++this.counterId,
					tipo: "disponibilidad",
					rendering: "background",
					startTime: i.hora_inicio,
					endTime: i.hora_final,
					daysOfWeek: [i.dia_semana]
				});
			});

			let calendarAPI = this.calendarComponent.getApi();
			calendarAPI.addEventSource({ id: 'disponibilidad', events: disponibilidad });
			calendarAPI.render();
		});
		//	this.citasService.getDisponibilidadDoctor(this.activatedRoute.snapshot.paramMap.get('idUsuarioDoctor'), 1).subscribe(
			//	thhorario_doctor=> {

		//	th		let disponibilidad = [];

			//	th	const disponibilidad = events.datos.map(event => {
			//	th		const id = this.counterId;
		//	th				this.counterId += 1;
			//	th		return {
			//	th			id: id,
			//	th			tipo: "disponibilidad",
			//	th			rendering: 'background',
			//	th			startTime: event.hora_inicio,
			//	th			endTime: event.hora_final,
			//	th			daysOfWeek: [event.dia_semana]
			//	th		}
			//	th	})
			//	th	const calendarAPI = this.calendarComponent.getApi();
			//	th	calendarAPI.addEventSource({id: 'disponibilidad', events: disponibilidad});
			//	th	calendarAPI.render();
			//	th}
		//);//	th
	}

	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];
	calendarEvents = [];
	eventSources = [
		{ id: "disponibilidad", events: [] },
		{ id: "horario", events: this.calendarEvents }
	]

	async presentAlertConfirm() {
		const currentUser = this.rest.currentUserValue;
		/*
		const alert = await this.alertController.create({
			header: 'Confirmacion',
			message: 'La fecha es <strong>correcta</strong>?',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						return
					}
				}, {
					text: 'Aceptar',
					handler: () => {
						if(currentUser){
							console.log('ENVIANDO HORARIO');
							this.router.navigate(['mis-citas'])
						}else{
							this.router.navigate(['login'])
						}
					}
				}
			]
		});

		await alert.present();
		*/
	}

	addEvent(event){
		this.calendarEvents.push({
			id: ++this.counterId,
			title: 'Disponible',
			startTime: event.hora_inicio,
			endTime: event.hora_final,
			daysOfWeek: [event.dia_semana]
		});
	}

	deleteEvent(events, eventId){
		const calendarEvents = events.slice();
		const event = calendarEvents.find((event) => event.rendering !== 'background' && event.id == eventId)
		if(!event){
			return calendarEvents;
		}
		const index = calendarEvents.indexOf(event);
		calendarEvents.splice(index, 1);
		return calendarEvents;
	}

	updateEvent(events, eventId, newEvent) {
		const calendarEvents = this.deleteEvent(events, eventId);
		calendarEvents.push({id: newEvent.id, title: 'Disponible', start: newEvent.start, end: newEvent.end})
		return calendarEvents;
	}

	eventClick(info) {
		const eventSourceAPI = info.event.source;
		if(eventSourceAPI.id === "disponibilidad"){
			return;
		}
		this.calendarEvents = this.deleteEvent(this.calendarEvents, info.event.id);
	}

	eventDrop(info) {
		this.calendarEvents = this.updateEvent(this.calendarEvents, info.event.id, info.event);
	}

	eventResize(info){
		this.calendarEvents = this.updateEvent(this.calendarEvents, info.event.id, info.event);
	}

	dateClick(date) {
		const createdEvent = this.calendarEvents.find(event => event.tipo === undefined);
		if(createdEvent){
			this.calendarEvents = this.deleteEvent(this.calendarEvents, createdEvent.id);
		}
		let calendarEvents = this.calendarEvents.slice();
		calendarEvents.push({ id: ++this.counterId, title: 'Disponible', start: date.date, end: date.date });
		this.calendarEvents = calendarEvents;
		const calendarAPI = this.calendarComponent.getApi();
		const horarioEventSource = calendarAPI.getEventSourceById('horario');
		horarioEventSource.remove();
		calendarAPI.addEventSource({id: 'horario', events: this.calendarEvents});
		calendarAPI.render();
	}
}
