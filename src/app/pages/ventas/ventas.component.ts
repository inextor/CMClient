import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchObject } from '../../models/Respuestas';
import { Venta,Usuario } from '../../models/Modelos';
import { Router,ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';

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


			this.venta_search.eq.id	= params["eq.id")?params["eq.id"):null;
			this.venta_search.le.id	= params["le.id")?params["le.id"):null;
			this.venta_search.lt.id	= params["lt.id")?params["lt.id"):null;
			this.venta_search.ge.id	= params["ge.id")?params["ge.id"):null;
			this.venta_search.gt.id	= params["gt.id")?params["gt.id"):null;
			this.venta_search.lk.id	= params["lk.id")?params["lk.id"):null;
			this.venta_search.eq.id_usuario_cliente	= params["eq.id_usuario_cliente")?params["eq.id_usuario_cliente"):null;
			this.venta_search.le.id_usuario_cliente	= params["le.id_usuario_cliente")?params["le.id_usuario_cliente"):null;
			this.venta_search.lt.id_usuario_cliente	= params["lt.id_usuario_cliente")?params["lt.id_usuario_cliente"):null;
			this.venta_search.ge.id_usuario_cliente	= params["ge.id_usuario_cliente")?params["ge.id_usuario_cliente"):null;
			this.venta_search.gt.id_usuario_cliente	= params["gt.id_usuario_cliente")?params["gt.id_usuario_cliente"):null;
			this.venta_search.lk.id_usuario_cliente	= params["lk.id_usuario_cliente")?params["lk.id_usuario_cliente"):null;
			this.venta_search.eq.facturado	= params["eq.facturado")?params["eq.facturado"):null;
			this.venta_search.le.facturado	= params["le.facturado")?params["le.facturado"):null;
			this.venta_search.lt.facturado	= params["lt.facturado")?params["lt.facturado"):null;
			this.venta_search.ge.facturado	= params["ge.facturado")?params["ge.facturado"):null;
			this.venta_search.gt.facturado	= params["gt.facturado")?params["gt.facturado"):null;
			this.venta_search.lk.facturado	= params["lk.facturado")?params["lk.facturado"):null;
			this.venta_search.eq.cliente	= params["eq.cliente")?params["eq.cliente"):null;
			this.venta_search.le.cliente	= params["le.cliente")?params["le.cliente"):null;
			this.venta_search.lt.cliente	= params["lt.cliente")?params["lt.cliente"):null;
			this.venta_search.ge.cliente	= params["ge.cliente")?params["ge.cliente"):null;
			this.venta_search.gt.cliente	= params["gt.cliente")?params["gt.cliente"):null;
			this.venta_search.lk.cliente	= params["lk.cliente")?params["lk.cliente"):null;
			this.venta_search.eq.subtotal	= params["eq.subtotal")?params["eq.subtotal"):null;
			this.venta_search.le.subtotal	= params["le.subtotal")?params["le.subtotal"):null;
			this.venta_search.lt.subtotal	= params["lt.subtotal")?params["lt.subtotal"):null;
			this.venta_search.ge.subtotal	= params["ge.subtotal")?params["ge.subtotal"):null;
			this.venta_search.gt.subtotal	= params["gt.subtotal")?params["gt.subtotal"):null;
			this.venta_search.lk.subtotal	= params["lk.subtotal")?params["lk.subtotal"):null;
			this.venta_search.eq.iva	= params["eq.iva")?params["eq.iva"):null;
			this.venta_search.le.iva	= params["le.iva")?params["le.iva"):null;
			this.venta_search.lt.iva	= params["lt.iva")?params["lt.iva"):null;
			this.venta_search.ge.iva	= params["ge.iva")?params["ge.iva"):null;
			this.venta_search.gt.iva	= params["gt.iva")?params["gt.iva"):null;
			this.venta_search.lk.iva	= params["lk.iva")?params["lk.iva"):null;
			this.venta_search.eq.total	= params["eq.total")?params["eq.total"):null;
			this.venta_search.le.total	= params["le.total")?params["le.total"):null;
			this.venta_search.lt.total	= params["lt.total")?params["lt.total"):null;
			this.venta_search.ge.total	= params["ge.total")?params["ge.total"):null;
			this.venta_search.gt.total	= params["gt.total")?params["gt.total"):null;
			this.venta_search.lk.total	= params["lk.total")?params["lk.total"):null;
			this.venta_search.eq.cambio	= params["eq.cambio")?params["eq.cambio"):null;
			this.venta_search.le.cambio	= params["le.cambio")?params["le.cambio"):null;
			this.venta_search.lt.cambio	= params["lt.cambio")?params["lt.cambio"):null;
			this.venta_search.ge.cambio	= params["ge.cambio")?params["ge.cambio"):null;
			this.venta_search.gt.cambio	= params["gt.cambio")?params["gt.cambio"):null;
			this.venta_search.lk.cambio	= params["lk.cambio")?params["lk.cambio"):null;
			this.venta_search.eq.efectivo_desc	= params["eq.efectivo_desc")?params["eq.efectivo_desc"):null;
			this.venta_search.le.efectivo_desc	= params["le.efectivo_desc")?params["le.efectivo_desc"):null;
			this.venta_search.lt.efectivo_desc	= params["lt.efectivo_desc")?params["lt.efectivo_desc"):null;
			this.venta_search.ge.efectivo_desc	= params["ge.efectivo_desc")?params["ge.efectivo_desc"):null;
			this.venta_search.gt.efectivo_desc	= params["gt.efectivo_desc")?params["gt.efectivo_desc"):null;
			this.venta_search.lk.efectivo_desc	= params["lk.efectivo_desc")?params["lk.efectivo_desc"):null;
			this.venta_search.eq.dolares_desc	= params["eq.dolares_desc")?params["eq.dolares_desc"):null;
			this.venta_search.le.dolares_desc	= params["le.dolares_desc")?params["le.dolares_desc"):null;
			this.venta_search.lt.dolares_desc	= params["lt.dolares_desc")?params["lt.dolares_desc"):null;
			this.venta_search.ge.dolares_desc	= params["ge.dolares_desc")?params["ge.dolares_desc"):null;
			this.venta_search.gt.dolares_desc	= params["gt.dolares_desc")?params["gt.dolares_desc"):null;
			this.venta_search.lk.dolares_desc	= params["lk.dolares_desc")?params["lk.dolares_desc"):null;
			this.venta_search.eq.tipo_cambio	= params["eq.tipo_cambio")?params["eq.tipo_cambio"):null;
			this.venta_search.le.tipo_cambio	= params["le.tipo_cambio")?params["le.tipo_cambio"):null;
			this.venta_search.lt.tipo_cambio	= params["lt.tipo_cambio")?params["lt.tipo_cambio"):null;
			this.venta_search.ge.tipo_cambio	= params["ge.tipo_cambio")?params["ge.tipo_cambio"):null;
			this.venta_search.gt.tipo_cambio	= params["gt.tipo_cambio")?params["gt.tipo_cambio"):null;
			this.venta_search.lk.tipo_cambio	= params["lk.tipo_cambio")?params["lk.tipo_cambio"):null;
			this.venta_search.eq.id_usuario_recepcionista	= params["eq.id_usuario_recepcionista")?params["eq.id_usuario_recepcionista"):null;
			this.venta_search.le.id_usuario_recepcionista	= params["le.id_usuario_recepcionista")?params["le.id_usuario_recepcionista"):null;
			this.venta_search.lt.id_usuario_recepcionista	= params["lt.id_usuario_recepcionista")?params["lt.id_usuario_recepcionista"):null;
			this.venta_search.ge.id_usuario_recepcionista	= params["ge.id_usuario_recepcionista")?params["ge.id_usuario_recepcionista"):null;
			this.venta_search.gt.id_usuario_recepcionista	= params["gt.id_usuario_recepcionista")?params["gt.id_usuario_recepcionista"):null;
			this.venta_search.lk.id_usuario_recepcionista	= params["lk.id_usuario_recepcionista")?params["lk.id_usuario_recepcionista"):null;
			this.venta_search.eq.cupon_desc	= params["eq.cupon_desc")?params["eq.cupon_desc"):null;
			this.venta_search.le.cupon_desc	= params["le.cupon_desc")?params["le.cupon_desc"):null;
			this.venta_search.lt.cupon_desc	= params["lt.cupon_desc")?params["lt.cupon_desc"):null;
			this.venta_search.ge.cupon_desc	= params["ge.cupon_desc")?params["ge.cupon_desc"):null;
			this.venta_search.gt.cupon_desc	= params["gt.cupon_desc")?params["gt.cupon_desc"):null;
			this.venta_search.lk.cupon_desc	= params["lk.cupon_desc")?params["lk.cupon_desc"):null;
			this.venta_search.eq.id_centro_medico	= params["eq.id_centro_medico")?params["eq.id_centro_medico"):null;
			this.venta_search.le.id_centro_medico	= params["le.id_centro_medico")?params["le.id_centro_medico"):null;
			this.venta_search.lt.id_centro_medico	= params["lt.id_centro_medico")?params["lt.id_centro_medico"):null;
			this.venta_search.ge.id_centro_medico	= params["ge.id_centro_medico")?params["ge.id_centro_medico"):null;
			this.venta_search.gt.id_centro_medico	= params["gt.id_centro_medico")?params["gt.id_centro_medico"):null;
			this.venta_search.lk.id_centro_medico	= params["lk.id_centro_medico")?params["lk.id_centro_medico"):null;
			this.venta_search.eq.fecha	= params["eq.fecha")?params["eq.fecha"):null;
			this.venta_search.le.fecha	= params["le.fecha")?params["le.fecha"):null;
			this.venta_search.lt.fecha	= params["lt.fecha")?params["lt.fecha"):null;
			this.venta_search.ge.fecha	= params["ge.fecha")?params["ge.fecha"):null;
			this.venta_search.gt.fecha	= params["gt.fecha")?params["gt.fecha"):null;
			this.venta_search.lk.fecha	= params["lk.fecha")?params["lk.fecha"):null;
			this.venta_search.eq.redondeo	= params["eq.redondeo")?params["eq.redondeo"):null;
			this.venta_search.le.redondeo	= params["le.redondeo")?params["le.redondeo"):null;
			this.venta_search.lt.redondeo	= params["lt.redondeo")?params["lt.redondeo"):null;
			this.venta_search.ge.redondeo	= params["ge.redondeo")?params["ge.redondeo"):null;
			this.venta_search.gt.redondeo	= params["gt.redondeo")?params["gt.redondeo"):null;
			this.venta_search.lk.redondeo	= params["lk.redondeo")?params["lk.redondeo"):null;
			this.venta_search.eq.nombre	= params["eq.nombre")?params["eq.nombre"):null;
			this.venta_search.le.nombre	= params["le.nombre")?params["le.nombre"):null;
			this.venta_search.lt.nombre	= params["lt.nombre")?params["lt.nombre"):null;
			this.venta_search.ge.nombre	= params["ge.nombre")?params["ge.nombre"):null;
			this.venta_search.gt.nombre	= params["gt.nombre")?params["gt.nombre"):null;
			this.venta_search.lk.nombre	= params["lk.nombre")?params["lk.nombre"):null;
			this.venta_search.eq.estatus	= params["eq.estatus")?params["eq.estatus"):null;
			this.venta_search.le.estatus	= params["le.estatus")?params["le.estatus"):null;
			this.venta_search.lt.estatus	= params["lt.estatus")?params["lt.estatus"):null;
			this.venta_search.ge.estatus	= params["ge.estatus")?params["ge.estatus"):null;
			this.venta_search.gt.estatus	= params["gt.estatus")?params["gt.estatus"):null;
			this.venta_search.lk.estatus	= params["lk.estatus")?params["lk.estatus"):null;
			this.venta_search.eq.activa	= params["eq.activa")?params["eq.activa"):null;
			this.venta_search.le.activa	= params["le.activa")?params["le.activa"):null;
			this.venta_search.lt.activa	= params["lt.activa")?params["lt.activa"):null;
			this.venta_search.ge.activa	= params["ge.activa")?params["ge.activa"):null;
			this.venta_search.gt.activa	= params["gt.activa")?params["gt.activa"):null;
			this.venta_search.lk.activa	= params["lk.activa")?params["lk.activa"):null;
			this.venta_search.eq.pendiente	= params["eq.pendiente")?params["eq.pendiente"):null;
			this.venta_search.le.pendiente	= params["le.pendiente")?params["le.pendiente"):null;
			this.venta_search.lt.pendiente	= params["lt.pendiente")?params["lt.pendiente"):null;
			this.venta_search.ge.pendiente	= params["ge.pendiente")?params["ge.pendiente"):null;
			this.venta_search.gt.pendiente	= params["gt.pendiente")?params["gt.pendiente"):null;
			this.venta_search.lk.pendiente	= params["lk.pendiente")?params["lk.pendiente"):null;
			this.venta_search.eq.comprobante	= params["eq.comprobante")?params["eq.comprobante"):null;
			this.venta_search.le.comprobante	= params["le.comprobante")?params["le.comprobante"):null;
			this.venta_search.lt.comprobante	= params["lt.comprobante")?params["lt.comprobante"):null;
			this.venta_search.ge.comprobante	= params["ge.comprobante")?params["ge.comprobante"):null;
			this.venta_search.gt.comprobante	= params["gt.comprobante")?params["gt.comprobante"):null;
			this.venta_search.lk.comprobante	= params["lk.comprobante")?params["lk.comprobante"):null;
			this.venta_search.eq.promocion_desc	= params["eq.promocion_desc")?params["eq.promocion_desc"):null;
			this.venta_search.le.promocion_desc	= params["le.promocion_desc")?params["le.promocion_desc"):null;
			this.venta_search.lt.promocion_desc	= params["lt.promocion_desc")?params["lt.promocion_desc"):null;
			this.venta_search.ge.promocion_desc	= params["ge.promocion_desc")?params["ge.promocion_desc"):null;
			this.venta_search.gt.promocion_desc	= params["gt.promocion_desc")?params["gt.promocion_desc"):null;
			this.venta_search.lk.promocion_desc	= params["lk.promocion_desc")?params["lk.promocion_desc"):null;
			this.venta_search.eq.id_tipo_precio	= params["eq.id_tipo_precio")?params["eq.id_tipo_precio"):null;
			this.venta_search.le.id_tipo_precio	= params["le.id_tipo_precio")?params["le.id_tipo_precio"):null;
			this.venta_search.lt.id_tipo_precio	= params["lt.id_tipo_precio")?params["lt.id_tipo_precio"):null;
			this.venta_search.ge.id_tipo_precio	= params["ge.id_tipo_precio")?params["ge.id_tipo_precio"):null;
			this.venta_search.gt.id_tipo_precio	= params["gt.id_tipo_precio")?params["gt.id_tipo_precio"):null;
			this.venta_search.lk.id_tipo_precio	= params["lk.id_tipo_precio")?params["lk.id_tipo_precio"):null;
			this.venta_search.eq.folio	= params["eq.folio")?params["eq.folio"):null;
			this.venta_search.le.folio	= params["le.folio")?params["le.folio"):null;
			this.venta_search.lt.folio	= params["lt.folio")?params["lt.folio"):null;
			this.venta_search.ge.folio	= params["ge.folio")?params["ge.folio"):null;
			this.venta_search.gt.folio	= params["gt.folio")?params["gt.folio"):null;
			this.venta_search.lk.folio	= params["lk.folio")?params["lk.folio"):null;
			this.venta_search.eq.UUID	= params["eq.UUID")?params["eq.UUID"):null;
			this.venta_search.le.UUID	= params["le.UUID")?params["le.UUID"):null;
			this.venta_search.lt.UUID	= params["lt.UUID")?params["lt.UUID"):null;
			this.venta_search.ge.UUID	= params["ge.UUID")?params["ge.UUID"):null;
			this.venta_search.gt.UUID	= params["gt.UUID")?params["gt.UUID"):null;
			this.venta_search.lk.UUID	= params["lk.UUID")?params["lk.UUID"):null;
			this.venta_search.eq.porcentaje_desc	= params["eq.porcentaje_desc")?params["eq.porcentaje_desc"):null;
			this.venta_search.le.porcentaje_desc	= params["le.porcentaje_desc")?params["le.porcentaje_desc"):null;
			this.venta_search.lt.porcentaje_desc	= params["lt.porcentaje_desc")?params["lt.porcentaje_desc"):null;
			this.venta_search.ge.porcentaje_desc	= params["ge.porcentaje_desc")?params["ge.porcentaje_desc"):null;
			this.venta_search.gt.porcentaje_desc	= params["gt.porcentaje_desc")?params["gt.porcentaje_desc"):null;
			this.venta_search.lk.porcentaje_desc	= params["lk.porcentaje_desc")?params["lk.porcentaje_desc"):null;
			this.venta_search.eq.fecha_facturacion	= params["eq.fecha_facturacion")?params["eq.fecha_facturacion"):null;
			this.venta_search.le.fecha_facturacion	= params["le.fecha_facturacion")?params["le.fecha_facturacion"):null;
			this.venta_search.lt.fecha_facturacion	= params["lt.fecha_facturacion")?params["lt.fecha_facturacion"):null;
			this.venta_search.ge.fecha_facturacion	= params["ge.fecha_facturacion")?params["ge.fecha_facturacion"):null;
			this.venta_search.gt.fecha_facturacion	= params["gt.fecha_facturacion")?params["gt.fecha_facturacion"):null;
			this.venta_search.lk.fecha_facturacion	= params["lk.fecha_facturacion")?params["lk.fecha_facturacion"):null;
			this.venta_search.eq.tiempo_creacion	= params["eq.tiempo_creacion")?params["eq.tiempo_creacion"):null;
			this.venta_search.le.tiempo_creacion	= params["le.tiempo_creacion")?params["le.tiempo_creacion"):null;
			this.venta_search.lt.tiempo_creacion	= params["lt.tiempo_creacion")?params["lt.tiempo_creacion"):null;
			this.venta_search.ge.tiempo_creacion	= params["ge.tiempo_creacion")?params["ge.tiempo_creacion"):null;
			this.venta_search.gt.tiempo_creacion	= params["gt.tiempo_creacion")?params["gt.tiempo_creacion"):null;
			this.venta_search.lk.tiempo_creacion	= params["lk.tiempo_creacion")?params["lk.tiempo_creacion"):null;
			this.venta_search.eq.tiempo_actualizacion	= params["eq.tiempo_actualizacion")?params["eq.tiempo_actualizacion"):null;
			this.venta_search.le.tiempo_actualizacion	= params["le.tiempo_actualizacion")?params["le.tiempo_actualizacion"):null;
			this.venta_search.lt.tiempo_actualizacion	= params["lt.tiempo_actualizacion")?params["lt.tiempo_actualizacion"):null;
			this.venta_search.ge.tiempo_actualizacion	= params["ge.tiempo_actualizacion")?params["ge.tiempo_actualizacion"):null;
			this.venta_search.gt.tiempo_actualizacion	= params["gt.tiempo_actualizacion")?params["gt.tiempo_actualizacion"):null;
			this.venta_search.lk.tiempo_actualizacion	= params["lk.tiempo_actualizacion")?params["lk.tiempo_actualizacion"):null;

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
