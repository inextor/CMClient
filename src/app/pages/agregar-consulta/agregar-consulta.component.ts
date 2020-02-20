import { Component, OnInit } from '@angular/core';
import { RestService, DatosVenta } from '../../services/rest.service'
import { Doctor, Cita, Usuario, Paciente, Centro_Medico, Consulta, Servicio, Proveedor, Requisicion, Tipo_Precio, Detalle_Requisicion } from '../../models/Modelos';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError, flatMap, min } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ServiciosComponent } from '../servicios/servicios.component';

interface ServicioById {
	[key: number]: Servicio;
};

@Component({
	selector: 'app-agregar-consulta',
	templateUrl: './agregar-consulta.component.html',
	styleUrls: ['./agregar-consulta.component.css']
})

export class AgregarConsultaComponent extends BaseComponent implements OnInit {

	servicios: Servicio[] = [];
	search_servicios: Servicio[] = [];
	busqueda: string = '';
	todos_servicios: [] = [];
	proveedores: Proveedor[] = [];
	servicios_by_id: ServicioById = {};
	paciente: Paciente = {};
	doctor: Doctor = {};
	cita: Cita = null;
	consulta: Consulta = {};
	datosVenta: DatosVenta = null;
	centro_medico: Centro_Medico = null;
	id_servicio_default: number = null;
	//timer
	porcentaje: string = '0%';
	timeLeft: number = 0;
	interval;
	tiempo_transcurrido: number;
	tiempo_transcurrido_segundos: string = '';
	//venta_handler:VentaHandler;

