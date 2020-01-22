import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad, Consulta} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent extends BaseComponent implements OnInit {


	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	consultas:Consulta[]=[];
	consulta_search:SearchObject<Consulta>;
	public statusmenu: boolean;
	ngOnInit()
	{
		this.titleService.setTitle('Consultas');
		this.statusmenu = this.rest.statusMenu();
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.queryParams.subscribe( params =>
		{
			this.consulta_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

      // this.consulta_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
      this.consulta_search.eq.id_doctor	= "eq.id_doctor" in params ?params["eq.id_doctor"]:null;
      this.consulta_search.eq.id_paciente	= "eq.id_paciente" in params ?params["eq.id_paciente"]:null;
      
			this.consulta_search.limite			= this.pageSize;
			this.consulta_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			this.rest.consulta.search(this.consulta_search).subscribe((respuesta) =>
			{
				this.consultas = respuesta.datos;
				this.setPages( this.consulta_search.pagina, respuesta.total );
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
		this.consulta_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.consulta_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.consulta_search[i])
                    search[i+'.'+j] = this.consulta_search[i][j];
            }
        }
		console.log('search',this.consulta_search );
		console.log('Busqueda', search );
		this.router.navigate(['consultas'],{queryParams: search});
	} 

}
