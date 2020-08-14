import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio, Centro_Medico,} from '../../models/Modelos';
import { ServicioResponseItem,Respuesta, } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from '../../models/Respuestas';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	centro_medico;
	servicios:Servicio[]= [];
	is_loading:boolean = false;
	servicio_search:SearchObject<Servicio>;

	ngOnInit() {
		this.centro_medico = this.rest.getUsuarioSesion();
		console.log('imprimiendo currentCentroMedico',this.centro_medico);
			// console.log('imprimiendo organizacion',this.centro_medico);
		this.route.queryParams.subscribe( params =>
		{
			
			this.servicio_search = {
				eq: { id_organizacion: this.centro_medico.id_organizacion, id_centro_medico: this.centro_medico.id_centro_medico },
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};
			console.log('servicios_search',this.servicio_search);
			this.titleService.setTitle('Servicios')
			this.servicio_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			this.servicio_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.servicio_search.limite			= this.pageSize;
			this.servicio_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			this.is_loading = true;

			this.rest.servicio.search( this.servicio_search ).subscribe((respuesta)=>
			{
				this.servicios = respuesta.datos;
				console.log('losservicios',this.servicios);
				this.setPages( this.servicio_search.pagina, respuesta.total );
				this.is_loading = false;
			},error=> this.showError(error));
		});
	}

	changeSearch(nombre:string)
	{
		
	}

	search()
	{
		this.is_loading = true;
		this.servicio_search.pagina= 0;
		this.servicio_search.lk.id_organizacion =this.centro_medico.id_organizacion;
		this.servicio_search.lk.codigo	= this.servicio_search.lk.nombre;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.servicio_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.servicio_search[i])
                    search[i+'.'+j] = this.servicio_search[i][j];
            }
        }
		console.log( search );
		this.router.navigate(['servicios'],{queryParams: search});
	}
}