	detalles_requisicion: Detalle_Requisicion[] = [];

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
		//this.venta_handler = new VentaHandler();
	}


	loadByIdCita(id_cita: number) {
		this.rest.consulta.search
			({
				eq: { id_cita: id_cita }
			})
			.subscribe((response) => {
				if (response.total == 0) {
					console.log('Consulta no encontrada');
					this.rest.cita.get(id_cita).subscribe((cita) => {
						this.loadConsultaData({
							id_doctor: cita.id_doctor
							, id_paciente: cita.id_paciente
							, id_venta: null
							, id_cita: id_cita
							, id_centro_medico: cita.id_centro_medico
							, id_servicio: cita.id_servicio
						});

					}, (error) => this.showError(error));
				}
				else {
					console.log('Consulta Encontrada');
					this.loadConsultaData(response.datos[0]);
					//mostrar el tiempo que se realizo en la cita, cuando esta ya termino.
					if (this.consulta.inicio_consulta != null && this.consulta.fin_consulta != null) {
						let date = this.rest.getLocalDateFromMysqlString(this.consulta.inicio_consulta);
						let now = this.rest.getLocalDateFromMysqlString(this.consulta.fin_consulta);
						let defaultTime = 1800;
						let diferencia = (now.getTime() - date.getTime()) / 10;
						console.log(date, now);
						console.log("inicio consulta", this.consulta.inicio_consulta);
						this.porcentaje = diferencia / defaultTime + '%';
						this.tiempo_transcurrido = (((now.getTime() - date.getTime()) / 1000) / 60);

					}

				}
			}, (error) => this.showError(error));
	}

	getDatosVenta(consulta: Consulta, centro_medico: Centro_Medico) {
		let datosVenta: DatosVenta =
		{
			venta: {
				id_centro_medico: centro_medico.id
				, id_usuario_atendio: consulta.id_doctor
				, iva: 0
				, total: 0
			}
			, centro_medico: centro_medico
			, detalles: []
			, cliente: {}
			, atendio: {}
			, pagos: []
			, tipo_precio: {}
		};
		return datosVenta;
	}


	loadConsultaData(consulta) {
		this.consulta = consulta;
		console.log("se cargo la consulta", consulta)
		let centro_medico = this.rest.getCurrentCentroMedico();

		forkJoin([
			this.rest.doctor.get(this.consulta.id_doctor)
			, this.rest.paciente.get(this.consulta.id_paciente)
			, centro_medico.id == this.consulta.id_centro_medico ? of(centro_medico) : this.rest.centro_medico.get(this.consulta.id_centro_medico)
			, consulta.id_venta ? this.rest.getDatosVenta(this.consulta.id_venta) : of(null)
			, this.rest.tipo_precio.search({ eq: { id_organizacion: centro_medico.id_organizacion } })
			, consulta.id_cita ? this.rest.cita.get(consulta.id_cita) : of(null)
		]).subscribe((responses) => {
			this.doctor = responses[0];
			this.paciente = responses[1];
			this.centro_medico = responses[2];
			this.datosVenta = responses[3];
			//this.tipo_precios	= responses[4];
			this.cita = responses[5];
			if (this.consulta.inicio_consulta != null && this.consulta.fin_consulta == null) {
				this.interval = setInterval(() => this.actualizarTimer(), 1000);
			}

			if (this.consulta.id) {
				//Lo carga automaticamente
				console.log('Consulta', this.consulta);
			}

			else {
				//Venta Nueva
				this.datosVenta = this.getNewVenta(responses[4].datos);
				if (this.cita) //Condicion de carrera entre datosVenta y id_servicio_default al asignar punto_venta_consulta
				{
					console.log('ConsultaX', this.consulta, 'Cita', this.cita);
					setTimeout(() => {
						this.id_servicio_default = this.cita.id_servicio;
					}, 500);
				}
			}

			this.is_loading = false;
		});
	}

	getNewVenta(tipo_precios: Tipo_Precio[] = []): DatosVenta {
		console.log('Precios are', tipo_precios);
		let centro_medico: Centro_Medico = this.rest.getCurrentCentroMedico();
		let usuario: Usuario = this.rest.getUsuarioSesion();

		return {
			venta: {
				id_centro_medico: centro_medico.id
				, id_usuario_atendio: usuario.id
				, iva: centro_medico.iva
				, total: 0
				, estatus: 'PENDIENTE'
				, cliente: this.paciente.nombre
				, id_tipo_precio: tipo_precios[0].id
			}
			, centro_medico
			, detalles: []
			, cliente: null
			, atendio: this.rest.getUsuarioSesion()
			, pagos: []
			, tipo_precio: tipo_precios[0]
		}
	}

	loadById(id: number) {
		this.rest.consulta.get(id)
			.subscribe(consulta => {
				this.loadConsultaData(consulta);
			}, (error) => { this.showError(error) });
	}

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.is_loading = true;

			if (params.has('id')) {
				let id = params.get('id') ? parseInt(params.get('id')) : null;
				this.loadById(id);

			}
			else {
				this.loadByIdCita(parseInt(params.get('id_cita')))
				console.log("iniceo consulta", this.consulta.inicio_consulta);

			}
		});
	}

	guardar() {
		this.is_loading = true;
		let observable = this.rest.guardarDatosVenta(this.datosVenta).pipe(
			flatMap((datosVenta) => {
				this.consulta.id_venta = datosVenta.venta.id;
				this.datosVenta = datosVenta;
				return this.consulta.id ? this.rest.consulta.update(this.consulta) : this.rest.consulta.create(this.consulta);
			})
			, flatMap((consulta) => {
				this.consulta = consulta;
				return of(consulta);
			})
		);
		return observable;
	}

	procederPago() {
		if (this.datosVenta.venta.estatus == 'PENDIENTE') {
			this.guardar().subscribe((response) => {
				this.router.navigate(['punto-venta', this.datosVenta.venta.id]);
			}, (error) => this.showError(error));
		} else {
			this.router.navigate(['punto-venta', this.datosVenta.venta.id]);
		}
	}

	buscar(evt: any) {
		let x = this.rest.servicio.search({
			lk: { nombre: evt.target.value },
			eq: { tipo: 'PRODUCTO_FISICO' }
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}

	ngOnDestroy() {

	}

	//timer
	startTimer() {
		console.log("porcent", this.porcentaje);
		if (this.consulta.inicio_consulta == null) {
			let date = new Date();
			let str = this.rest.getMysqlStringFromLocaDate(date);
			this.consulta.inicio_consulta = str;
		}

		this.guardar().subscribe((consulta) => {
			this.is_loading = false;
			this.loadConsultaData(consulta);
		}, (error) => this.showError(error));
	}
	pauseTimer() {

		if (this.consulta.fin_consulta == null) {
			let date = new Date()
			let str = this.rest.getMysqlStringFromLocaDate(date);
			this.consulta.fin_consulta = str;
		}

		clearInterval(this.interval)

		this.is_loading = true;
		this.guardar().subscribe((response) => {
			this.is_loading = false;
		}, (error) => this.showError(error));
	}
	actualizarTimer() {

		if (this.consulta.inicio_consulta != null) {
			console.log("entro actualizar");
			let date = this.rest.getLocalDateFromMysqlString(this.consulta.inicio_consulta);
			let now = new Date();
			let defaultTime = 1800;
			let diferencia = (now.getTime() - date.getTime()) / 10;
			console.log(date, now);
			console.log("inicio consulta", this.consulta.inicio_consulta);
			this.porcentaje = (diferencia / defaultTime).toFixed(2) + '%';
			console.log("entro actualizar porcentaje", this.porcentaje);
			this.tiempo_transcurrido = Math.floor(((now.getTime() - date.getTime()) / 1000) / 60);
			this.tiempo_transcurrido_segundos = (((now.getTime() - date.getTime()) / 1000).toFixed(0));
		}
	}
}
