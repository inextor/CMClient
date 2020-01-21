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
	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			this.distribucionInfo = {
				distribucion : {}
				,detalles_distribucion: []
			};

			let id = params.get('id') ==null ? null : parseInt(params.get('id') );;

			if( id )
			{
				this.rest.distribucionInfo.get( id )
				.subscribe((response)=>
				{
					this.distribucionInfo = response;
				});
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
