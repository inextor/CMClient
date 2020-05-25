import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad, Aseguranza} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-aseguranzas',
  templateUrl: './aseguranzas.component.html',
  styleUrls: ['./aseguranzas.component.css']
})
export class AseguranzasComponent extends BaseComponent implements OnInit {

  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	aseguranzas:Aseguranza[]=[];
	aseguranza_search:SearchObject<Aseguranza>;
	public statusmenu: boolean;
	ngOnInit()
	{
		this.titleService.setTitle('Especialidades');
		this.statusmenu = this.rest.statusMenu();
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.queryParams.subscribe( params =>
		{
			console.log("params",params);
			this.aseguranza_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.aseguranza_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			this.aseguranza_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.aseguranza_search.limite			= this.pageSize;
			this.aseguranza_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			this.rest.aseguranza.search(this.aseguranza_search).subscribe((respuesta) =>
			{
				this.aseguranzas = respuesta.datos;
				this.setPages( this.aseguranza_search.pagina, respuesta.total );
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
		this.aseguranza_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.aseguranza_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.aseguranza_search[i])
                    search[i+'.'+j] = this.aseguranza_search[i][j];
            }
        }
		console.log('search',this.aseguranza_search );
		console.log('Busqueda', search );
		this.router.navigate(['aseguranzas'],{queryParams: search});
	}

}
