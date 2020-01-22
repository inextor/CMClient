import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router"
import { Proveedor, Requisicion,	Servicio, Detalle_Venta , Detalle_Requisicion } from '../../models/Modelos';
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

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	servicios: Servicio[]			= [];
	search_servicios: Servicio[]	= [];
	busqueda: string				= '';
	todos_servicios: []				= [];
	proveedores: Proveedor[]		= [];
	requisicion: Requisicion		= {};
	detalles_requisicion:Detalle_Requisicion_Info[] = [];
	servicios_by_id:ServicioById	= {};

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			let usuario	=	this.rest.getUsuarioSesion();
			let centro_medico = this.rest.getCurrentCentroMedico();

			this.requisicion = {
				id_usuario_solicito : usuario.id
				,id_centro_medico	: centro_medico.id
				,id_proveedor		: null
			}

			forkJoin([
				this.rest.proveedor.search({ eq: { id_organizacion: usuario.id_organizacion } }),
			]).subscribe((respuestas) => {
				this.proveedores = respuestas[0].datos;
			}, (error) => this.showError(error));
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

	agregarServicio(servicio: Servicio)
	{
		if( !( servicio.id in this.servicios_by_id ) )
			this.servicios_by_id[ servicio.id ] = servicio;

		let s = this.detalles_requisicion.find(i => i.servicio.id == servicio.id );
		if (s) {
			this.busqueda = '';
			this.aumentar(s);
			return;
		}

		this.detalles_requisicion.push
		({
			servicio: servicio
			,detalle_requisicion:{ id_servicio	: servicio.id, cantidad	: 1}
		});

		this.busqueda			= '';
		this.search_servicios	= [];
	}

	aumentar(detalle_requisicion)
	{
		detalle_requisicion.cantidad++;
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
