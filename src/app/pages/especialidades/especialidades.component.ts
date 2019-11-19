import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from	'@angular/common';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent extends BaseComponent implements OnInit {

	constructor(public rest:RestService,public router:Router,public route:ActivatedRoute,public location: Location) {
		super( rest,router,route,location);
	}

	especialidades:Especialidad[]=[];
	public statusmenu: boolean;
	ngOnInit()
	{
		this.statusmenu = this.rest.statusMenu();
		this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.paramMap.subscribe( params =>
		{
			this.currentPage = params.get('pagina') == null ? 0 : parseInt(params.get('pagina') );

			this.rest.especialidad.getAll({},{page:this.currentPage, page_size: 10}).subscribe((respuesta) =>
			{
				this.especialidades = respuesta.datos;
				console.log(this.especialidades)
				this.is_loading = false;
				this.setPages( this.currentPage, respuesta.total );
			},error=>this.showError(error));
		});
	}
	activeMenu(){
		this.rest.activeMenu();
		this.statusmenu = this.rest.statusMenu();
	}
}
