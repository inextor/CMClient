import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,} from '../../models/Modelos';
import { ServicioResponseItem,Respuesta, } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"



@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

	constructor(private rest:RestService,public alertController: AlertController,private router:Router,private route:ActivatedRoute) { }
	servicios:ServicioResponseItem[]= [];
	is_loading:boolean = false;
	ngOnInit() {
		this.is_loading = true;
		this.rest.searchServicio.getAll({}).subscribe((respuesta)=>
		{
			this.servicios = respuesta.datos;
			console.log(this.servicios)
		});
	}
}
