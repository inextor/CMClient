import { Component,	OnInit	}	from	'@angular/core';
import { RestService	}	from	'../../services/rest.service';
import { Usuario,Doctor,Centro_Medico, Organizacion	}	from	'../../models/Modelos';
import { Router,ActivatedRoute}	from	"@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.css']
})
export class OrganizacionesComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		//import { Title } from '@angular/platform-browser';
		super( rest,router,route,location,titleService);
	}
  organizaciones:Organizacion[]= [];
  organizacion_search:SearchObject<Organizacion>;
  ngOnInit() {

    this.titleService.setTitle('Clinicas');
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.queryParams.subscribe( params =>
		{
			this.organizacion_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};
			
			this.organizacion_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.organizacion_search.limite			= this.pageSize;
			this.organizacion_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			this.is_loading = true;
			this.rest.organizacion.getAll({}).subscribe((respuesta) =>
			{
				this.organizaciones = respuesta.datos;
				console.log("asdf",respuesta);
				this.is_loading = false;
			},error=>this.showError(error));
		});

		// this.rest.centro_medico.getAll({ id_organizacion: 1 }).subscribe((respuesta)=>
		// {
		// 	this.is_loading = false;
		// 	this.centros_medicos = respuesta.datos;
		// }, (error) =>  this.showError );
  }

}
