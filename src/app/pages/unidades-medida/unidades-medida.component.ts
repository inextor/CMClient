import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad, Unidad_Medida} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.css']
})
export class UnidadesMedidaComponent extends BaseComponent implements OnInit {

  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

  unidades_medida:Unidad_Medida[]=[];
	unidad_medida_search:SearchObject<Unidad_Medida>;
	public statusmenu: boolean;
  ngOnInit() {
    this.titleService.setTitle('Unidades de medida');
		this.statusmenu = this.rest.statusMenu();
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.queryParams.subscribe( params =>
		{
			console.log("params",params);
			this.unidad_medida_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.unidad_medida_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			this.unidad_medida_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.unidad_medida_search.limite			= this.pageSize;
			this.unidad_medida_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			this.rest.unidad_medida.search(this.unidad_medida_search).subscribe((respuesta) =>
			{
				this.unidades_medida = respuesta.datos;
				this.setPages( this.unidad_medida_search.pagina, respuesta.total );
				this.is_loading = false;
			},error=>this.showError(error));
		});
  }

  search()
	{
		this.is_loading = true;
		this.unidad_medida_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.unidad_medida_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.unidad_medida_search[i])
                    search[i+'.'+j] = this.unidad_medida_search[i][j];
            }
        }
		console.log('search',this.unidad_medida_search );
		console.log('Busqueda', search );
		this.router.navigate(['unidades-medida'],{queryParams: search});
	}
}
