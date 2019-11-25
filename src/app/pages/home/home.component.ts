import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad,Centro_Medico} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from	'@angular/common';
import { UrlSegment } from '@angular/router';



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

	//constructor(public rest:RestService,public router:Router,public route:ActivatedRoute,public location: Location) {
	//	super( rest,router,route,location);
	//}
	show_seleccionar_centro_medico:boolean = false;

	ngOnInit() {

		let c = localStorage.getItem('id_centro_medico');
		if( c == undefined || c == null )
		{
			this.show_seleccionar_centro_medico = true;
		}

		this.route.paramMap.subscribe(params=>console.log(params.keys) );
		this.route.data.subscribe(data=>console.log( data ));
    	this.route.url.subscribe((segments:UrlSegment[]) => {
    	    for(var i = 0; i < segments.length; i++){
    	        console.log("param: " + segments[i]);
    	    }
    	});
	}

	onSeleccionarCentroMedico(centro_medico:Centro_Medico)
	{
		localStorage.setItem('id_centro_medico', ''+centro_medico.id );
		this.show_seleccionar_centro_medico = false;
	}
}
