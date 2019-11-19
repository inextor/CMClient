import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Precio_Servicio,} from '../../models/Modelos';
import { ServicioResponseItem } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { Location } from	'@angular/common';



@Component({
  selector: 'app-editar-precios',
  templateUrl: './editar-precios.component.html',
  styleUrls: ['./editar-precios.component.css']
})
export class EditarPreciosComponent implements OnInit {

	constructor(private rest:RestService,private router:Router,private route:ActivatedRoute) { }
	servicio:ServicioResponseItem = null;
	is_loading:boolean = false;


	precio:Precio_Servicio = {
		precio:null,
	};


	ngOnInit() {
		this.rest.servicio.getAll({}).subscribe(params => {

		})

		this.route.paramMap.subscribe( params =>{

			let id_precio = params.get('id_precio') == null ? null : parseInt( params.get('id_precio') );

			if( id_precio )
			{
				this.is_loading = true;
				//this.rest.getPaciente( id_paciente ).subscribe((paciente)=>
				this.rest.paciente.get(id_precio ).subscribe((precio)=>
				{
					console.log("WTF");
					this.is_loading = false;
					this.precio = precio;
				});
			}
			else
			{
				this.precio ={
					precio:null,
				};
			}
		});
		}


}
