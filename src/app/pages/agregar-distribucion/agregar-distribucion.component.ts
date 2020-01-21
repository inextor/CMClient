import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';

import {DistribucionInfo} from '../../models/Respuestas';
import {Centro_Medico} from '../../models/Modelos';
import {Usuario} from '../../models/Modelos';

@Component({
  selector: 'app-agregar-distribucion',
  templateUrl: './agregar-distribucion.component.html',
  styleUrls: ['./agregar-distribucion.component.css']
})

export class AgregarDistribucionComponent extends BaseComponent implements OnInit {

	distribucionInfo:DistribucionInfo= null;
	centro_medico_list:Centro_Medico[] = [];
	usuario_list:Usuario[]	= [];

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			this.distribucionInfo = {
				distribucion : {}
				,detalles_distribucion: []
			};

			let id = params.get('id') ==null ? null : parseInt(params.get('id') );;

			let usuario = this.rest.getUsuarioSesion();

			if( id )
			{
				forkJoin([
					this.rest.distribucionInfo.get( id )
					,this.rest.centro_medico.search({
						eq:{ id_organizacion: usuario.id_organizacion }
					})
					,this.rest.usuario.search({
						eq:{ id_organizacion: usuario.id_organizacion }
						,csv:{ tipo:['DOCTOR','RECEPCIONISTA','ASISTENTE','ADMIN'] }
					})
				])
				.subscribe((responses)=>
				{
					this.distribucionInfo = responses[0];
					this.centro_medico_list = responses[1].datos;
					this.usuario_list = responses[2].datos;
				},(error)=>this.showError(error));
			}
			else
			{
				forkJoin([
					this.rest.centro_medico.search
					({
						eq:{ id_organizacion: usuario.id_organizacion }
					})
					,this.rest.usuario.search({
						eq:{ id_organizacion: usuario.id_organizacion }
						,csv:{ tipo:['DOCTOR','RECEPCIONISTA','ASISTENTE','ADMIN'] }
					})
				]).subscribe((responses)=>
				{
					this.is_loading = false;
					this.centro_medico_list = responses[0].datos;
					this.usuario_list = responses[1].datos;
				},(error)=>this.showError(error));
			}
		});
	}

	save()
	{
		this.is_loading = true;

		if( this.distribucionInfo.distribucion.id )
		{
			this.rest.distribucionInfo.update( this.distribucionInfo ).subscribe((distribucionInfo)=>{
				this.is_loading = false;
				this.router.navigate(['/distribucion']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.distribucionInfo.create( this.distribucionInfo ).subscribe((distribucionInfo)=>{
				this.is_loading = false;
				this.router.navigate(['/distribucion']);
			},(error)=>this.showError(error));
		}
	}
}
