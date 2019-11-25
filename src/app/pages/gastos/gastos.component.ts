import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Gasto_Centro_Medico,Tipo_Gasto } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse } from '../../models/Respuestas';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-gastos',
	templateUrl: './gastos.component.html',
	styleUrls: ['./gastos.component.css'],
})
export class GastosComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		//import { Title } from '@angular/platform-browser';
		super( rest,router,route,location,titleService);
	}

	tipos_gasto:Tipo_Gasto[] = [];
	gastos:SearchGastoCentroMedicoResponse[] = [];
	tipo_gastos_dic:any = {};


	ngOnInit() {
		this.titleService.setTitle('Gastos');
		let usuario = this.rest.getUsuarioSesion();
		console.log(usuario)
		this.is_loading = true;
		forkJoin
		(
			[
				//getTiposGastos({id_organizacion: usuario.id_organizacion}),
				//this.rest.getGastos({ id_centro_medico: 1 })
				this.rest.tipo_gasto.getAll({id_organizacion: usuario.id_organizacion}),
				this.rest.searchGastoCentroMedico.getAll({},{id_organizacion: usuario.id_organizacion}) //TODO FIX ponerlo de la session o seleccionarlo
			]
		).subscribe
		(
			(response:any[])=>
			{
				console.log("gastos",response);
				this.tipos_gasto = response[0].datos;
				this.tipos_gasto.forEach(i=> this.tipo_gastos_dic[ i.id ] =  i);
				this.gastos	= response[1].datos;//TODO Cambiar al usaurio de la sesion
				this.is_loading = false;
			}
			,(error)=>
			{

				this.showError( error );
				this.is_loading = false ;
			}
		);
	}
}
