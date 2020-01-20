import { Component, OnInit } from '@angular/core';
import { RestService,DatosVenta } from '../../services/rest.service'
import { Doctor, Cita, Usuario, Paciente, Centro_Medico, Consulta, Servicio, Proveedor, Requisicion, Tipo_Precio, Detalle_Requisicion } from '../../models/Modelos';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin,of } from 'rxjs';
import { catchError,flatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ServiciosComponent } from '../servicios/servicios.component';

interface ServicioById {
	[key:number]:Servicio;
};

@Component({
	selector: 'app-agregar-consulta',
	templateUrl: './agregar-consulta.component.html',
	styleUrls: ['./agregar-consulta.component.css']
})

export class AgregarConsultaComponent extends BaseComponent implements OnInit {

	servicios: Servicio[]			= [];
	search_servicios: Servicio[]	= [];
	busqueda: string				= '';
	todos_servicios: []				= [];
	proveedores: Proveedor[]		= [];
	servicios_by_id:ServicioById	= {};
	paciente: Paciente = {};
	doctor: Doctor = {};
	consulta: Consulta = {};
	datosVenta:DatosVenta = null;
	centro_medico:Centro_Medico = null;
	//timer
	timeLeft: number = 60;
	interval;
	//venta_handler:VentaHandler;

	detalles_requisicion:Detalle_Requisicion[] = [];

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
		//this.venta_handler = new VentaHandler();
	}


	loadByIdCita(id_cita:number)
	{
		this.rest.consulta.search
		({
			eq:{ id_cita: id_cita }
		})
		.subscribe((response)=>
		{
			if( response.total ==  0 )
			{
				console.log('Consulta no encontrada');
				this.rest.cita.get( id_cita ).subscribe((cita)=>
				{
					this.loadConsultaData({
						id_doctor 			: cita.id_doctor
						,id_paciente 		: cita.id_paciente
						,id_venta			: null
						,id_cita			: id_cita
						,id_centro_medico	: cita.id_centro_medico
						,id_servicio 		: cita.id_servicio
					});
				},(error)=>this.showError( error ));
			}
			else
			{
				console.log('Consulta Encontrada');
				this.loadConsultaData( response.datos[0] );
			}
		},(error)=>this.showError(error));
	}
	
	getDatosVenta( consulta:Consulta , centro_medico:Centro_Medico )
	{
		let datosVenta:DatosVenta =
		{
			venta: {
				id_centro_medico 	: centro_medico.id
				,id_usuario_atendio	: consulta.id_doctor
				,iva				: 0
				,total				: 0
			}
			,centro_medico	: centro_medico
			,detalles		: []
			,cliente		: {}
			,atendio		: {}
			,pagos			: []
			,tipo_precio	: {}
		};
		return datosVenta;
	}


	loadConsultaData(consulta)
	{
		this.consulta = consulta;

		let centro_medico = this.rest.getCurrentCentroMedico();

		forkJoin([
			this.rest.doctor.get( this.consulta.id_doctor )
			,this.rest.paciente.get( this.consulta.id_paciente )
			,centro_medico.id == this.consulta.id_centro_medico ? of( centro_medico ) : this.rest.centro_medico.get( this.consulta.id_centro_medico )
			,consulta.id_venta ? this.rest.getDatosVenta( this.consulta.id_venta) : of( null )
			,this.rest.tipo_precio.search({ eq:{ id_organizacion: centro_medico.id_organizacion }})
		]).subscribe((responses)=>
		{
			this.doctor = responses[0];
			this.paciente = responses[1];
			this.centro_medico = responses[2];
			this.datosVenta	= responses[ 3 ];
			if( responses[ 3 ]  == null )
			{
				this.datosVenta = this.getNewVenta(responses[4].datos );
			}
			this.is_loading = false;
		});
	}

	getNewVenta(tipo_precios:Tipo_Precio[] = []):DatosVenta
	{
		console.log('Precios are', tipo_precios);
		let centro_medico:Centro_Medico	= this.rest.getCurrentCentroMedico();
		let usuario:Usuario				= this.rest.getUsuarioSesion();

		return {
			venta			: {
				id_centro_medico 	: centro_medico.id
				,id_usuario_atendio	: usuario.id
				,iva				: centro_medico.iva
				,total				: 0
				,estatus			: 'PENDIENTE'
				,cliente			: this.paciente.nombre
				,id_tipo_precio		: tipo_precios[0].id
			}
			,centro_medico
			,detalles		: []
			,cliente		: null
			,atendio		: this.rest.getUsuarioSesion()
			,pagos			: []
			,tipo_precio	: tipo_precios[0]
		}
	}

	loadById(id:number)
	{
		this.rest.consulta.get( id )
		.subscribe( consulta =>
		{
			this.loadConsultaData( consulta );
		},(error)=>{ this.showError( error ) });
	}

	ngOnInit()
	{
		this.route.paramMap.subscribe(params =>
		{
			this.is_loading = true;

			if( params.has('id') )
			{
				let id = params.get('id') ? parseInt(params.get('id')) : null;
				this.loadById( id );
			}
			else
			{
				this.loadByIdCita( parseInt( params.get('id_cita') ) )
			}
		});
	}

	guardar() {
		this.is_loading = true;
		let observable =

		this.rest.guardarDatosVenta( this.datosVenta ).pipe
		(
			flatMap((datosVenta)=>
			{
				this.consulta.id_venta = datosVenta.venta.id;
				return this.consulta.id ? this.rest.consulta.update(this.consulta) : this.rest.consulta.create(this.consulta);
			})
		).subscribe((consulta)=>
		{
			this.consulta = consulta;
			this.is_loading = false;
			//Redirigir a donde???
		},(error)=>this.showError(error));
	}
	

	buscar(evt: any)
	{
		let x = this.rest.servicio.search({
			lk: { nombre: evt.target.value },
			eq:{tipo:'PRODUCTO_FISICO'}
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}

	ngOnDestroy()
	{

	}

	//timer
	startTimer() {
		this.interval = setInterval(() => {
			if(this.timeLeft > 0) {
				this.timeLeft--;
			} else {
			this.timeLeft = 60;
			}
		},1000)
		}
	
	pauseTimer() {
		clearInterval(this.interval);
	}
}
