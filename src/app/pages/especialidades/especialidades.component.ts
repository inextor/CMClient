import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	especialidades:Especialidad[]=[];
	especialidad_search:SearchObject<Especialidad>;
	public statusmenu: boolean;
	ngOnInit()
	{
		this.titleService.setTitle('Especialidades');
		this.statusmenu = this.rest.statusMenu();
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// obteniendo el id del centro medico de la session del usuario
		let usuario = this.rest.getUsuarioSesion();
		this.route.queryParams.subscribe( params =>
		{
			
			console.log("params",params);
			this.especialidad_search = {
				eq: {id_centro_medico:usuario.id_centro_medico},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.especialidad_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			this.especialidad_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.especialidad_search.limite			= this.pageSize;
			this.especialidad_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			this.rest.especialidad.search(this.especialidad_search).subscribe((respuesta) =>
			{
				this.especialidades = respuesta.datos;
				this.setPages( this.especialidad_search.pagina, respuesta.total );
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
		this.especialidad_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.especialidad_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.especialidad_search[i])
                    search[i+'.'+j] = this.especialidad_search[i][j];
            }
        }
		console.log('search',this.especialidad_search );
		console.log('Busqueda', search );
		this.router.navigate(['especialidades'],{queryParams: search});
	}

}
