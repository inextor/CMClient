import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitasService } from 'src/app/services/citas.service';
import { AgendarCitaComponent } from '../agendar-cita/agendar-cita.component';
import { RestService } from '../../services/rest.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horario-doctor',
  templateUrl: './horario-doctor.component.html',
  styleUrls: ['./horario-doctor.component.css']
})
export class HorarioDoctorComponent implements OnInit {


	constructor(
		private citasService:CitasService,
		public restService:RestService,
		public activatedRoute:ActivatedRoute
	)
	{

	}


		//public modalController: ModalController,
	@ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;




	counterId = 0;
	disponibilidadDoctor = [];
	horarioDoctor = [];
	calendarEvents = [];
	eventSources = [
		{ id: "disponibilidad", events: [] },
		{ id: "horario", events: [] }
	]

	private idDoctor:number;
	private idPaciente:number;
	private idCentroMedico:number;

	ngOnInit()
	{
		this.activatedRoute.params.subscribe(params=>
		{
			this.idDoctor = parseInt(params.get('id_doctor'));
			this.idPaciente = parseInt(params.get('id_paciente'));
			this.idCentroMedico = parseInt(params.get('id_centro_medico'));
			this.getDisponibilidadDoctor();
		});
	}


	getDisponibilidadDoctor()
	{
		const calendarAPI = this.calendarComponent.getApi();

		if(calendarAPI){
				calendarAPI.removeAllEventSources();
		}

		//this.citasService.getDisponibilidadDoctor(this.idDoctor, this.idCentroMedico).subscribe( events => {
		//	const disponibilidad = events.datos.map( d=> {
		//		const id = this.counterId;
		//		this.counterId += 1;

		//		return {
		//			id: id,
		//			tipo: "disponibilidad",
		//			rendering: 'background',
		//			startTime: d.hora_inicio,
		//			endTime: d.hora_final,
		//			daysOfWeek: [d.dia_semana]
		//		}
		//	});

		//	const calendarAPI = this.calendarComponent.getApi();
		//	calendarAPI.addEventSource(disponibilidad);
		//});

		this.restService.horario_doctor.getAll({ id_centro_medico:this.idCentroMedico },{id_doctor:this.idDoctor}).subscribe( respuesta =>
		{
			let calendarEvents = [];

			let eventsArray = respuesta.datos.map( i=>{
				let id = this.counterId+1;
				this.counterId++;
				return {
					id,
					rendering: 'background',
					startTime: i.hora_inicio,
					endTime: i.hora_final,
					daysOfWeek: [i.dia_semana]
				};
			});
			calendarAPI.addEventSource({ id: 'disponibilidad', events: calendarEvents });
		});


		this.citasService.getHorarioDoctor(this.idDoctor, this.idCentroMedico).subscribe(
			events => {
				const calendarEvents = [];
				events.datos.map(event => {
					const id = this.counterId;
					this.counterId += 1;
					calendarEvents.push({
						id,
						title: event.paciente.nombre,
						start: event.cita.inicio,
						end: event.cita.fin,
					});
				});
				const calendarAPI = this.calendarComponent.getApi();
				calendarAPI.render();
				calendarAPI.addEventSource({id: 'horario', events: calendarEvents});
			}
		)
	}

	dateClick(info)
	{

	}
	//async dateClick(info)
	//{
	//	const modal = await this.modalController.create({
	//		component: AgendarCitaComponent,
	//		componentProps: {
	//			'fecha': info.date,
	//			'idPaciente': this.idPaciente,
	//			'idDoctor': this.idDoctor,
	//			'idCentroMedico': this.idCentroMedico
	//		},
	//	});
	//	modal.onDidDismiss().then(() =>
	//	{
	//		this.getDisponibilidadDoctor();
	//	})
	//	return await modal.present();
	//}

	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];
}
