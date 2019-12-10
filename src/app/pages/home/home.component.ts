import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad,Centro_Medico} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from	'@angular/common';
import { UrlSegment } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

	show_seleccionar_centro_medico:boolean = false;

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	ngOnInit() {

		this.route.paramMap.subscribe(()=>
		{
			let centroMedico = this.rest.getCurrentCentroMedico();
			if( centroMedico == null || centroMedico == undefined )
			{
				this.show_seleccionar_centro_medico = true;
			}
		});
	}

	onSeleccionarCentroMedico(centro_medico:Centro_Medico)
	{
		localStorage.setItem("centro_medico",JSON.stringify(centro_medico));
		this.show_seleccionar_centro_medico = false;
	}
}
