import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchObject } from '../../services/ObjRest';
import { Router,ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';


import {Distribucion} from '../../models/RestModels';
import {Centro_Medico} from '../../models/RestModels';
import {Usuario} from '../../models/RestModels';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent extends BaseComponent implements OnInit {

  constructor() { }

	distribucion_list:Distribucion[] = [];

	
	centro_medico_list:Centro_Medico[] = [];
	usuario_list:Usuario[] = [];


	distribucion_search:SearchObject<Distribucion> = {

	};

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
  }

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


			this.distribucion_search.limit = this.pageSize;

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
			this.distribucion_search.page =	'page' in params ? parseInt( params.page ) : 0;
			this.currentPage = this.distribucion_search.page;

			
			forkJoin([
				this.rest.distribucion.search(this.distribucion_search)
				,
				this.rest.centro_medico.getAll({}),
				this.rest.usuario.getAll({})
			])
			.subscribe((responses)=>
			{
				this.distribucion_list = responses[0].data;
				this.setPages( this.distribucion_search.page, responses[0].total );
				this.centro_medico_list = responses[ 1 ].data;
				this.usuario_list = responses[ 2 ].data;
			});

		});
	}

	search()
	{
		this.is_loading = true;
		this.distribucion_search.page = 0;

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
