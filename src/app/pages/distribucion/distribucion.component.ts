import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchObject } from '../../models/Respuestas';
import { Router,ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';


import {Distribucion} from 'src/app/models/Modelos';
import {Centro_Medico} from 'src/app/models/Modelos';
import {Usuario} from 'src/app/models/Modelos';
import { DistribucionInfo } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent extends BaseComponent implements OnInit {


	distribucion_list:DistribucionInfo[] = [];

	distribucion_search:SearchObject<Distribucion> = {

	};


	ngOnInit()
	{
		this.route.queryParams.subscribe( params =>
		{

			this.distribucion_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
				start: {}
			};


			this.distribucion_search.limite = this.pageSize;

			this.titleService.setTitle('distribucion');

			let keys = ['eq','le','lt','ge','gt','csv','lk'];
			let fields = [ "id","id_centro_medico_solicitante","estatus","id_usuario_recibio","id_usuario_envio","guia","paqueteria","id_centro_medico_distribuidor","tiempo_creacion","tiempo_actualizacion" ]

			keys.forEach((k)=>
			{
				fields.forEach((f)=>
				{
					let field = k+"."+f;

					if( params[field ] )
					{
						this.distribucion_search[ k ][ f ] = params[ field ];
					}
				});
			});

			console.log('Search', this.distribucion_search);

			this.is_loading = true;
			this.distribucion_search.pagina =	'pagina' in params ? parseInt( params.pagina ) : 0;
			this.currentPage = this.distribucion_search.pagina;

			this.rest.distribucionInfo.search(this.distribucion_search)
			.subscribe((response)=>
			{
				this.distribucion_list = response.data;
				this.setPages( this.distribucion_search.pagina, response.total );
			});
		});
	}

	search()
	{
		this.is_loading = true;
		this.distribucion_search.pagina = 0;

		let search = {};
		let array = ['eq','le','lt','ge','gt','csv','lk'];
		for(let i in this.distribucion_search )
		{
			console.log( 'i',i,array.indexOf( i ) );
			if(array.indexOf( i ) > -1 )
			{
				for(let j in this.distribucion_search[i])
					search[i+'.'+j] = this.distribucion_search[i][j];
			}
		}

		console.log( search );
		this.router.navigate(['/list-distribucion'],{queryParams: search});
	}
}
