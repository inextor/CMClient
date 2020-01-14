import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitasService } from '../../services/citas.service';
import { AgendarCitaComponent } from '../agendar-cita/agendar-cita.component';
import { RestService } from '../../services/rest.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from	'@angular/common';
import { Router,Params, ParamMap} from "@angular/router"

@Component({
	selector: 'app-horario-doctor',
	templateUrl: './horario-doctor.component.html',
	styleUrls: ['./horario-doctor.component.css']
})
export class HorarioDoctorComponent implements OnInit {

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

	@ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

	constructor(
		private citasService:CitasService,
		public restService:RestService,
		public route:ActivatedRoute,
		public router:Router
	)
	{

	}

		//public modalController: ModalController,

	ngOnInit()
	{
		this.is_mobile= this.restService.isMobile();

		this.route.paramMap.subscribe( params =>
		{
			this.id_doctor		= parseInt(params.get('id_doctor'));
			this.id_paciente		= parseInt(params.get('id_paciente'));
			this.id_centro_medico	= parseInt(params.get('id_centro_medico'));
		});
	}

	ngAfterViewInit(): void {
		this.getDisponibilidadDoctor();
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
			calendarAPI.addEventSource(disponibilidad);
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
			calendarAPI.addEventSource({ id: 'disponibilidad', events: calendarEvents });
		});


		this.citasService.getHorarioDoctor(this.id_doctor, this.id_centro_medico).subscribe(
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
				console.log("asdfasdfasdfs",calendarEvents);
				calendarAPI.addEventSource({id: 'horario', events: calendarEvents});
			}
		)
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
		console.log( info );
	}
}
