import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitasService } from '../../services/citas.service';
import { AgendarCitaComponent } from '../agendar-cita/agendar-cita.component';
import { RestService } from '../../services/rest.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router, Params, ParamMap } from "@angular/router"
import { DoctorComponent } from '../doctor/doctor.component';
import { Doctor } from 'src/app/models/Modelos';
import { OptionsInput } from '@fullcalendar/core';
import { forkJoin } from 'rxjs';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	constructor(
		private citasService: CitasService,
		public restService: RestService,
		public route: ActivatedRoute,
		public router: Router
	) {

	}

	counterId				= 0;
	disponibilidadDoctor	= [];
	horarioDoctor			= [];
	calendarEvents			= [];
	eventSources			= [
		{ id: "disponibilidad", events: [] },
		{ id: "horario", events: [] }
	]
	is_mobile:boolean				= false;
	show_modal:boolean				= false;
	header: {
		left: 'prev,next today',
		center: 'title',
		right: 'timeGridWeek,timeGridDay'
	  }
	private id_doctor:number;
	private id_paciente:number;
	private id_centro_medico:number;

	@ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;
	//modelo de las opciones de la libreria full calendar
	calendarOptions: OptionsInput;



	ngOnInit() {

		this.calendarOptions = {
			editable: true,
			header: {
				left: 'title',
				center: 'timeGridDay,timeGridWeek,dayGridMonth',
				right: 'prev,next,today',
			},
			footer: true,
			allDaySlot: false,
			eventLimit: true,
			height: 'auto',
			defaultView: "timeGridDay"

		};


	}
	ngAfterViewInit(): void {
		let usuario = this.restService.getUsuarioSesion();
		forkJoin([
			this.restService.doctor.get(usuario.id)
		]).subscribe(response=>{
			this.id_doctor= response[0].id;
			this.id_centro_medico= response[0].id_centro_medico;
			this.getDisponibilidadDoctor();
		})
	
		
	}

	getDisponibilidadDoctor()
	{
		const calendarAPI = this.calendarComponent.getApi();

		if(calendarAPI){
				calendarAPI.removeAllEventSources();
		}

		this.citasService.getDisponibilidadDoctor(this.id_doctor, this.id_centro_medico).subscribe( events => {
			const disponibilidad = events.datos.map( d=> {
				const id = this.counterId;
				this.counterId += 1;

				return {
					id: id,
					tipo: "disponibilidad",
					rendering: 'background',
					startTime: d.hora_inicio,
					endTime: d.hora_final,
					daysOfWeek: [d.dia_semana]
				}
			});

			const calendarAPI = this.calendarComponent.getApi();
			calendarAPI.addEvent(disponibilidad);
			calendarAPI.render();
		});

		this.restService.horario_doctor.getAll({ id_centro_medico:this.id_centro_medico },{id_doctor:this.id_doctor}).subscribe( respuesta =>
		{
			let calendarEvents = [];

			let eventsArray = respuesta.datos.map( i=>{
				let id = this.counterId+1;
				this.counterId++;
				calendarEvents.push
				({
					id,
					tipo: "disponibilidad",
					rendering: 'background',
					startTime: i.hora_inicio,
					endTime: i.hora_final,
					daysOfWeek: [i.dia_semana]
				});
			});
			calendarAPI.addEvent({ id: 'disponibilidad', events: calendarEvents });
			calendarAPI.render();
		});


		this.citasService.getHorarioDoctor(this.id_doctor, this.id_centro_medico).subscribe(
			events => {
				let calendarEvents = [];
				let prueba;
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
				calendarAPI.addEvent({id: 'horario', events: calendarEvents});

				calendarAPI.render();
			}
		)
		calendarAPI.refetchEvents();
	}



	async dateClick(info)
	{
		console.log( info );
		//const modal = await this.modalController.create({
		//	component: AgendarCitaComponent,
		//	componentProps: {
		//		'fecha': info.date,
		//		'id_paciente': this.id_paciente,
		//		'id_doctor': this.id_doctor,
		//		'id_centro_medico': this.id_centro_medico
		//	},
		//});
		//modal.onDidDismiss().then(() =>
		//{
		//	this.getDisponibilidadDoctor();
		//})
		//return await modal.present();
		this.show_modal=true;
	}

	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];

	cita = {
		paciente	: '',
		fecha		: '',
		horaInicio	: '',
		horaFin		: '',
		nota		: ''
	};

	

	pacientes = [];

	// TODO
	aceptarCita()
	{
		let usuario = this.restService.getUsuarioSesion();
		this.citasService.setCitaDoctor({
			id_centro_medico	: this.id_centro_medico,
			id_doctor			: this.id_doctor,
			id_paciente			: this.id_paciente,
			inicio				: this.cita.fecha + " " + this.cita.horaInicio,
			fin					: this.cita.fecha + " " + this.cita.horaFin,
			nota				: this.cita.nota
		});
		this.getDisponibilidadDoctor();
		this.show_modal = false;
		if(usuario.tipo == 'PACIENTE'){
			this.router.navigate(['/citas-paciente']);
		}
	}

	dismissModal()
	{
		this.show_modal = false;
	}
	
	eventRender(info)
	{
		// console.log( info );
	}
}

