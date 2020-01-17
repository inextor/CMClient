import { Component, OnInit } from '@angular/core';
import { RestService,DatosVenta } from '../../services/rest.service'
import { Doctor, Cita, Usuario, Paciente, Centro_Medico, Consulta, Servicio, Proveedor, Requisicion, Tipo_Precio, Detalle_Requisicion } from '../../models/Modelos';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin,of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ServiciosComponent } from '../servicios/servicios.component';

interface ServicioById {
	[key:number]:Servicio;
};

interface Info_Precio
{
	[key:number]:Precio_Servicio[];
}

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
				this.rest.cita.get( id_cita ).subscribe((cita)=>
				{
					this.loadConsultaData({
						id_doctor 			: cita.id_doctor
						,id_paciente 		: cita.id_paciente
						,id_venta			: null
						,id_centro_medico	: cita.id_centro_medico
					});
				},(error)=>this.showError( error ));
			}
			else
			{
				this.loadConsultaData( response.datos[0] );
			}
		},(error)=>this.showError(error));
	}

	getDatosVenta( consulta:Consulta , centro_medico:Centro_Medico )
	{
		let datosVenta:DatosVenta		=
		{
			venta			: {
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
				,cliente			: tipo_precios[0].nombre
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
		let observable = this.consulta.id ? this.rest.consulta.update(this.consulta) : this.rest.consulta.create(this.consulta);

		observable.subscribe
		(
			consulta => {
				this.consulta = consulta
				this.is_loading = false;
			}
			, error => this.showError(error)
		);
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

	agregarServicio(servicio: Servicio)
	{
		//if( !( servicio.id in this.servicios_by_id ) )
		//	this.servicios_by_id[ servicio.id ] = servicio;

		//let s = this.detalles_requisicion.find(i => i.id_servicio == servicio.id);
		//if (s) {
		//	this.busqueda = '';
		//	this.aumentar(s);
		//	return;
		//}

		//this.detalles_requisicion.push
		//({
		//	id_servicio	: servicio.id, cantidad	: 1,
		//});


		//this.busqueda			= '';
		//this.search_servicios	= [];
	}

	aumentar(detalle_requisicion)
	{
	//	detalle_requisicion.cantidad++;
	}
}
