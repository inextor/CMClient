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


	ngOnInit() {

	}

}

