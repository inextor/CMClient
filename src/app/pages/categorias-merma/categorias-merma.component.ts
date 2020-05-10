import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad, Categoria_Merma} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-categorias-merma',
  templateUrl: './categorias-merma.component.html',
  styleUrls: ['./categorias-merma.component.css']
})
export class CategoriasMermaComponent extends BaseComponent implements OnInit {

  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

  categorias_merma:Categoria_Merma[]=[];
	categoria_merma_search:SearchObject<Categoria_Merma>;
	public statusmenu: boolean;
  ngOnInit()
	{
		this.titleService.setTitle('Categorias Merma');
		this.statusmenu = this.rest.statusMenu();
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.queryParams.subscribe( params =>
		{
			console.log("params",params);
			this.categoria_merma_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.categoria_merma_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			this.categoria_merma_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.categoria_merma_search.limite			= this.pageSize;
			this.categoria_merma_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			this.rest.categoria_merma.search(this.categoria_merma_search).subscribe((respuesta) =>
			{
				this.categorias_merma = respuesta.datos;
				this.setPages( this.categoria_merma_search.pagina, respuesta.total );
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
		this.categoria_merma_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.categoria_merma_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.categoria_merma_search[i])
                    search[i+'.'+j] = this.categoria_merma_search[i][j];
            }
        }
		console.log('search',this.categoria_merma_search );
		console.log('Busqueda', search );
		this.router.navigate(['categorias-merma'],{queryParams: search});
	}


}
