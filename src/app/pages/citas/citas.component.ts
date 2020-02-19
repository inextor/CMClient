import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor, Paciente } from '../../models/Modelos';
import { SearchCitaResponse, SearchCitaRequest, Respuesta } from '../../models/Respuestas';
import { Router, ActivatedRoute } from "@angular/router"
import { Cita, Centro_Medico } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { SearchObject } from '../../models/Respuestas';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-citas',
	templateUrl: './citas.component.html',
	styleUrls: ['./citas.component.css']
})
export class CitasComponent extends BaseComponent implements OnInit {

	cita: Cita = {};
	info_citas: SearchCitaResponse[] = [];
	orderBy = 'Fecha';
	// id_paciente para buscar las citas de un paciente s
	orderDirection = 'ASC';
	tipo_busqueda = 'nombre';
	paciente: Paciente = {};
	doctor: Doctor = {};
	citas: Cita[] = [];
	centros_medicos: Centro_Medico[] = [];
	doctorSesion: Doctor = {};
	currentInfoCita: SearchCitaResponse = null;

	showConfirmDoctor: boolean = false;
	showConfirmPaciente: boolean = false;
	showConfirmCancelar: boolean = false;
	showConfirmActivar: boolean = false;

	nombre: string;

	cita_search: SearchObject<Cita> = {
	};
	busquedaAvanzada: boolean = false;
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	ngOnInit() {
		let usuario = this.rest.getUsuarioSesion();
		let d = new Date();
		d.setHours(d.getHours() - 3);
		let z = (i) => i < 10 ? '0' + i : i;
		// verificando si el usuario es un doctor para filtrar la busqueda


		this.route.queryParams.subscribe(params => {
			this.cita_search = {
				eq: {estatus:'',id_centro_medico:null},
				ge: {},
				le: {}
			};
			console.log("Nueva pagina");

			console.log("Parametros", params);

			this.titleService.setTitle('Citas');

			let currentDate = new Date();

			let fecha_inicio = '' + currentDate.getFullYear() + '-' + z(currentDate.getMonth() + 1) + '-' + z(currentDate.getDate()) + ' ' + z(currentDate.getHours()) + ':' + z(currentDate.getMinutes()) + ':00';

			this.cita_search.ge.inicio = 'inicio' in params ? params.inicio : fecha_inicio;
			this.cita_search.le.inicio = 'fin' in params ? params.fin : null;
			this.cita_search.eq.id_paciente = 'id_paciente' in params ? params.id_paciente : null;
			if (usuario.tipo == "ADMIN" || usuario.tipo == "RECEPCIONISTA") {
				this.cita_search.eq.id_doctor = 'id_doctor' in params ? params.id_doctor : null;
			} else {
				this.cita_search.eq.id_doctor = 'id_doctor' in params ? params.id_doctor : usuario.id;
			}


			this.cita_search.eq.id_centro_medico = 'id_centro_medico' in params ? params.id_centro_medico : null;
			this.cita_search.eq.estatus = 'estatus' in params ? params.estatus : null;
			this.cita_search.eq.confirmado_por_doctor = 'confirmado_por_doctor' in params ? params.confirmado_por_doctor : null;
			this.cita_search.eq.confirmado_por_paciente = 'confirmado_por_paciente' in params ? params.confirmado_por_paciente : null;



			this.cita_search.limite = this.pageSize;
			this.cita_search.pagina = 'pagina' in params ? parseInt(params.pagina) : 0;
			this.nombre = 'nombre' in params ? params.nombre : '';

			console.log('Search', this.cita_search);
			console.log('nombre', this.nombre);
			let rjoinObj: any = {};
			let fjarray = [];


			this.is_loading = true;

			forkJoin([
				this.cita_search.eq.id_paciente ? this.rest.paciente.get(this.cita_search.eq.id_paciente) : of(null)
				, this.cita_search.eq.id_doctor ? this.rest.doctor.get(this.cita_search.eq.id_doctor) : of(null)
				, this.rest.centro_medico.getAll({ id_organizacion: usuario.id_organizacion })
				, this.rest.searchCita.search(this.cita_search, { nombre: this.nombre })
			]).subscribe((result) => {
				this.paciente = result[0];
				this.doctor = result[1];
				this.centros_medicos = result[2].datos;
				this.info_citas = result[3].datos;
				this.setPages(this.cita_search.pagina, result[3].total);
				console.log(this.info_citas);
			}, error => {
				console.log(error);
				this.showError(error);
			});
		});



		//this.rest.getDoctor( id_usuario )subscribe((doctor)=>





	}

