import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad, Poliza} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-polizas',
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.css']
})
export class PolizasComponent extends BaseComponent implements OnInit {
  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	polizas:Poliza[]=[];
	poliza_search:SearchObject<Poliza>;
	public statusmenu: boolean;
	ngOnInit()
	{
		this.titleService.setTitle('Polizas');
		this.statusmenu = this.rest.statusMenu();
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.queryParams.subscribe( params =>
		{
			console.log("params",params);
			this.poliza_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.especialidad_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			// this.poliza_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.poliza_search.limite			= this.pageSize;
			this.poliza_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			this.rest.poliza.search(this.poliza_search).subscribe((respuesta) =>
			{
				this.polizas = respuesta.datos;
				this.setPages( this.poliza_search.pagina, respuesta.total );
				this.is_loading = false;
			},error=>this.showError(error));
		});
	}
	changeSearch(nombre:string)
	{
	}

	search()
	{
		this.is_loading = true;
		this.poliza_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.poliza_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.poliza_search[i])
                    search[i+'.'+j] = this.poliza_search[i][j];
            }
        }
		console.log('search',this.poliza_search );
		console.log('Busqueda', search );
		this.router.navigate(['polizas'],{queryParams: search});
	}

}
