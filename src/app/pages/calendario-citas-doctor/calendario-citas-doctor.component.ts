import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { Cita, Horario_Doctor, Doctor, Centro_Medico, Paciente, Usuario } from 'src/app/models/Modelos';
import { RestService } from 'src/app/services/rest.service';
import { Observable, BehaviorSubject, forkJoin, fromEvent, of } from 'rxjs';
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router"
import { BaseComponent } from 'src/app/pages/base/base.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { flatMap } from 'rxjs/operators';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { SearchObject } from '../../models/Respuestas';
import { PacientesComponent } from '../pacientes/pacientes.component';

export interface SimpleMap {
	[key: string]: Object;
}

@Component({
	selector: 'app-calendario-citas-doctor',
	templateUrl: './calendario-citas-doctor.component.html',
	styleUrls: ['./calendario-citas-doctor.component.css']
})
export class CalendarioCitasDoctorComponent extends BaseComponent implements OnInit, OnChanges {

	@Input() doctor: Doctor = null;
	@Input() centro_medico: Centro_Medico = null;
	@Input() paciente: Paciente;
	@Output() citaAgendada = new EventEmitter<Cita>();

	//calendarEvents:EventInput[] = [];
	calendarPlugins = [dayGridPlugin, TimeGrid, interactionPlugin];
	@ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;


	events: SimpleMap = {};
	citas: Cita[] = [];
	usuario;
	pacientes;
	nombrePaciente;
	cita_search: SearchObject<Cita> = {

	};
	show_modal: boolean = false;
	counterId: number = 0;


	slotLabelFormat ={
	
		hour: 'numeric',
		minute: '2-digit',
		omitZeroMinute: false,
		meridiem: 'short'
	  }

	buttons = {
		today: 'Hoy',
		month: 'Mes',
		week: 'Semana',
		day: 'Día',
		list: 'lista'
	}

	titleFormat;

	calendarOptions = {
		editable: false,
		header: {
			left: 'title',
			center: 'timeGridDay,timeGridWeek,dayGridMonth',
			right: 'prev,today,next',
		},
		footer: true,

		eventLimit: true,
		height: 'auto',
		defaultView: "timeGridWeek"
	};

	cita: Cita = {
		inicio: null
	}

	cita_fecha: Date = null;

