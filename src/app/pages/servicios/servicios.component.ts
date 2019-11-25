import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,} from '../../models/Modelos';
import { ServicioResponseItem,Respuesta, } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	servicios:ServicioResponseItem[]= [];

	is_loading:boolean = false;

	ngOnInit() {
		this.titleService.setTitle('Servicios');
		this.is_loading = true;
		this.rest.searchServicio.getAll({}).subscribe((respuesta)=>
		{
			this.is_loading = false;
			this.servicios = respuesta.datos;
			console.log(this.servicios);
		},error=> this.showError(error));
	}
}
