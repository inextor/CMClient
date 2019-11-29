import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Tipo_Precio,Precio_Servicio} from '../../models/Modelos';
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
	precio_servicio?:Precio_Servicio;
}

interface Info_Precio
{
	[key:number]:Precio_Servicio[];
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
	precios_info:Info_Precio	= {};
	procesando_pago:boolean		= false;
	venta:Venta = {
	};
	pago:Pago = {
	};

	ngOnInit()
	{
		this.rest.tipo_precio.getAll({ id_organizacion: this.rest.getUsuarioSesion().id_organizacion }).subscribe((response)=>
		{
			this.tipo_precios = response.datos;
			if( response.datos )
			{
				///this.venta.id_tipo_precio = response.datos[0].id;
				this.venta.cliente	= response.datos[0].nombre;
			}
		});
	}
	changeTipoCliente(value)
	{
		if( this.venta.cliente == '' || this.tipo_precios.some((i)=>i.nombre == this.venta.cliente ))
		{
			let find = this.tipo_precios.find(i=>i.id == value );
			if( find )
				this.venta.cliente = find.nombre;
		}
	}
	cargarVenta(id_venta)
	{

	}

	buscar(evt:any)
	{
		let x = this.rest.servicio.search({
			lk:{ nombre: evt.target.value },
			// eq:{tipo:'PRODUCTO_FISICO'}
		}).subscribe((response)=>
		{
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}

	pagarVenta()
	{
		this.show_modal_pago = true;
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

		let precio_servicio = null;

		if( servicio.id in this.precios_info )
		{
			precio_servicio = this.precios_info[ servicio.id ].find((p)=>p == this.venta.id_tipo_precio );
		}
		else
		{
			let id_centro_medico	= this.rest.getCurrentCentroMedico();

			this.rest.precio_servicio.search
			({
				eq:
				{
					id_servicio			: servicio.id
					,id_centro_medico	: id_centro_medico
				}
			}).subscribe((response)=>
			{
				this.precios_info[ servicio.id ] = response.datos;
			},(error)=>
			{
				console.log('Solo imprimimos el error en la consola');
			});
		}


		this.detalle_servicios.push({
			servicio
			,precio_servicio
			,detalle_venta:{
				id_servicio: servicio.id
				,cantidad: 1
			}
		});

		if( servicio.id in this.precios_info )
		{
			this.rest.precio_servicio.search
			({
				eq:
				{
					id_servicio			: servicio.id
					,id_centro_medico	: this.venta.id_centro_medico
				}
			}).subscribe((response)=>
			{
				this.precios_info[ servicio.id ] = response.datos;
			});
		}


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
