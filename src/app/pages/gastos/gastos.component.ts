import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Gasto_Centro_Medico,Tipo_Gasto } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse } from '../../models/Respuestas';

@Component({
	selector: 'app-gastos',
	templateUrl: './gastos.component.html',
	styleUrls: ['./gastos.component.css'],
})
export class GastosComponent extends BaseComponent implements OnInit {


	tipos_gasto:Tipo_Gasto[] = [];
	gastos:SearchGastoCentroMedicoResponse[] = [];

	ngOnInit() {
		let usuario = this.rest.getUsuarioSesion();

		forkJoin
		(
			[
				//getTiposGastos({id_organizacion: usuario.id_organizacion}),
				//this.rest.getGastos({ id_centro_medico: 1 })
				this.rest.tipo_gasto.getAll({id_organizacion: usuario.id_organizacion}),
				this.rest.searchGastoCentroMedico.getAll({ id_centro_medico: 1 }) //TODO FIX ponerlo de la session o seleccionarlo
			]
		).subscribe
		(
			(response:any[])=>
			{
				console.log("gastos",response);

				this.tipos_gasto = response[0].datos;
				this.gastos	= response[1].datos;//TODO Cambiar al usaurio de la sesion
				this.is_loading = false;
			}
			,(error)=>
			{
				this.showError( error );
			}
		);
	}
}
