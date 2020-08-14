import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { Cita, Horario_Doctor, Doctor, Centro_Medico, Paciente, Servicio, Usuario } from 'src/app/models/Modelos';
import { RestService } from 'src/app/services/rest.service';
import { Observable, BehaviorSubject, forkJoin, fromEvent, of } from 'rxjs';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput, constrainPoint } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { SearchObject, SearchCitaResponse, SearchCitaRequest, Respuesta } from '../../models/Respuestas';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { CitasComponent } from 'src/app/pages/citas/citas.component';
export interface SimpleMap {
	[key: string]: Object;
}

@Component({
	selector: 'app-calendario-agendar-cita',
	templateUrl: './calendario-agendar-cita.component.html',
	styleUrls: ['./calendario-agendar-cita.component.css']
})
export class CalendarioAgendarCitaComponent extends BaseComponent implements OnInit, OnChanges {
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	@Input() doctor: Doctor;
	@Input() centro_medico: Centro_Medico;
	@Input() paciente: Paciente;
	@Input() servicio: Servicio;
	@Output() citaAgendada = new EventEmitter<Cita>();

	//calendarEvents:EventInput[] = [];
	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];
	@ViewChild('calendar') calendarComponent: FullCalendarComponent;

	disponible: boolean = false;
	events: SimpleMap = {};
	usuario: Usuario;
	show_modal: boolean = false;
	counterId: number = 0;
	buttons = {
		today: 'Hoy',
		month: 'Mes',
		week: 'Semana',
		day: 'Día',
	}

	slotLabelFormat = {

		hour: 'numeric',
		minute: '2-digit',
		omitZeroMinute: false,
		meridiem: 'short'
	}


	titleFormat;
	calendarOptions = {
		editable: false,

		header: {
			left: 'title',
			center: 'timeGridDay,timeGridWeek',
			right: 'prev,today,next anterior,siguiente',
		},
		footer: true,

		eventLimit: true,
		height: 'auto',
		defaultView: "timeGridWeek"
	};



	cita: Cita = {
		inicio: null
	}
	cita_search: SearchObject<Cita> = {
	};
	cita_fecha: Date = null;
	// variables validacion citas
	citas: Cita[] = [];
	citas_dic: any = {};
	ngOnInit() {
		this.usuario = this.rest.getUsuarioSesion();
		// this.centro_medico = this.rest.getCurrentCentroMedico();
		this.counterId = 0;
		if (this.usuario && this.usuario.tipo == 'PACIENTE') {
			if (window.innerWidth <= 700) {
				this.calendarOptions = {
					editable: false,
					header: {
						left: 'title',
						center: 'timeGridDay,timeGridWeek',
						right: 'prev,next',
					},
					footer: true,

					eventLimit: true,
					height: 'auto',
					defaultView: "timeGridWeek"
				};
				this.buttons = {
					today: 'hoy',
					month: 'mes',
					week: 'sem',
					day: 'dia',
				};

				this.titleFormat = {
					month: 'short', day: 'numeric'
				};
			} else {

				this.titleFormat = {
					year: 'numeric', month: 'long', day: 'numeric'

				}
			}

		} else {
			if (window.innerWidth <= 700) {
				this.calendarOptions = {
					editable: false,
					header: {
						left: 'title',
						center: 'timeGridDay,timeGridWeek',
						right: 'prev,next',
					},
					footer: true,

					eventLimit: true,
					height: 'auto',
					defaultView: "timeGridWeek"
				};
				this.buttons = {
					today: 'hoy',
					month: 'mes',
					week: 'sem',
					day: 'dia',
				};

				this.titleFormat = {
					month: 'short', day: 'numeric'
				};
			}
		}
		this.cita_search = {
			eq: {},
			ge: {},
			le: {}
		};
	}

	ngAfterViewInit() {
		console.log('Here is the fail');
		//this.good();
		//setTimeout(()=>{ this.loadData();console.log('yeahhh')}, 1000 );
	}


	ngOnChanges(changes: SimpleChanges) {

		let loadCounter: number = 0

		if (changes['doctor'] || changes['centro_medico'] || changes['paciente']) {
			if (this.doctor !== null && this.centro_medico !== null && this.paciente !== null) {
				this.good();
			}
		}
	}

	good() {
		const calendarAPI = this.calendarComponent.getApi();

		calendarAPI.addEventSource({
			id: 'citas'

			, events: (info, successCallback, failureCallback) => {
				console.log(info, typeof successCallback, typeof failureCallback);
				this.getEvents(info, successCallback, failureCallback);
			}
		});

		calendarAPI.addEventSource({
			id: 'nueva_cita'
			, events: []
		});

		//calendarAPI.addEvent({id: 'disponibilidad', events: this.calendarEvents });
		//calendarAPI.addEvent({id: 'citas', events: citas});
		calendarAPI.refetchEvents();
		calendarAPI.render();
	}


	getEventsForWeek(start, disponibilidad) {
		disponibilidad.map
	}


	getEvents(info, successCallback, errorCallback) {
		console.log('Getting events for', info.start);
		let usuario_sesion = this.rest.getUsuarioSesion();
		let id_doctor: number = this.usuario.id;
		// let id_centro_medico: number = centro_medico.id;

		forkJoin([
			this.rest.horario_doctor.getAll({ id_centro_medico: usuario_sesion.id_centro_medico }, { id_doctor: id_doctor })
			, this.rest.cita.search
				(
					{
						eq:
						{
							id_centro_medico: usuario_sesion.id_centro_medico
							, id_doctor: id_doctor
							, estatus: 'ACTIVA'
						}
						, ge:
						{
							inicio: this.rest.getMysqlStringFromLocaDate(info.start)
						}
						, le:
						{
							inicio: this.rest.getMysqlStringFromLocaDate(info.end)
						}
					}
				)
		]).subscribe((responses) => {
				let disponibilidad = [];
				let citas = [];
				let calendarEvents = [];

				let fooo = this.map(info.start, responses[0].datos);

				fooo.forEach(i => {
					let id = this.counterId + 1;
					this.counterId++;
					//console.log( i );
					let obj = {
						id: i.id
						, rendering: 'background'
						, classNames: ['disponibilidad']
						, title: 'disponible'
						, editable: false
						, start: i.start
						, end: i.end
						//daysOfWeek: [i.dia_semana]
					};

					if (!this.events[obj.id]) {
						this.events[obj.id] = obj;
					}
					calendarEvents.push(obj);
				});

				responses[1].datos.forEach((cita) => {
					const id = this.counterId;
					this.counterId += 1;

					let hora_final = cita.inicio;
					let hora = this.rest.getLocalDateFromMysqlString(cita.inicio);
					hora.setHours(hora.getHours() + 1);

					let obj = {
						id: '' + cita.id
						, classNames: ['evento_normal']
						, title: 'Reservado'
						, textColor: 'white'
						, slotLabelFormat: this.slotLabelFormat
						, editable: false
						, start: cita.inicio
						, end: cita.fin == null ? hora : cita.fin
					};

					if (!this.events[obj.id]) {
						this.events[obj.id] = obj;
					}
					calendarEvents.push(obj);
				});

				console.log('Events are', calendarEvents);

				successCallback(calendarEvents);
			}, (error) => { errorCallback(error); });
	}

	map(startDate: Date, horario_doctor: Horario_Doctor[]) {
		let currentDay = startDate.getDay();
		let dates = [];
		let increments = [];

		let initDates = [0, 1, 2, 3, 4, 5, 6];


		for (let i = 0; i < 7; i++) {
			if (currentDay >= i)
				increments.push(i - currentDay);
			else
				increments.push(i - currentDay);
		}

		for (let i = 0; i < 7; i++) {
			let date = new Date();
			date.setTime(startDate.getTime());
			date.setDate(date.getDate() + increments[i]);
			dates.push(date);
		}

		console.log('Current day', startDate.getDay());
		return horario_doctor.map(i => {
			let startDate = dates[i.dia_semana];
			let start = new Date();
			start.setTime(startDate.getTime());

			let hour = parseInt(i.hora_inicio.substring(0, 2), 10);
			let minutes = parseInt(i.hora_inicio.substring(3, 5), 10);

			start.setHours(hour);
			start.setMinutes(minutes);

			let end = new Date();
			end.setTime(startDate.getTime());

			//console.log( 'End', end );
			//console.log( 'Hour', i.hora_final );
			let finalHour = parseInt(i.hora_final.substring(0, 2))
			let finalMinutes = parseInt(i.hora_final.substring(3, 5));

			//console.log('finalHour', finalHour );
			//console.log('minutes', finalMinutes );

			end.setHours(finalHour);
			end.setMinutes(finalMinutes);

			console.log('Mapped from ', i.dia_semana + ' ' + i.hora_inicio, 'to', start.getDay(), start);
			let d = this.rest.getMysqlStringFromLocaDate(start);
			let str = d.substring(0, 10);
			console.log('Date id', str);
			return {
				id: i.id + str
				, start: start
				, end: end
				, render: 'background'
			};
		});
	}

	eventRender(info) {
		console.log('Event Render', info);
	}

	cancelarCita() {
		this.show_modal = false;
	}


	aceptarCita() {

		//let usuario = this.restService.getUsuarioSesion();
		let cita = this.citas.find(i => i.inicio == this.rest.getMysqlStringFromLocaDate(this.cita_fecha));
		console.log("la encontro", cita);
		if (!cita) {
			this.rest.cita.create({
				id_centro_medico: this.centro_medico.id
				, id_doctor: this.doctor.id
				, id_paciente: this.paciente.id
				, inicio: this.rest.getMysqlStringFromLocaDate(this.cita_fecha)
				//,fin					: this.cita.fecha + " " + this.cita.horaFin,
				, nota: this.cita.nota
				, id_servicio: this.servicio ? this.servicio.id : null
			})
				.subscribe
				(
					response => {
						this.citaAgendada.emit(response);
						//this.router.navigate(['/citas-paciente']);
					}
					, (error) => {
						let str = this.rest.getErrorMessage(error);
						this.rest.showError({ mensaje: this.rest.getErrorMessage(error), tipo: 'alert-danger' });
					}
				);
		} else {
			this.showError("Ya existe una cita del paciente con la misma fecha.")
		}
	}

	// busca las citas recientes del paciente seleccionado para comparar si ya existe una con la misma fecha.
	validateDate() {
		let d = new Date();
		d.setHours(d.getHours() - 3);
		let z = (i) => i < 10 ? '0' + i : i;
		let currentDate = new Date();
		let fecha_inicio = '' + currentDate.getFullYear() + '-' + z(currentDate.getMonth() + 1) + '-' + z(currentDate.getDate()) + ' ' + z(currentDate.getHours()) + ':' + z(currentDate.getMinutes()) + ':00';
		this.cita_search.eq.id_centro_medico = this.centro_medico.id
		this.cita_search.eq.id_doctor = this.doctor.id
		this.cita_search.eq.id_paciente = this.paciente.id
		this.cita_search.ge.inicio = fecha_inicio
		console.log("lacitasearch", this.cita_search);
		this.rest.cita.search(this.cita_search).subscribe((response) => {
			this.citas = response.datos
			this.citas.forEach(i => this.citas_dic[i.id] = i);
			console.log("imprimiento citas", this.citas);
		})
	}
	dateClick(evt) {
		this.validateDate();
		// console.log("Click on ", evt.date );
		console.log('asdfasdagsdgasdgasgas', evt);
		// si el evento seleccionado es disponible se puede crear la cita 
		if (this.disponible == true) {
			this.cita_fecha = evt.date;
			let dateNow = new Date();
			// si la fecha de la cita es anterior a la del dia de hoy manda un error
			if (evt.date < dateNow) {
				this.rest.showError({ mensaje: 'No se pueden agregar citas con fecha en el pasado', tipo: 'alert-danger' });
				return;
			}
			const calendarAPI = this.calendarComponent.getApi();

			let fecha = this.rest.getMysqlStringFromLocaDate(evt.date);
			this.cita.inicio = fecha.substring(0, 20);

			console.log('Fecha inicio', this.cita.inicio);
			//volvemos a poner el flag  disponible en false, por si se cancela la creacion de la cita
			this.disponible = false;
			this.show_modal = true;
		} else {
			this.rest.showError({ mensaje: 'Fecha no disponible para citas', tipo: 'alert-danger' });
			return;
		}
		return false;
	}

	eventClicked(evt) {
		//Indica si se selecciono un evento con titulo disponible para validar el horario disponible
		console.log('evento', evt);
		if (evt.event.title == 'disponible') {
			// si el evento es disponible pone el flag disponible en true
			this.disponible = true;
		}

	}

}
