import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Tipo_Precio} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-tipo-precios',
  templateUrl: './tipo-precios.component.html',
  styleUrls: ['./tipo-precios.component.css']
})
export class TipoPreciosComponent  extends BaseComponent implements OnInit {
  tiposPrecio:Tipo_Precio[]=[];

  ngOnInit() {
    this.is_loading = true;
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>
		// this.rest.especialidad.getAll({}).subscribe((respuesta)=>

		this.route.paramMap.subscribe( params =>
		{
			this.currentPage = params.get('page') == null ? 0 : parseInt(params.get('page') );

			this.rest.tipo_precio.getAll({},{page:this.currentPage, page_size: 10}).subscribe((respuesta) =>
			{
				this.tiposPrecio = respuesta.datos;
				console.log(this.tiposPrecio)

				this.setPages( this.currentPage, respuesta.total );
			},(error)=>
			{
				this.showError(error);
			});
		});
  }

}