	ngOnInit() {
		this.usuario = this.rest.getUsuarioSesion();
		this.counterId = 0;

		if (this.usuario && this.usuario.tipo == 'PACIENTE') {
			if (window.innerWidth <= 700) {
				this.calendarOptions = {
					editable: false,
					header: {
						left: 'title',
						center: 'timeGridDay,dayGridMonth',
						right: 'prev,next',
					},
					footer: true,

					eventLimit: true,
					height: 'auto',
					defaultView: "dayGridMonth"
				};
				this.buttons = {
					today: 'hoy',
					month: 'mes',
					week: 'sem',
					day: 'dia',
					list: 'lista'
				};

				this.titleFormat = {
					month: 'short', day: 'numeric'
				};
			} else {

				this.titleFormat = {
					year: 'numeric', month: 'long', day: 'numeric'

				}
			}

		}else{
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
					list: 'lista'
				};

				this.titleFormat = {
					month: 'short', day: 'numeric'
				};
			}
		}

	}

	ngAfterViewInit() {
		console.log('Here is the fail');
		this.good();
		//this.good();
		//setTimeout(()=>{ this.loadData();console.log('yeahhh')}, 1000 );
	}


	ngOnChanges(changes: SimpleChanges) {
		let loadCounter: number = 0

		//if( changes['doctor'] || changes['centro_medico'] || changes['paciente'] )
		//{
		//	if( this.doctor !== null && this.centro_medico !== null && this.paciente !== null )
		//	{
		//		this.good();
		//	}
		//}
	}
	mobileCheck() {
		if (window.innerWidth >= 700) {
			return false;
		} else {
			return true
		}
	}

	good() {
		const calendarAPI = this.calendarComponent.getApi();
		let usuario = this.rest.getUsuarioSesion();

		if (usuario.tipo !== 'PACIENTE') {
			calendarAPI.addEventSource({
				id: 'citas'
				, events: (info, successCallback, failureCallback) => {
					console.log(info, typeof successCallback, typeof failureCallback);
					this.getEvents(info, successCallback, failureCallback);
				}
			});

			// calendarAPI.addEventSource({
			// 	id: 'nueva_cita'
			// 	, events: []
			// });
		} else {
			calendarAPI.addEventSource({
				id: 'citas'
				, events: (info, successCallback, failureCallback) => {
					console.log(info, typeof successCallback, typeof failureCallback);
					this.getEventsPaciente(info, successCallback, failureCallback);
				}
			});


		}
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

	getEventsPaciente(info, successCallback, errorCallback) {
		let centro_medico = this.rest.getCurrentCentroMedico();
		let usuario = this.rest.getUsuarioSesion();
		let id_paciente;
		this.cita_search = {
			eq: {},
			ge: {},
			le: {}
		};
		console.log("infostart", info.start, info.end)
		this.rest.paciente.search({ eq: { id_usuario: usuario.id } }).pipe(flatMap(responses => {
			if (responses.datos.length == 0) {
				console.log("error")
			}
			this.pacientes = responses.datos;
			let ids = responses.datos.map(i => i.id);
			this.cita_search.csv = { id_paciente: ids };
			this.cita_search.eq = { estatus: 'ACTIVA', id_centro_medico: usuario.id_centro_medico }
			this.cita_search.ge = { inicio: this.rest.getMysqlStringFromLocaDate(info.start) }
			this.cita_search.le = { inicio: this.rest.getMysqlStringFromLocaDate(info.end) }

			console.log("aidis", ids);
			return forkJoin([
				of(responses.datos),
				this.rest.paciente.getAll({}),
				this.rest.searchCita.search(this.cita_search)
			])
		})).subscribe((result) => {

			let calendarEvents = [];
			console.log('citaspaciente', result[1].datos);

			let pacientes = result[1].datos;
			result[2].datos.forEach((cita) => {
				this.citas.push(cita.cita);

				const id = this.counterId;
				this.counterId += 1;
				let hora_final = cita.cita.inicio;
				let hora = this.rest.getLocalDateFromMysqlString(cita.cita.inicio);
				hora.setHours(hora.getHours() + 1);
				console.log("hora", hora);
				let obj = {
					id: '' + cita.cita.id
					, classNames: ['evento_normal', cita.cita.estatus]
					, title: cita.paciente.nombre
					, editable: false
					,slotLabelFormat:this.slotLabelFormat
					, start: cita.cita.inicio
					, textColor: 'white'
					, end: cita.cita.fin === null ? hora : cita.cita.fin
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


	getEvents(info, successCallback, errorCallback) {
		console.log('Getting events for', info.start);

		let centro_medico = this.rest.getCurrentCentroMedico();
		let usuario = this.rest.getUsuarioSesion();

		console.log('Consultando para', centro_medico, usuario);

		let id_doctor = usuario.id
		this.cita_search = {
			eq: {},
			ge: {},
			le: {},
			limite: 500

		};
		this.cita_search.eq = { estatus: 'ACTIVA', id_centro_medico: centro_medico.id, id_doctor: id_doctor}
		this.cita_search.ge = { inicio: this.rest.getMysqlStringFromLocaDate(info.start) }
		this.cita_search.le = { inicio: this.rest.getMysqlStringFromLocaDate(info.end) }
		forkJoin([
			this.rest.horario_doctor.getAll({ id_centro_medico: centro_medico.id }, { id_doctor: id_doctor })
			, this.rest.searchCita.search(this.cita_search),
		]).subscribe((responses) => {
				let disponibilidad = [];
				let citas = [];
				let calendarEvents = [];

			
				console.log('citaspaciente', responses[1]);

				// fooo.forEach(i => {
				// 	let id = this.counterId + 1;
				// 	this.counterId++;

				// 	let obj = {
				// 		id: i.id
				// 		, rendering: 'background'
				// 		, classNames: ['disponibilidad']
				// 		, title: 'ffffff'
				// 		, editable: false
				// 		, start: i.start
				// 		, end: i.end

				// 	};

				// 	if (!this.events[obj.id]) {
				// 		this.events[obj.id] = obj;
				// 	}
				// 	calendarEvents.push(obj);
				// });

				responses[1].datos.forEach((cita) => {
					this.citas.push(cita.cita);

					const id = this.counterId;
					this.counterId += 1;

					let hora_final = cita.cita.inicio;
					let hora = this.rest.getLocalDateFromMysqlString(cita.cita.inicio);
					hora.setHours(hora.getHours() + 1);

					console.log(cita);
					let obj = {
						id: '' + cita.cita.id
						, classNames: ['evento_normal', cita.cita.estatus]
						, title: cita.paciente.nombre + ' ' + cita.paciente.apellidos
						, editable: false
						,slotLabelFormat:this.slotLabelFormat
						, start: cita.cita.inicio
						,borderColor: '#9e9e9e'
						,backgroundColor: cita.cita.confirmado_por_doctor == 'SI' && cita.cita.confirmado_por_paciente =='SI' ? '#1e88e5':'#e53935'
						, textColor: 'white'
						, end: cita.cita.fin == null ? hora : cita.cita.fin
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



	eventClicked(evt) {
		if (this.usuario.tipo == 'DOCTOR') {

			if (evt.event.rendering == 'background')
				return;

			for (let cita of this.citas) {
				if (cita.id == evt.event.id) {
					if (cita.estatus !== 'CANCELADA' && cita.confirmado_por_doctor=='SI' && cita.confirmado_por_paciente =='SI') {
						this.router.navigate(['agregar-consulta-cita', evt.event.id]);
						return;

					}else{
						this.showError('la cita debe confirmarse por doctor y paciente');
						return;
					}
					
				}
			}

			this.router.navigate(['agregar-consulta-cita', evt.event.id]);
			return;
		}
	}

	dateClick(evt) {
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

		//		console.log('Fecha inicio', evt );
	}
}
