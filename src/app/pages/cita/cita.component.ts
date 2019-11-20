import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitasService } from 'src/app/services/citas.service';

@Component({
	selector: 'app-cita',
	templateUrl: './cita.component.html',
	styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

	constructor(private citasService:CitasService) { }
// TODO
	ngOnInit() {
		const events = this.citasService.getDisponibilidadDoctor(2, 2).subscribe(citas => {
			this.calendarEvents = citas.datos.map(event => {
				const id = this.counterId;
				this.counterId += 1;
				return {
					id: id,
					tipo: "disponibilidad",
					rendering: 'background',
			startTime: event.hora_inicio,//startTime,
			endTime: event.hora_final, //endTime,
			daysOfWeek: event.dia_semana,//event.daysOfWeek
				}
			});
		})
	}

	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];
	counterId = 1;
	calendarEvents = [];

	addEvent(event){
		this.calendarEvents.push({
			id: this.counterId,
			title: 'Disponible',
			start: event.start,
			end: event.end
		});
	}

	deleteEvent(events, eventId){
		const calendarEvents = events.slice();
		const event = calendarEvents.find((event) => event.id == eventId)
		if(event.rendering === 'background'){
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
		calendarEvents.push({ id: this.counterId, title: 'Disponible', start: date.date, end: date.date });
		this.calendarEvents = calendarEvents;
		this.counterId += 1;
	}
}
