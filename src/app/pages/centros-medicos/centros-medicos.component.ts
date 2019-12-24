import { Component,	OnInit	}	from	'@angular/core';
import { RestService	}	from	'../../services/rest.service';
import { Usuario,Doctor,Centro_Medico	}	from	'../../models/Modelos';
import { Router,ActivatedRoute}	from	"@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-centros-medicos',
  templateUrl: './centros-medicos.component.html',
  styleUrls: ['./centros-medicos.component.css']
})

export class CentrosMedicosComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		//import { Title } from '@angular/platform-browser';
		super( rest,router,route,location,titleService);
	}


	centros_medicos:Centro_Medico[]= [];
	centro_medico_search:SearchObject<Centro_Medico>;
	public statusmenu: boolean;
	ngOnInit()	{
		this.titleService.setTitle('Clinicas');

		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.queryParams.subscribe( params =>
		{
			this.centro_medico_search = {
				eq: { id_organizacion: this.rest.getUsuarioSesion().id_organizacion },
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

		
			this.centro_medico_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.centro_medico_search.limite			= this.pageSize;
			this.centro_medico_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			this.is_loading = true;
			this.rest.centro_medico.search(this.centro_medico_search).subscribe((respuesta) =>
			{
				this.centros_medicos = respuesta.datos;
				this.is_loading = false;
				this.setPages( this.centro_medico_search.pagina, respuesta.total );
			},error=>this.showError(error));
		});

		// this.rest.centro_medico.getAll({ id_organizacion: 1 }).subscribe((respuesta)=>
		// {
		// 	this.is_loading = false;
		// 	this.centros_medicos = respuesta.datos;
		// }, (error) =>  this.showError );
	}

	search()
	{
		this.is_loading = true;
		this.centro_medico_search.pagina = 0;
		let search = {};
		let array = ['eq','le','lt','ge','gt','csv','lk'];
		for(let i in this.centro_medico_search )
		{
			
			console.log( 'i',i,array.indexOf( i ) );
			if(array.indexOf( i ) > -1 )
			{
				for(let j in this.centro_medico_search[i])
					search[i+'.'+j] = this.centro_medico_search[i][j];
			}
		}
		console.log('search',this.centro_medico_search );
		console.log('Busqueda', search );
		this.is_loading = false;
		this.router.navigate(['/centros-medicos'],{queryParams: search });
	}

}
