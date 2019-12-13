import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

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
			this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );

			this.rest.especialidad.getAll({},{pagina:this.currentPage, limite: this.pageSize}).subscribe((respuesta) =>
			{
				this.especialidades = respuesta.datos;
				console.log(this.especialidades)
				this.is_loading = false;
				this.setPages( this.currentPage, respuesta.total );
			},error=>this.showError(error));
		});
	}
}
