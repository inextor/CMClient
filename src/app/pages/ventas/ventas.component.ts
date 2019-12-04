import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchObject } from '../../services/ObjRest';
import { Venta } from '../../models/RestModels';
import { Router,ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import {Usuario} from '../../models/RestModels'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent extends BaseComponent implements OnInit {


	ventas:Venta[] = [];
	usuario_list:Usuario[] = [];

	venta_search:SearchObject<Venta> = {

	};

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	ngOnInit()
	{
		this.route.queryParams.subscribe( params =>
		{

			this.venta_search = {
				eq: {},
				ge: {},
				le: {}
			};

			this.titleService.setTitle('venta');


			this.venta_search.eq.id	= "eq.id" in params ?params["eq.id"]:null;
			this.venta_search.le.id	= "le.id" in params ?params["le.id"]:null;
			this.venta_search.lt.id	= "lt.id" in params ?params["lt.id"]:null;
			this.venta_search.ge.id	= "ge.id" in params ?params["ge.id"]:null;
			this.venta_search.gt.id	= "gt.id" in params ?params["gt.id"]:null;
			this.venta_search.lk.id	= "lk.id" in params ?params["lk.id"]:null;
			this.venta_search.eq.id_usuario_cliente	= "eq.id_usuario_cliente" in params ?params["eq.id_usuario_cliente"]:null;
			this.venta_search.le.id_usuario_cliente	= "le.id_usuario_cliente" in params ?params["le.id_usuario_cliente"]:null;
			this.venta_search.lt.id_usuario_cliente	= "lt.id_usuario_cliente" in params ?params["lt.id_usuario_cliente"]:null;
			this.venta_search.ge.id_usuario_cliente	= "ge.id_usuario_cliente" in params ?params["ge.id_usuario_cliente"]:null;
			this.venta_search.gt.id_usuario_cliente	= "gt.id_usuario_cliente" in params ?params["gt.id_usuario_cliente"]:null;
			this.venta_search.lk.id_usuario_cliente	= "lk.id_usuario_cliente" in params ?params["lk.id_usuario_cliente"]:null;
			this.venta_search.eq.facturado	= "eq.facturado" in params ?params["eq.facturado"]:null;
			this.venta_search.le.facturado	= "le.facturado" in params ?params["le.facturado"]:null;
			this.venta_search.lt.facturado	= "lt.facturado" in params ?params["lt.facturado"]:null;
			this.venta_search.ge.facturado	= "ge.facturado" in params ?params["ge.facturado"]:null;
			this.venta_search.gt.facturado	= "gt.facturado" in params ?params["gt.facturado"]:null;
			this.venta_search.lk.facturado	= "lk.facturado" in params ?params["lk.facturado"]:null;
			this.venta_search.eq.cliente	= "eq.cliente" in params ?params["eq.cliente"]:null;
			this.venta_search.le.cliente	= "le.cliente" in params ?params["le.cliente"]:null;
			this.venta_search.lt.cliente	= "lt.cliente" in params ?params["lt.cliente"]:null;
			this.venta_search.ge.cliente	= "ge.cliente" in params ?params["ge.cliente"]:null;
			this.venta_search.gt.cliente	= "gt.cliente" in params ?params["gt.cliente"]:null;
			this.venta_search.lk.cliente	= "lk.cliente" in params ?params["lk.cliente"]:null;
			this.venta_search.eq.subtotal	= "eq.subtotal" in params ?params["eq.subtotal"]:null;
			this.venta_search.le.subtotal	= "le.subtotal" in params ?params["le.subtotal"]:null;
			this.venta_search.lt.subtotal	= "lt.subtotal" in params ?params["lt.subtotal"]:null;
			this.venta_search.ge.subtotal	= "ge.subtotal" in params ?params["ge.subtotal"]:null;
			this.venta_search.gt.subtotal	= "gt.subtotal" in params ?params["gt.subtotal"]:null;
			this.venta_search.lk.subtotal	= "lk.subtotal" in params ?params["lk.subtotal"]:null;
			this.venta_search.eq.iva	= "eq.iva" in params ?params["eq.iva"]:null;
			this.venta_search.le.iva	= "le.iva" in params ?params["le.iva"]:null;
			this.venta_search.lt.iva	= "lt.iva" in params ?params["lt.iva"]:null;
			this.venta_search.ge.iva	= "ge.iva" in params ?params["ge.iva"]:null;
			this.venta_search.gt.iva	= "gt.iva" in params ?params["gt.iva"]:null;
			this.venta_search.lk.iva	= "lk.iva" in params ?params["lk.iva"]:null;
			this.venta_search.eq.total	= "eq.total" in params ?params["eq.total"]:null;
			this.venta_search.le.total	= "le.total" in params ?params["le.total"]:null;
			this.venta_search.lt.total	= "lt.total" in params ?params["lt.total"]:null;
			this.venta_search.ge.total	= "ge.total" in params ?params["ge.total"]:null;
			this.venta_search.gt.total	= "gt.total" in params ?params["gt.total"]:null;
			this.venta_search.lk.total	= "lk.total" in params ?params["lk.total"]:null;
			this.venta_search.eq.cambio	= "eq.cambio" in params ?params["eq.cambio"]:null;
			this.venta_search.le.cambio	= "le.cambio" in params ?params["le.cambio"]:null;
			this.venta_search.lt.cambio	= "lt.cambio" in params ?params["lt.cambio"]:null;
			this.venta_search.ge.cambio	= "ge.cambio" in params ?params["ge.cambio"]:null;
			this.venta_search.gt.cambio	= "gt.cambio" in params ?params["gt.cambio"]:null;
			this.venta_search.lk.cambio	= "lk.cambio" in params ?params["lk.cambio"]:null;
			this.venta_search.eq.efectivo_desc	= "eq.efectivo_desc" in params ?params["eq.efectivo_desc"]:null;
			this.venta_search.le.efectivo_desc	= "le.efectivo_desc" in params ?params["le.efectivo_desc"]:null;
			this.venta_search.lt.efectivo_desc	= "lt.efectivo_desc" in params ?params["lt.efectivo_desc"]:null;
			this.venta_search.ge.efectivo_desc	= "ge.efectivo_desc" in params ?params["ge.efectivo_desc"]:null;
			this.venta_search.gt.efectivo_desc	= "gt.efectivo_desc" in params ?params["gt.efectivo_desc"]:null;
			this.venta_search.lk.efectivo_desc	= "lk.efectivo_desc" in params ?params["lk.efectivo_desc"]:null;
			this.venta_search.eq.dolares_desc	= "eq.dolares_desc" in params ?params["eq.dolares_desc"]:null;
			this.venta_search.le.dolares_desc	= "le.dolares_desc" in params ?params["le.dolares_desc"]:null;
			this.venta_search.lt.dolares_desc	= "lt.dolares_desc" in params ?params["lt.dolares_desc"]:null;
			this.venta_search.ge.dolares_desc	= "ge.dolares_desc" in params ?params["ge.dolares_desc"]:null;
			this.venta_search.gt.dolares_desc	= "gt.dolares_desc" in params ?params["gt.dolares_desc"]:null;
			this.venta_search.lk.dolares_desc	= "lk.dolares_desc" in params ?params["lk.dolares_desc"]:null;
			this.venta_search.eq.tipo_cambio	= "eq.tipo_cambio" in params ?params["eq.tipo_cambio"]:null;
			this.venta_search.le.tipo_cambio	= "le.tipo_cambio" in params ?params["le.tipo_cambio"]:null;
			this.venta_search.lt.tipo_cambio	= "lt.tipo_cambio" in params ?params["lt.tipo_cambio"]:null;
			this.venta_search.ge.tipo_cambio	= "ge.tipo_cambio" in params ?params["ge.tipo_cambio"]:null;
			this.venta_search.gt.tipo_cambio	= "gt.tipo_cambio" in params ?params["gt.tipo_cambio"]:null;
			this.venta_search.lk.tipo_cambio	= "lk.tipo_cambio" in params ?params["lk.tipo_cambio"]:null;
			this.venta_search.eq.id_usuario_recepcionista	= "eq.id_usuario_recepcionista" in params ?params["eq.id_usuario_recepcionista"]:null;
			this.venta_search.le.id_usuario_recepcionista	= "le.id_usuario_recepcionista" in params ?params["le.id_usuario_recepcionista"]:null;
			this.venta_search.lt.id_usuario_recepcionista	= "lt.id_usuario_recepcionista" in params ?params["lt.id_usuario_recepcionista"]:null;
			this.venta_search.ge.id_usuario_recepcionista	= "ge.id_usuario_recepcionista" in params ?params["ge.id_usuario_recepcionista"]:null;
			this.venta_search.gt.id_usuario_recepcionista	= "gt.id_usuario_recepcionista" in params ?params["gt.id_usuario_recepcionista"]:null;
			this.venta_search.lk.id_usuario_recepcionista	= "lk.id_usuario_recepcionista" in params ?params["lk.id_usuario_recepcionista"]:null;
			this.venta_search.eq.cupon_desc	= "eq.cupon_desc" in params ?params["eq.cupon_desc"]:null;
			this.venta_search.le.cupon_desc	= "le.cupon_desc" in params ?params["le.cupon_desc"]:null;
			this.venta_search.lt.cupon_desc	= "lt.cupon_desc" in params ?params["lt.cupon_desc"]:null;
			this.venta_search.ge.cupon_desc	= "ge.cupon_desc" in params ?params["ge.cupon_desc"]:null;
			this.venta_search.gt.cupon_desc	= "gt.cupon_desc" in params ?params["gt.cupon_desc"]:null;
			this.venta_search.lk.cupon_desc	= "lk.cupon_desc" in params ?params["lk.cupon_desc"]:null;
			this.venta_search.eq.id_centro_medico	= "eq.id_centro_medico" in params ?params["eq.id_centro_medico"]:null;
			this.venta_search.le.id_centro_medico	= "le.id_centro_medico" in params ?params["le.id_centro_medico"]:null;
			this.venta_search.lt.id_centro_medico	= "lt.id_centro_medico" in params ?params["lt.id_centro_medico"]:null;
			this.venta_search.ge.id_centro_medico	= "ge.id_centro_medico" in params ?params["ge.id_centro_medico"]:null;
			this.venta_search.gt.id_centro_medico	= "gt.id_centro_medico" in params ?params["gt.id_centro_medico"]:null;
			this.venta_search.lk.id_centro_medico	= "lk.id_centro_medico" in params ?params["lk.id_centro_medico"]:null;
			this.venta_search.eq.fecha	= "eq.fecha" in params ?params["eq.fecha"]:null;
			this.venta_search.le.fecha	= "le.fecha" in params ?params["le.fecha"]:null;
			this.venta_search.lt.fecha	= "lt.fecha" in params ?params["lt.fecha"]:null;
			this.venta_search.ge.fecha	= "ge.fecha" in params ?params["ge.fecha"]:null;
			this.venta_search.gt.fecha	= "gt.fecha" in params ?params["gt.fecha"]:null;
			this.venta_search.lk.fecha	= "lk.fecha" in params ?params["lk.fecha"]:null;
			this.venta_search.eq.redondeo	= "eq.redondeo" in params ?params["eq.redondeo"]:null;
			this.venta_search.le.redondeo	= "le.redondeo" in params ?params["le.redondeo"]:null;
			this.venta_search.lt.redondeo	= "lt.redondeo" in params ?params["lt.redondeo"]:null;
			this.venta_search.ge.redondeo	= "ge.redondeo" in params ?params["ge.redondeo"]:null;
			this.venta_search.gt.redondeo	= "gt.redondeo" in params ?params["gt.redondeo"]:null;
			this.venta_search.lk.redondeo	= "lk.redondeo" in params ?params["lk.redondeo"]:null;
			this.venta_search.eq.nombre	= "eq.nombre" in params ?params["eq.nombre"]:null;
			this.venta_search.le.nombre	= "le.nombre" in params ?params["le.nombre"]:null;
			this.venta_search.lt.nombre	= "lt.nombre" in params ?params["lt.nombre"]:null;
			this.venta_search.ge.nombre	= "ge.nombre" in params ?params["ge.nombre"]:null;
			this.venta_search.gt.nombre	= "gt.nombre" in params ?params["gt.nombre"]:null;
			this.venta_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.venta_search.eq.estatus	= "eq.estatus" in params ?params["eq.estatus"]:null;
			this.venta_search.le.estatus	= "le.estatus" in params ?params["le.estatus"]:null;
			this.venta_search.lt.estatus	= "lt.estatus" in params ?params["lt.estatus"]:null;
			this.venta_search.ge.estatus	= "ge.estatus" in params ?params["ge.estatus"]:null;
			this.venta_search.gt.estatus	= "gt.estatus" in params ?params["gt.estatus"]:null;
			this.venta_search.lk.estatus	= "lk.estatus" in params ?params["lk.estatus"]:null;
			this.venta_search.eq.activa	= "eq.activa" in params ?params["eq.activa"]:null;
			this.venta_search.le.activa	= "le.activa" in params ?params["le.activa"]:null;
			this.venta_search.lt.activa	= "lt.activa" in params ?params["lt.activa"]:null;
			this.venta_search.ge.activa	= "ge.activa" in params ?params["ge.activa"]:null;
			this.venta_search.gt.activa	= "gt.activa" in params ?params["gt.activa"]:null;
			this.venta_search.lk.activa	= "lk.activa" in params ?params["lk.activa"]:null;
			this.venta_search.eq.pendiente	= "eq.pendiente" in params ?params["eq.pendiente"]:null;
			this.venta_search.le.pendiente	= "le.pendiente" in params ?params["le.pendiente"]:null;
			this.venta_search.lt.pendiente	= "lt.pendiente" in params ?params["lt.pendiente"]:null;
			this.venta_search.ge.pendiente	= "ge.pendiente" in params ?params["ge.pendiente"]:null;
			this.venta_search.gt.pendiente	= "gt.pendiente" in params ?params["gt.pendiente"]:null;
			this.venta_search.lk.pendiente	= "lk.pendiente" in params ?params["lk.pendiente"]:null;
			this.venta_search.eq.comprobante	= "eq.comprobante" in params ?params["eq.comprobante"]:null;
			this.venta_search.le.comprobante	= "le.comprobante" in params ?params["le.comprobante"]:null;
			this.venta_search.lt.comprobante	= "lt.comprobante" in params ?params["lt.comprobante"]:null;
			this.venta_search.ge.comprobante	= "ge.comprobante" in params ?params["ge.comprobante"]:null;
			this.venta_search.gt.comprobante	= "gt.comprobante" in params ?params["gt.comprobante"]:null;
			this.venta_search.lk.comprobante	= "lk.comprobante" in params ?params["lk.comprobante"]:null;
			this.venta_search.eq.promocion_desc	= "eq.promocion_desc" in params ?params["eq.promocion_desc"]:null;
			this.venta_search.le.promocion_desc	= "le.promocion_desc" in params ?params["le.promocion_desc"]:null;
			this.venta_search.lt.promocion_desc	= "lt.promocion_desc" in params ?params["lt.promocion_desc"]:null;
			this.venta_search.ge.promocion_desc	= "ge.promocion_desc" in params ?params["ge.promocion_desc"]:null;
			this.venta_search.gt.promocion_desc	= "gt.promocion_desc" in params ?params["gt.promocion_desc"]:null;
			this.venta_search.lk.promocion_desc	= "lk.promocion_desc" in params ?params["lk.promocion_desc"]:null;
			this.venta_search.eq.id_tipo_precio	= "eq.id_tipo_precio" in params ?params["eq.id_tipo_precio"]:null;
			this.venta_search.le.id_tipo_precio	= "le.id_tipo_precio" in params ?params["le.id_tipo_precio"]:null;
			this.venta_search.lt.id_tipo_precio	= "lt.id_tipo_precio" in params ?params["lt.id_tipo_precio"]:null;
			this.venta_search.ge.id_tipo_precio	= "ge.id_tipo_precio" in params ?params["ge.id_tipo_precio"]:null;
			this.venta_search.gt.id_tipo_precio	= "gt.id_tipo_precio" in params ?params["gt.id_tipo_precio"]:null;
			this.venta_search.lk.id_tipo_precio	= "lk.id_tipo_precio" in params ?params["lk.id_tipo_precio"]:null;
			this.venta_search.eq.folio	= "eq.folio" in params ?params["eq.folio"]:null;
			this.venta_search.le.folio	= "le.folio" in params ?params["le.folio"]:null;
			this.venta_search.lt.folio	= "lt.folio" in params ?params["lt.folio"]:null;
			this.venta_search.ge.folio	= "ge.folio" in params ?params["ge.folio"]:null;
			this.venta_search.gt.folio	= "gt.folio" in params ?params["gt.folio"]:null;
			this.venta_search.lk.folio	= "lk.folio" in params ?params["lk.folio"]:null;
			this.venta_search.eq.UUID	= "eq.UUID" in params ?params["eq.UUID"]:null;
			this.venta_search.le.UUID	= "le.UUID" in params ?params["le.UUID"]:null;
			this.venta_search.lt.UUID	= "lt.UUID" in params ?params["lt.UUID"]:null;
			this.venta_search.ge.UUID	= "ge.UUID" in params ?params["ge.UUID"]:null;
			this.venta_search.gt.UUID	= "gt.UUID" in params ?params["gt.UUID"]:null;
			this.venta_search.lk.UUID	= "lk.UUID" in params ?params["lk.UUID"]:null;
			this.venta_search.eq.porcentaje_desc	= "eq.porcentaje_desc" in params ?params["eq.porcentaje_desc"]:null;
			this.venta_search.le.porcentaje_desc	= "le.porcentaje_desc" in params ?params["le.porcentaje_desc"]:null;
			this.venta_search.lt.porcentaje_desc	= "lt.porcentaje_desc" in params ?params["lt.porcentaje_desc"]:null;
			this.venta_search.ge.porcentaje_desc	= "ge.porcentaje_desc" in params ?params["ge.porcentaje_desc"]:null;
			this.venta_search.gt.porcentaje_desc	= "gt.porcentaje_desc" in params ?params["gt.porcentaje_desc"]:null;
			this.venta_search.lk.porcentaje_desc	= "lk.porcentaje_desc" in params ?params["lk.porcentaje_desc"]:null;
			this.venta_search.eq.fecha_facturacion	= "eq.fecha_facturacion" in params ?params["eq.fecha_facturacion"]:null;
			this.venta_search.le.fecha_facturacion	= "le.fecha_facturacion" in params ?params["le.fecha_facturacion"]:null;
			this.venta_search.lt.fecha_facturacion	= "lt.fecha_facturacion" in params ?params["lt.fecha_facturacion"]:null;
			this.venta_search.ge.fecha_facturacion	= "ge.fecha_facturacion" in params ?params["ge.fecha_facturacion"]:null;
			this.venta_search.gt.fecha_facturacion	= "gt.fecha_facturacion" in params ?params["gt.fecha_facturacion"]:null;
			this.venta_search.lk.fecha_facturacion	= "lk.fecha_facturacion" in params ?params["lk.fecha_facturacion"]:null;
			this.venta_search.eq.tiempo_creacion	= "eq.tiempo_creacion" in params ?params["eq.tiempo_creacion"]:null;
			this.venta_search.le.tiempo_creacion	= "le.tiempo_creacion" in params ?params["le.tiempo_creacion"]:null;
			this.venta_search.lt.tiempo_creacion	= "lt.tiempo_creacion" in params ?params["lt.tiempo_creacion"]:null;
			this.venta_search.ge.tiempo_creacion	= "ge.tiempo_creacion" in params ?params["ge.tiempo_creacion"]:null;
			this.venta_search.gt.tiempo_creacion	= "gt.tiempo_creacion" in params ?params["gt.tiempo_creacion"]:null;
			this.venta_search.lk.tiempo_creacion	= "lk.tiempo_creacion" in params ?params["lk.tiempo_creacion"]:null;
			this.venta_search.eq.tiempo_actualizacion	= "eq.tiempo_actualizacion" in params ?params["eq.tiempo_actualizacion"]:null;
			this.venta_search.le.tiempo_actualizacion	= "le.tiempo_actualizacion" in params ?params["le.tiempo_actualizacion"]:null;
			this.venta_search.lt.tiempo_actualizacion	= "lt.tiempo_actualizacion" in params ?params["lt.tiempo_actualizacion"]:null;
			this.venta_search.ge.tiempo_actualizacion	= "ge.tiempo_actualizacion" in params ?params["ge.tiempo_actualizacion"]:null;
			this.venta_search.gt.tiempo_actualizacion	= "gt.tiempo_actualizacion" in params ?params["gt.tiempo_actualizacion"]:null;
			this.venta_search.lk.tiempo_actualizacion	= "lk.tiempo_actualizacion" in params ?params["lk.tiempo_actualizacion"]:null;

			console.log('Search', this.venta_search);

			let rjoinObj:any = {};
			let fjarray = [];


			this.is_loading = true;
			this.venta_search.pagina= params['pagina') ? parseInt( params['pagina') ) : 0;

			this.rest.venta.search( this.venta_search )
			.subscribe((result)=>
			{
				this.ventas = result.datos;
				this.setPages( this.venta_search.pagina, result[0].total );
				//{{table_constraints_arrays_assigns}}
			},error=>
			{
				this.showError( error );
			});
		});
	}

	search()
	{
		this.is_loading = true;
		this.venta_search.pagina= 0;
		this.router.navigate(['/list-venta',{queryParams: this.venta_search }]);
	}
}
