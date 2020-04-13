import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Tipo_Poliza} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-tipo-polizas',
  templateUrl: './tipo-polizas.component.html',
  styleUrls: ['./tipo-polizas.component.css']
})
export class TipoPolizasComponent extends BaseComponent implements OnInit {

  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

  tipo_polizas:Tipo_Poliza[]=[];
	tipo_poliza_search:SearchObject<Tipo_Poliza>;
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
			this.tipo_poliza_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.tipo_poliza_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			this.tipo_poliza_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.tipo_poliza_search.limite			= this.pageSize;
			this.tipo_poliza_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			this.rest.tipo_poliza.search(this.tipo_poliza_search).subscribe((respuesta) =>
			{
				this.tipo_polizas = respuesta.datos;
				this.setPages( this.tipo_poliza_search.pagina, respuesta.total );
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
		this.tipo_poliza_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.tipo_poliza_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.tipo_poliza_search[i])
                    search[i+'.'+j] = this.tipo_poliza_search[i][j];
            }
        }
		console.log('search',this.tipo_poliza_search );
		console.log('Busqueda', search );
		this.router.navigate(['especialidades'],{queryParams: search});
	}

}
