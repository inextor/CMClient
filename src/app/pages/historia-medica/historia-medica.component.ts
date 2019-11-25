
import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Tipo_Gasto } from '../../models/Modelos';
import { Router,ActivatedRoute} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-historia-medica',
	templateUrl: './historia-medica.component.html',
	styleUrls: ['./historia-medica.component.css']
})

export class HistoriaMedicaComponent extends BaseComponent implements OnInit {

 	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	ngOnInit() {

		//this.route.paramMap.subscribe( params =>{


		//	let id_paciente	= parseInt( params.get('id_usuario') );
		//	let usuario = this.rest.getUsuarioSesion();

		//	forkJoin([

		//	]).subscribe((result)=>
		//		{
		//			this.rest.consulta.getAll({id_paciente,id_doctor:usuario.id},{limite:'no'})
		//				,this.rest.paciente.get( id_paciente )
		//				,this.rest.getPreguntasRespuestasHistoriaClinica(  id_paciente,this.doctor.id, this.doctor.id_especialidad )
		//		});
		//});
	}
}
