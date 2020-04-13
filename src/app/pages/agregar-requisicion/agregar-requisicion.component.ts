import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Proveedor, Requisicion,	Servicio, Detalle_Venta , Detalle_Requisicion, Centro_Medico } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from '../../models/Respuestas';
import { forkJoin } from 'rxjs';
import { RequisicionInfo, Detalle_Requisicion_Info } from '../../services/rest.service';

interface OldSearch {
	[key: string]: Servicio[];
}

interface ServicioById {
	[key:number]:Servicio;
};

@Component({
	selector: 'app-agregar-requisicion',
	templateUrl: './agregar-requisicion.component.html',
	styleUrls: ['./agregar-requisicion.component.css']
})
export class AgregarRequisicionComponent extends BaseComponent implements OnInit {
	distribuidor:boolean = false;
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	@Input() show:boolean = false;
	servicios: Servicio[]			= [];
	search_servicios: Servicio[]	= [];
	busqueda: string				= '';
	todos_servicios: []				= [];
	proveedores: Proveedor[]		= [];
	sucursales:Centro_Medico[]=[];
	list_detalles: Detalle_Requisicion={
		id_servicio:null,
		cantidad: null
	}
	requisicion: Requisicion		= {};
	detalles_requisicion:Detalle_Requisicion_Info[] = [];
	servicios_by_id:ServicioById	= {};
	total=0;
	
	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			let usuario	=	this.rest.getUsuarioSesion();
			let centro_medico = this.rest.getCurrentCentroMedico();

			this.requisicion = {
				id_usuario_solicito : usuario.id
				,id_centro_medico	: centro_medico.id
				,id_centro_medico_distribuidor:null
				,id_proveedor		: null
				,flete : 0 
				,importacion: 0
				,subtotal: 0 
				,total: 0
			}

			forkJoin([
				this.rest.proveedor.search({ eq: { id_organizacion: usuario.id_organizacion } }),
				this.rest.centro_medico.search({eq: { id_organizacion: usuario.id_organizacion }}),
				this.rest.servicio.search({eq: { id_organizacion: usuario.id_organizacion }})
			]).subscribe((respuestas) => {
				this.proveedores = respuestas[0].datos;
				this.sucursales = respuestas[1].datos;
				this.servicios = respuestas[2].datos;
			}, (error) => this.showError(error));
		});
	}
	
	clean(){
		let usuario = this.rest.getUsuarioSesion();
		let centro_medico = this.rest.getCurrentCentroMedico();
		this.requisicion = {
			id_usuario_solicito : usuario.id
			,id_centro_medico	: centro_medico.id
			,id_centro_medico_distribuidor:null
			,id_proveedor		: null
			,flete : 0 
			,importacion: 0
			,subtotal: 0 
			,total: 0
		}
		this.detalles_requisicion.length=0;
	}

	buscarInventariosSucursal(evt: any){
		let x = this.rest.inventario.search({
			lk: { nombre: evt.target.value },
			eq:{id_centro_medico: this.requisicion.id_centro_medico_distribuidor?this.requisicion.id_centro_medico_distribuidor:0},
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
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

	add(servicio){
		if( !( servicio.id in this.servicios_by_id ) )
			this.servicios_by_id[ servicio.id ] = servicio;
		let total= 0;

		let s = this.detalles_requisicion.find(i => i.servicio.id == servicio.id );
		if (s) {
			this.busqueda = '';
			this.aumentar(s);
			this.calcularCantidades(total);
			return;
		}
		this.detalles_requisicion.push
		({
			servicio: servicio
			,detalle_requisicion:{id_servicio	: servicio.id, cantidad : 1 ,precio : servicio.precio_referencia }
		});
		
		this.calcularCantidades(total);
		this.busqueda			= '';
		this.search_servicios	= [];
	}

	addServicioSucursal(servicio){
		// if( !( servicio.id in this.servicios_by_id ) )
		// 	this.servicios_by_id[ servicio.id ] = servicio;
		let total= 0;

		let s = this.detalles_requisicion.find(i => i.servicio.id == servicio.id_servicio );
		if (s) {
			this.busqueda = '';
			this.aumentar(s);
			this.calcularCantidades(total);
			return;
		}
		//obteniendo el servicio de la requisicion.
		let servicioRequisicion = this.servicios.find(i=> i.id == servicio.id_servicio);
		console.log("el servicio de la requisicion", servicioRequisicion);
		this.detalles_requisicion.push
		({
			servicio: servicioRequisicion
			,detalle_requisicion:{id_servicio	: servicio.id_servicio, cantidad : 1 ,precio : servicio.precio_referencia }
		});
		
		this.calcularCantidades(total);
		this.busqueda			= '';
		this.search_servicios	= [];
	}

	incrementar(servicio){
		console.log("hola");
		console.log("servis",servicio);
		let s = this.detalles_requisicion.find(i => i.servicio.id == servicio.servicio.id );
		console.log("s",s);
		if (s) {
			this.busqueda = '';
			let total = 0;
			this.aumentar(s);
			this.calcularCantidades(total);
			return;
		}}
	// addServicio(servicio,this.list_detalles){
		
	// 	this.calcularCantidades(this.detalles_requisicion)
	// }
	calcularCantidades(total){

		this.detalles_requisicion.forEach(i => {
			// total += i.detalle_requisicion.cantidad;
	
			total += i.detalle_requisicion.cantidad * i.detalle_requisicion.precio;
			i.detalle_requisicion.subtotal= total

			console.log("cantidad",i.detalle_requisicion.cantidad);
			console.log("Precio",i.detalle_requisicion.precio);
			// let temp = i.detalle_requisicion.cantidad;
			// total = total + temp;
		});
		this.requisicion.subtotal = total;
		this.requisicion.total = total + this.requisicion.flete + this.requisicion.importacion;

	}

	// agregarServicio(servicio: Servicio)
	// {
	// 	if( !( servicio.id in this.servicios_by_id ) )
	// 		this.servicios_by_id[ servicio.id ] = servicio;

	// 	let s = this.detalles_requisicion.find(i => i.servicio.id == servicio.id );
	// 	if (s) {
	// 		this.busqueda = '';
	// 		this.aumentar(s);
	// 		return;
	// 	}

	// 	this.detalles_requisicion.push
	// 	({
	// 		servicio: servicio
	// 		,detalle_requisicion:{ id_servicio	: servicio.id, cantidad	: 1}
	// 	});

	// 	this.busqueda			= '';
	// 	this.search_servicios	= [];
	// }

	aumentar(detalle_requisicion)
	{
		detalle_requisicion.cantidad++;
		detalle_requisicion.precio++;
	}

	 guardar() {
		 this.is_loading = true;
		 if (this.requisicion.id) {
			 this.rest.requisicionInfo.update({
				 requisicion: this.requisicion
				 ,detalles: this.detalles_requisicion
			}).subscribe((requisicion) => {
				 this.is_loading = false;
				 this.router.navigate(['/requisiciones']);
			 }, error => this.showError(error));
		 }
		 else {
			 this.rest.requisicionInfo.create({
				 requisicion: this.requisicion,
				 detalles: this.detalles_requisicion
			 }).subscribe((requisicion) => {
				 this.is_loading = false;
				 this.router.navigate(['/requisiciones']);
			 }, error => this.showError(error));
		 }
	}



}
