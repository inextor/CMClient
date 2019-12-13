import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

import { Venta } from '../../models/Modelos';
import { Router,ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import {Usuario} from '../../models/Modelos';
import { SearchObject } from 'src/app/models/Respuestas';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	ventas:Venta[] = [];
	usuario_list:Usuario[] = [];
	usuarios_atendio:Usuario[]	= [];
	centros_medicos:Centro_Medico[] = [];

	venta_search:SearchObject<Venta> = {

	};

	ngOnInit()
	{
		this.route.queryParams.subscribe( params =>
		{

			this.venta_search = {
				lt: {}
				,eq: {}
				,ge: {}
				,gt: {}
				,le: {}
				,lk: {}
				,csv: {}
			};

			this.titleService.setTitle('venta');


			this.venta_search.eq.id					= "eq.id" in params ?params["eq.id"]:null;
			this.venta_search.eq.id_usuario_cliente	= "eq.id_usuario_cliente" in params ?params["eq.id_usuario_cliente"]:null;
			this.venta_search.eq.facturado			= "eq.facturado" in params ?params["eq.facturado"]:null;
			this.venta_search.eq.id_usuario_atendio	= "eq.id_usuario_atendio" in params ?params["eq.id_usuario_atendio"]:'';
			this.venta_search.eq.id_centro_medico	= "eq.id_centro_medico" in params ?params["eq.id_centro_medico"]:null;
			this.venta_search.eq.estatus			= "eq.estatus" in params ?params["eq.estatus"]:null;
			this.venta_search.eq.activa				= "eq.activa" in params ?params["eq.activa"]:'SI';
			this.venta_search.eq.id_tipo_precio		= "eq.id_tipo_precio" in params ?params["eq.id_tipo_precio"]:null;

			this.venta_search.lk.nombre				= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.venta_search.lk.cliente			= "lk.cliente" in params ?params["lk.cliente"]:null;

			this.venta_search.le.fecha				= "le.fecha" in params ?params["le.fecha"]:null;
			this.venta_search.ge.fecha				= "ge.fecha" in params ?params["ge.fecha"]:null;
			this.venta_search.csv.estatus			= "csv.estatus" in params ?[params["csv.estatus"]]:['PROCESADA','PAGADA'];
			this.venta_search.limite				= this.pageSize;
			console.log('Search', this.venta_search);

			let rjoinObj:any = {};
			let fjarray = [];


			this.is_loading = true;
			this.venta_search.pagina= params['pagina'] ? parseInt( params['pagina'] ) : 0;

			forkJoin(
				this.rest.venta.search( this.venta_search )
				,this.rest.usuario.search
				({
					eq:
					{
						id_organizacion: this.rest.getUsuarioSesion().id_organizacion
					}
					,csv:
					{
						tipo:['ADMIN','DOCTOR','RECEPCIONISTA','ASISTENTE']
					}
				})
				,this.rest.centro_medico.search({eq:{ id_organizacion: this.rest.getUsuarioSesion().id_organizacion } })
			)
			.subscribe((result)=>
			{
				this.ventas = result[0].datos;
				this.setPages( this.venta_search.pagina, result[0].total );
				this.usuarios_atendio = result[1].datos;
				this.centros_medicos = result[2].datos;
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
		let search = {};
		let array = ['eq','le','lt','ge','gt','csv','lk'];
		for(let i in this.venta_search )
		{
			console.log( 'i',i,array.indexOf( i ) );
			if(array.indexOf( i ) > -1 )
			{
				for(let j in this.venta_search[i])
					search[i+'.'+j] = this.venta_search[i][j];
			}
		}
		console.log('search',this.venta_search );
		console.log('Busqueda', search );
		this.router.navigate(['/ventas'],{queryParams: search });
	}
}
