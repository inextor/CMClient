import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Tipo_Gasto } from '../../models/Modelos';
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
import { Servicio} from '../../models/Modelos';
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

	nombre_servicio				= '';
	servicios:Servicio[]		= [];
	search_servicios:Servicio[]	= [];
	busquedas:OldSearch			= {};
	todos_servicios:[] 			= [];

	ngOnInit()
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
		this.servicios.push( servicio );
		this.nombre_servicio = '';
	}
}
