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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
		right: 'timeGridDay'
	  }
	private id_doctor:number;
	private id_paciente:number;
	private id_centro_medico:number;

	@ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];

	cita = {
		paciente	: '',
		fecha		: '',
		horaInicio	: '',
		horaFin		: '',
		nota		: ''
	};
   
	constructor(
		private citasService:CitasService,
		public restService:RestService,
		public route:ActivatedRoute,
		public router:Router
	)
	{

	}



  ngOnInit() {
    this.is_mobile= this.restService.isMobile();

		this.route.paramMap.subscribe( params =>
		{
			this.id_doctor		= parseInt(params.get('id_doctor'));
			this.id_paciente		= parseInt(params.get('id_paciente'));
			this.id_centro_medico	= parseInt(params.get('id_centro_medico'));
		});
  }

}
