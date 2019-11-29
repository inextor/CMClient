import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Tipo_Precio} from '../../models/Modelos';
import { Router,ActivatedRoute,Params} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { forkJoin,of } from 'rxjs';
import { mergeMap,catchError } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Servicio,Pago} from '../../models/Modelos';
import { Detalle_Venta,Venta} from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';


interface OldSearch{
	[key:string]:Servicio[];
}

interface ServicioDetalle{
	detalle_venta:Detalle_Venta;
	servicio:Servicio;
}



@Component({
	selector: 'app-punto-venta',
	templateUrl: './punto-venta.component.html',
	styleUrls: ['./punto-venta.component.css']
})

export class PuntoVentaComponent extends	BaseComponent implements OnInit {

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title)
	{
		super( rest,router,route,location,titleService);
	}

	busqueda:string				= '';
	servicios:Servicio[]		= [];
	search_servicios:Servicio[]	= [];
	busquedas:OldSearch			= {};
	todos_servicios:[] 			= [];
	detalle_servicios:ServicioDetalle[]	= [];
	total						= 0;
	tipo_precios:Tipo_Precio[]	= [];
	show_modal_pago				= false;
	show_name_input				= false;

	venta:Venta = {

	};
	pago:Pago = {

	};

	ngOnInit()
	{
		this.rest.tipo_precio.getAll({ id_organizacion: this.rest.getUsuarioSesion().id_organizacion }).subscribe((response)=>
		{
			this.tipo_precios = response.datos;
		});
	}

	cargarVenta(id_venta)
	{

	}

	buscar(evt:any)
	{
		let x = this.rest.servicio.search({
			lk:{ nombre: evt.target.value }
		}).subscribe((response)=>
		{
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}

	agregarServicio(servicio:Servicio)
	{
		let s = this.detalle_servicios.find(i=>i.servicio.id == servicio.id );
		if( s )
		{
			this.busqueda = '';
			this.aumentar( s );
			return;
		}

		this.detalle_servicios.push({
			servicio
			,detalle_venta:{
				id_servicio: servicio.id
				,cantidad: 1
			}
		});

		this.busqueda = '';
		this.search_servicios = [];
	}

	aumentar(detalle_servicio)
	{
		detalle_servicio.detalle_venta.cantidad++;
	}


	calcularTotal()
	{

	}
}