	dateInicioChange(value: string) {
		this.cita_search.ge.inicio = value;
	}

	dateFinChange(value: string) {
		this.cita_search.le.inicio = value;
	}

	getPathFromSearchObj() {
	}

	buscar() {
		this.is_loading = true;
		this.cita_search.pagina = 0;
		console.log('Buscando', this.getParams());
		this.router.navigate(['/citas'], { queryParams: this.getParams() });
	}

	changeSearch(evt) {
		console.log("FOOOOO make a search", evt);
		this.search(evt.target.value);
	}

	ordenar(item) {
		if (this.orderBy === item) {
			this.orderDirection == 'ASC' ? 'DESC' : 'ASC';
		}
		else {
			this.orderBy = item;
			this.orderDirection = 'ASC';
		}
	}


	search(nombre) {

		this.router.navigate(['/citas/', this.getParams()]);
		//if( nombre.trim() )
		//	this.crequest.nombre = nombre.trim();
		//else
		//	this.crequest.nombre = '';

		//this.rest.searchCitas( this.crequest ).subscribe((respuesta)=>
		//Esperando que funcione la siguiente linea
		//this.rest.searchCita.getAll( this.crequest ).subscribe((respuesta)=>
		//{
		//	this.is_loading = false;
		//	this.info_citas = respuesta.datos;
		//}, this.showError );
	}

	confirmarDoctor(infoCita: SearchCitaResponse) {
		this.rest.cita.update({
			id: infoCita.cita.id
			, confirmado_por_doctor: 'SI'
		}).subscribe((cita) => {
			this.is_loading = false;
			this.showConfirmDoctor = false;
			let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
			if (index >= 0)
				this.info_citas[index].cita = cita;
		},
			(error) => {
				this.showConfirmDoctor = false;
				this.is_loading = false;
				this.showError(error);
			});
	}

	confirmarPaciente(infoCita: SearchCitaResponse) {
		this.rest.cita.update({
			id: infoCita.cita.id
			, confirmado_por_paciente: 'SI'
		}).subscribe((cita) => {
			this.is_loading = false;
			this.showConfirmPaciente = false;
			this.ngOnInit()
			let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
			if (index >= 0)
				this.info_citas[index].cita = cita;
		}, (error) => {
			this.is_loading = false;
			this.showConfirmPaciente = false;
			this.showError(error);
		});
	}

	cancelar(infoCita: SearchCitaResponse) {
		this.rest.cita.update({
			id: infoCita.cita.id
			, estatus: 'CANCELADA'
		}).subscribe((cita) => {
			console.log(infoCita);
			this.showConfirmCancelar = false;
			this.is_loading = false;
			let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
			if (index >= 0)
				this.info_citas[index].cita = cita;
		},
			(error) => {
				this.is_loading = false;
				this.showConfirmCancelar = false;
				this.showError(error)
			});
	}

	getParams() {
		return {
			'inicio': this.cita_search.ge.inicio,
			'fin': this.cita_search.le.inicio,
			'id_paciente': this.cita_search.eq.id_paciente,
			'id_doctor': this.cita_search.eq.id_doctor,
			'pagina': this.cita_search.pagina,
			'id_centro_medico': this.cita_search.eq.id_centro_medico,
			'confirmado_por_doctor': this.cita_search.eq.confirmado_por_doctor,
			'confirmado_por_paciente': this.cita_search.eq.confirmado_por_paciente,
			'nombre': this.nombre,
			'estatus': this.cita_search.eq.estatus
		};
	}

	activar(infoCita: SearchCitaResponse) {
		this.rest.cita.update({
			id: infoCita.cita.id
			, estatus: 'ACTIVA'
		}).subscribe((cita) => {
			this.showConfirmActivar = false;
			let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
			this.is_loading = false;
			if (index >= 0)
				this.info_citas[index].cita = cita;
		}
			, (error) => {
				this.is_loading = false;
				this.showConfirmActivar = false;
				this.showError(error);
			});
	}
}
