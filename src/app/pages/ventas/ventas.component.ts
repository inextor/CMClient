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


			this.venta_search.eq.id	= params.get("eq.id")?params.get("eq.id"):null;
			this.venta_search.le.id	= params.get("le.id")?params.get("le.id"):null;
			this.venta_search.lt.id	= params.get("lt.id")?params.get("lt.id"):null;
			this.venta_search.ge.id	= params.get("ge.id")?params.get("ge.id"):null;
			this.venta_search.gt.id	= params.get("gt.id")?params.get("gt.id"):null;
			this.venta_search.lk.id	= params.get("lk.id")?params.get("lk.id"):null;
			this.venta_search.eq.id_usuario_cliente	= params.get("eq.id_usuario_cliente")?params.get("eq.id_usuario_cliente"):null;
			this.venta_search.le.id_usuario_cliente	= params.get("le.id_usuario_cliente")?params.get("le.id_usuario_cliente"):null;
			this.venta_search.lt.id_usuario_cliente	= params.get("lt.id_usuario_cliente")?params.get("lt.id_usuario_cliente"):null;
			this.venta_search.ge.id_usuario_cliente	= params.get("ge.id_usuario_cliente")?params.get("ge.id_usuario_cliente"):null;
			this.venta_search.gt.id_usuario_cliente	= params.get("gt.id_usuario_cliente")?params.get("gt.id_usuario_cliente"):null;
			this.venta_search.lk.id_usuario_cliente	= params.get("lk.id_usuario_cliente")?params.get("lk.id_usuario_cliente"):null;
			this.venta_search.eq.facturado	= params.get("eq.facturado")?params.get("eq.facturado"):null;
			this.venta_search.le.facturado	= params.get("le.facturado")?params.get("le.facturado"):null;
			this.venta_search.lt.facturado	= params.get("lt.facturado")?params.get("lt.facturado"):null;
			this.venta_search.ge.facturado	= params.get("ge.facturado")?params.get("ge.facturado"):null;
			this.venta_search.gt.facturado	= params.get("gt.facturado")?params.get("gt.facturado"):null;
			this.venta_search.lk.facturado	= params.get("lk.facturado")?params.get("lk.facturado"):null;
			this.venta_search.eq.cliente	= params.get("eq.cliente")?params.get("eq.cliente"):null;
			this.venta_search.le.cliente	= params.get("le.cliente")?params.get("le.cliente"):null;
			this.venta_search.lt.cliente	= params.get("lt.cliente")?params.get("lt.cliente"):null;
			this.venta_search.ge.cliente	= params.get("ge.cliente")?params.get("ge.cliente"):null;
			this.venta_search.gt.cliente	= params.get("gt.cliente")?params.get("gt.cliente"):null;
			this.venta_search.lk.cliente	= params.get("lk.cliente")?params.get("lk.cliente"):null;
			this.venta_search.eq.subtotal	= params.get("eq.subtotal")?params.get("eq.subtotal"):null;
			this.venta_search.le.subtotal	= params.get("le.subtotal")?params.get("le.subtotal"):null;
			this.venta_search.lt.subtotal	= params.get("lt.subtotal")?params.get("lt.subtotal"):null;
			this.venta_search.ge.subtotal	= params.get("ge.subtotal")?params.get("ge.subtotal"):null;
			this.venta_search.gt.subtotal	= params.get("gt.subtotal")?params.get("gt.subtotal"):null;
			this.venta_search.lk.subtotal	= params.get("lk.subtotal")?params.get("lk.subtotal"):null;
			this.venta_search.eq.iva	= params.get("eq.iva")?params.get("eq.iva"):null;
			this.venta_search.le.iva	= params.get("le.iva")?params.get("le.iva"):null;
			this.venta_search.lt.iva	= params.get("lt.iva")?params.get("lt.iva"):null;
			this.venta_search.ge.iva	= params.get("ge.iva")?params.get("ge.iva"):null;
			this.venta_search.gt.iva	= params.get("gt.iva")?params.get("gt.iva"):null;
			this.venta_search.lk.iva	= params.get("lk.iva")?params.get("lk.iva"):null;
			this.venta_search.eq.total	= params.get("eq.total")?params.get("eq.total"):null;
			this.venta_search.le.total	= params.get("le.total")?params.get("le.total"):null;
			this.venta_search.lt.total	= params.get("lt.total")?params.get("lt.total"):null;
			this.venta_search.ge.total	= params.get("ge.total")?params.get("ge.total"):null;
			this.venta_search.gt.total	= params.get("gt.total")?params.get("gt.total"):null;
			this.venta_search.lk.total	= params.get("lk.total")?params.get("lk.total"):null;
			this.venta_search.eq.cambio	= params.get("eq.cambio")?params.get("eq.cambio"):null;
			this.venta_search.le.cambio	= params.get("le.cambio")?params.get("le.cambio"):null;
			this.venta_search.lt.cambio	= params.get("lt.cambio")?params.get("lt.cambio"):null;
			this.venta_search.ge.cambio	= params.get("ge.cambio")?params.get("ge.cambio"):null;
			this.venta_search.gt.cambio	= params.get("gt.cambio")?params.get("gt.cambio"):null;
			this.venta_search.lk.cambio	= params.get("lk.cambio")?params.get("lk.cambio"):null;
			this.venta_search.eq.efectivo_desc	= params.get("eq.efectivo_desc")?params.get("eq.efectivo_desc"):null;
			this.venta_search.le.efectivo_desc	= params.get("le.efectivo_desc")?params.get("le.efectivo_desc"):null;
			this.venta_search.lt.efectivo_desc	= params.get("lt.efectivo_desc")?params.get("lt.efectivo_desc"):null;
			this.venta_search.ge.efectivo_desc	= params.get("ge.efectivo_desc")?params.get("ge.efectivo_desc"):null;
			this.venta_search.gt.efectivo_desc	= params.get("gt.efectivo_desc")?params.get("gt.efectivo_desc"):null;
			this.venta_search.lk.efectivo_desc	= params.get("lk.efectivo_desc")?params.get("lk.efectivo_desc"):null;
			this.venta_search.eq.dolares_desc	= params.get("eq.dolares_desc")?params.get("eq.dolares_desc"):null;
			this.venta_search.le.dolares_desc	= params.get("le.dolares_desc")?params.get("le.dolares_desc"):null;
			this.venta_search.lt.dolares_desc	= params.get("lt.dolares_desc")?params.get("lt.dolares_desc"):null;
			this.venta_search.ge.dolares_desc	= params.get("ge.dolares_desc")?params.get("ge.dolares_desc"):null;
			this.venta_search.gt.dolares_desc	= params.get("gt.dolares_desc")?params.get("gt.dolares_desc"):null;
			this.venta_search.lk.dolares_desc	= params.get("lk.dolares_desc")?params.get("lk.dolares_desc"):null;
			this.venta_search.eq.tipo_cambio	= params.get("eq.tipo_cambio")?params.get("eq.tipo_cambio"):null;
			this.venta_search.le.tipo_cambio	= params.get("le.tipo_cambio")?params.get("le.tipo_cambio"):null;
			this.venta_search.lt.tipo_cambio	= params.get("lt.tipo_cambio")?params.get("lt.tipo_cambio"):null;
			this.venta_search.ge.tipo_cambio	= params.get("ge.tipo_cambio")?params.get("ge.tipo_cambio"):null;
			this.venta_search.gt.tipo_cambio	= params.get("gt.tipo_cambio")?params.get("gt.tipo_cambio"):null;
			this.venta_search.lk.tipo_cambio	= params.get("lk.tipo_cambio")?params.get("lk.tipo_cambio"):null;
			this.venta_search.eq.id_usuario_recepcionista	= params.get("eq.id_usuario_recepcionista")?params.get("eq.id_usuario_recepcionista"):null;
			this.venta_search.le.id_usuario_recepcionista	= params.get("le.id_usuario_recepcionista")?params.get("le.id_usuario_recepcionista"):null;
			this.venta_search.lt.id_usuario_recepcionista	= params.get("lt.id_usuario_recepcionista")?params.get("lt.id_usuario_recepcionista"):null;
			this.venta_search.ge.id_usuario_recepcionista	= params.get("ge.id_usuario_recepcionista")?params.get("ge.id_usuario_recepcionista"):null;
			this.venta_search.gt.id_usuario_recepcionista	= params.get("gt.id_usuario_recepcionista")?params.get("gt.id_usuario_recepcionista"):null;
			this.venta_search.lk.id_usuario_recepcionista	= params.get("lk.id_usuario_recepcionista")?params.get("lk.id_usuario_recepcionista"):null;
			this.venta_search.eq.cupon_desc	= params.get("eq.cupon_desc")?params.get("eq.cupon_desc"):null;
			this.venta_search.le.cupon_desc	= params.get("le.cupon_desc")?params.get("le.cupon_desc"):null;
			this.venta_search.lt.cupon_desc	= params.get("lt.cupon_desc")?params.get("lt.cupon_desc"):null;
			this.venta_search.ge.cupon_desc	= params.get("ge.cupon_desc")?params.get("ge.cupon_desc"):null;
			this.venta_search.gt.cupon_desc	= params.get("gt.cupon_desc")?params.get("gt.cupon_desc"):null;
			this.venta_search.lk.cupon_desc	= params.get("lk.cupon_desc")?params.get("lk.cupon_desc"):null;
			this.venta_search.eq.id_centro_medico	= params.get("eq.id_centro_medico")?params.get("eq.id_centro_medico"):null;
			this.venta_search.le.id_centro_medico	= params.get("le.id_centro_medico")?params.get("le.id_centro_medico"):null;
			this.venta_search.lt.id_centro_medico	= params.get("lt.id_centro_medico")?params.get("lt.id_centro_medico"):null;
			this.venta_search.ge.id_centro_medico	= params.get("ge.id_centro_medico")?params.get("ge.id_centro_medico"):null;
			this.venta_search.gt.id_centro_medico	= params.get("gt.id_centro_medico")?params.get("gt.id_centro_medico"):null;
			this.venta_search.lk.id_centro_medico	= params.get("lk.id_centro_medico")?params.get("lk.id_centro_medico"):null;
			this.venta_search.eq.fecha	= params.get("eq.fecha")?params.get("eq.fecha"):null;
			this.venta_search.le.fecha	= params.get("le.fecha")?params.get("le.fecha"):null;
			this.venta_search.lt.fecha	= params.get("lt.fecha")?params.get("lt.fecha"):null;
			this.venta_search.ge.fecha	= params.get("ge.fecha")?params.get("ge.fecha"):null;
			this.venta_search.gt.fecha	= params.get("gt.fecha")?params.get("gt.fecha"):null;
			this.venta_search.lk.fecha	= params.get("lk.fecha")?params.get("lk.fecha"):null;
			this.venta_search.eq.redondeo	= params.get("eq.redondeo")?params.get("eq.redondeo"):null;
			this.venta_search.le.redondeo	= params.get("le.redondeo")?params.get("le.redondeo"):null;
			this.venta_search.lt.redondeo	= params.get("lt.redondeo")?params.get("lt.redondeo"):null;
			this.venta_search.ge.redondeo	= params.get("ge.redondeo")?params.get("ge.redondeo"):null;
			this.venta_search.gt.redondeo	= params.get("gt.redondeo")?params.get("gt.redondeo"):null;
			this.venta_search.lk.redondeo	= params.get("lk.redondeo")?params.get("lk.redondeo"):null;
			this.venta_search.eq.nombre	= params.get("eq.nombre")?params.get("eq.nombre"):null;
			this.venta_search.le.nombre	= params.get("le.nombre")?params.get("le.nombre"):null;
			this.venta_search.lt.nombre	= params.get("lt.nombre")?params.get("lt.nombre"):null;
			this.venta_search.ge.nombre	= params.get("ge.nombre")?params.get("ge.nombre"):null;
			this.venta_search.gt.nombre	= params.get("gt.nombre")?params.get("gt.nombre"):null;
			this.venta_search.lk.nombre	= params.get("lk.nombre")?params.get("lk.nombre"):null;
			this.venta_search.eq.estatus	= params.get("eq.estatus")?params.get("eq.estatus"):null;
			this.venta_search.le.estatus	= params.get("le.estatus")?params.get("le.estatus"):null;
			this.venta_search.lt.estatus	= params.get("lt.estatus")?params.get("lt.estatus"):null;
			this.venta_search.ge.estatus	= params.get("ge.estatus")?params.get("ge.estatus"):null;
			this.venta_search.gt.estatus	= params.get("gt.estatus")?params.get("gt.estatus"):null;
			this.venta_search.lk.estatus	= params.get("lk.estatus")?params.get("lk.estatus"):null;
			this.venta_search.eq.activa	= params.get("eq.activa")?params.get("eq.activa"):null;
			this.venta_search.le.activa	= params.get("le.activa")?params.get("le.activa"):null;
			this.venta_search.lt.activa	= params.get("lt.activa")?params.get("lt.activa"):null;
			this.venta_search.ge.activa	= params.get("ge.activa")?params.get("ge.activa"):null;
			this.venta_search.gt.activa	= params.get("gt.activa")?params.get("gt.activa"):null;
			this.venta_search.lk.activa	= params.get("lk.activa")?params.get("lk.activa"):null;
			this.venta_search.eq.pendiente	= params.get("eq.pendiente")?params.get("eq.pendiente"):null;
			this.venta_search.le.pendiente	= params.get("le.pendiente")?params.get("le.pendiente"):null;
			this.venta_search.lt.pendiente	= params.get("lt.pendiente")?params.get("lt.pendiente"):null;
			this.venta_search.ge.pendiente	= params.get("ge.pendiente")?params.get("ge.pendiente"):null;
			this.venta_search.gt.pendiente	= params.get("gt.pendiente")?params.get("gt.pendiente"):null;
			this.venta_search.lk.pendiente	= params.get("lk.pendiente")?params.get("lk.pendiente"):null;
			this.venta_search.eq.comprobante	= params.get("eq.comprobante")?params.get("eq.comprobante"):null;
			this.venta_search.le.comprobante	= params.get("le.comprobante")?params.get("le.comprobante"):null;
			this.venta_search.lt.comprobante	= params.get("lt.comprobante")?params.get("lt.comprobante"):null;
			this.venta_search.ge.comprobante	= params.get("ge.comprobante")?params.get("ge.comprobante"):null;
			this.venta_search.gt.comprobante	= params.get("gt.comprobante")?params.get("gt.comprobante"):null;
			this.venta_search.lk.comprobante	= params.get("lk.comprobante")?params.get("lk.comprobante"):null;
			this.venta_search.eq.promocion_desc	= params.get("eq.promocion_desc")?params.get("eq.promocion_desc"):null;
			this.venta_search.le.promocion_desc	= params.get("le.promocion_desc")?params.get("le.promocion_desc"):null;
			this.venta_search.lt.promocion_desc	= params.get("lt.promocion_desc")?params.get("lt.promocion_desc"):null;
			this.venta_search.ge.promocion_desc	= params.get("ge.promocion_desc")?params.get("ge.promocion_desc"):null;
			this.venta_search.gt.promocion_desc	= params.get("gt.promocion_desc")?params.get("gt.promocion_desc"):null;
			this.venta_search.lk.promocion_desc	= params.get("lk.promocion_desc")?params.get("lk.promocion_desc"):null;
			this.venta_search.eq.id_tipo_precio	= params.get("eq.id_tipo_precio")?params.get("eq.id_tipo_precio"):null;
			this.venta_search.le.id_tipo_precio	= params.get("le.id_tipo_precio")?params.get("le.id_tipo_precio"):null;
			this.venta_search.lt.id_tipo_precio	= params.get("lt.id_tipo_precio")?params.get("lt.id_tipo_precio"):null;
			this.venta_search.ge.id_tipo_precio	= params.get("ge.id_tipo_precio")?params.get("ge.id_tipo_precio"):null;
			this.venta_search.gt.id_tipo_precio	= params.get("gt.id_tipo_precio")?params.get("gt.id_tipo_precio"):null;
			this.venta_search.lk.id_tipo_precio	= params.get("lk.id_tipo_precio")?params.get("lk.id_tipo_precio"):null;
			this.venta_search.eq.folio	= params.get("eq.folio")?params.get("eq.folio"):null;
			this.venta_search.le.folio	= params.get("le.folio")?params.get("le.folio"):null;
			this.venta_search.lt.folio	= params.get("lt.folio")?params.get("lt.folio"):null;
			this.venta_search.ge.folio	= params.get("ge.folio")?params.get("ge.folio"):null;
			this.venta_search.gt.folio	= params.get("gt.folio")?params.get("gt.folio"):null;
			this.venta_search.lk.folio	= params.get("lk.folio")?params.get("lk.folio"):null;
			this.venta_search.eq.UUID	= params.get("eq.UUID")?params.get("eq.UUID"):null;
			this.venta_search.le.UUID	= params.get("le.UUID")?params.get("le.UUID"):null;
			this.venta_search.lt.UUID	= params.get("lt.UUID")?params.get("lt.UUID"):null;
			this.venta_search.ge.UUID	= params.get("ge.UUID")?params.get("ge.UUID"):null;
			this.venta_search.gt.UUID	= params.get("gt.UUID")?params.get("gt.UUID"):null;
			this.venta_search.lk.UUID	= params.get("lk.UUID")?params.get("lk.UUID"):null;
			this.venta_search.eq.porcentaje_desc	= params.get("eq.porcentaje_desc")?params.get("eq.porcentaje_desc"):null;
			this.venta_search.le.porcentaje_desc	= params.get("le.porcentaje_desc")?params.get("le.porcentaje_desc"):null;
			this.venta_search.lt.porcentaje_desc	= params.get("lt.porcentaje_desc")?params.get("lt.porcentaje_desc"):null;
			this.venta_search.ge.porcentaje_desc	= params.get("ge.porcentaje_desc")?params.get("ge.porcentaje_desc"):null;
			this.venta_search.gt.porcentaje_desc	= params.get("gt.porcentaje_desc")?params.get("gt.porcentaje_desc"):null;
			this.venta_search.lk.porcentaje_desc	= params.get("lk.porcentaje_desc")?params.get("lk.porcentaje_desc"):null;
			this.venta_search.eq.fecha_facturacion	= params.get("eq.fecha_facturacion")?params.get("eq.fecha_facturacion"):null;
			this.venta_search.le.fecha_facturacion	= params.get("le.fecha_facturacion")?params.get("le.fecha_facturacion"):null;
			this.venta_search.lt.fecha_facturacion	= params.get("lt.fecha_facturacion")?params.get("lt.fecha_facturacion"):null;
			this.venta_search.ge.fecha_facturacion	= params.get("ge.fecha_facturacion")?params.get("ge.fecha_facturacion"):null;
			this.venta_search.gt.fecha_facturacion	= params.get("gt.fecha_facturacion")?params.get("gt.fecha_facturacion"):null;
			this.venta_search.lk.fecha_facturacion	= params.get("lk.fecha_facturacion")?params.get("lk.fecha_facturacion"):null;
			this.venta_search.eq.tiempo_creacion	= params.get("eq.tiempo_creacion")?params.get("eq.tiempo_creacion"):null;
			this.venta_search.le.tiempo_creacion	= params.get("le.tiempo_creacion")?params.get("le.tiempo_creacion"):null;
			this.venta_search.lt.tiempo_creacion	= params.get("lt.tiempo_creacion")?params.get("lt.tiempo_creacion"):null;
			this.venta_search.ge.tiempo_creacion	= params.get("ge.tiempo_creacion")?params.get("ge.tiempo_creacion"):null;
			this.venta_search.gt.tiempo_creacion	= params.get("gt.tiempo_creacion")?params.get("gt.tiempo_creacion"):null;
			this.venta_search.lk.tiempo_creacion	= params.get("lk.tiempo_creacion")?params.get("lk.tiempo_creacion"):null;
			this.venta_search.eq.tiempo_actualizacion	= params.get("eq.tiempo_actualizacion")?params.get("eq.tiempo_actualizacion"):null;
			this.venta_search.le.tiempo_actualizacion	= params.get("le.tiempo_actualizacion")?params.get("le.tiempo_actualizacion"):null;
			this.venta_search.lt.tiempo_actualizacion	= params.get("lt.tiempo_actualizacion")?params.get("lt.tiempo_actualizacion"):null;
			this.venta_search.ge.tiempo_actualizacion	= params.get("ge.tiempo_actualizacion")?params.get("ge.tiempo_actualizacion"):null;
			this.venta_search.gt.tiempo_actualizacion	= params.get("gt.tiempo_actualizacion")?params.get("gt.tiempo_actualizacion"):null;
			this.venta_search.lk.tiempo_actualizacion	= params.get("lk.tiempo_actualizacion")?params.get("lk.tiempo_actualizacion"):null;

			console.log('Search', this.venta_search);

			let rjoinObj:any = {};
			let fjarray = [];


			this.is_loading = true;
			this.venta_search.pagina= params.get('pagina') ? parseInt( params.get('pagina') ) : 0;

			//forkJoin([
					this.rest.venta.search( this.venta_search )
			//		{{table_fork_rests}}
			//])
			.subscribe((result)=>
			{
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
