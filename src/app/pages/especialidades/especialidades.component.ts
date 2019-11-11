import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BasePage } from '../base/base.component';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent extends BasePage implements OnInit {

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
			this.currentPage = params.get('page') == null ? 0 : parseInt(params.get('page') );

			this.rest.especialidad.getAll({},{page:this.currentPage, page_size: 10}).subscribe((respuesta) =>
			{
				this.especialidades = respuesta.datos;
				console.log(this.especialidades)

				this.setPages( this.currentPage, respuesta.total );
			},(error)=>
			{
				this.showError(error);
			});
		});
	}
	activeMenu(){
		this.rest.activeMenu();
		this.statusmenu = this.rest.statusMenu();
	}
}
