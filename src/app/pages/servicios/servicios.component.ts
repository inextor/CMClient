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

	constructor(private rest:RestService,private router:Router,private route:ActivatedRoute) { }
	servicios:ServicioResponseItem[]= [];
	is_loading:boolean = false;
	ngOnInit() {
		this.is_loading = true;
		this.rest.searchServicio.getAll({}).subscribe((respuesta)=>
		{
			this.servicios = respuesta.datos;
			console.log(this.servicios)
		}, (error) => {
			console.log("QUE PASO");
			this.showError(this.rest.getErrorMessage(error));
			this.is_loading = false;
		});
	}

	async showError(message: string) {

		/*
		const alert = await this.alertController.create({
			header: 'Error',
			//subHeader: 'Subtitle',
			message: message,
			buttons: ['OK']
		});

		await alert.present();
		this.is_loading = false;
		*/
	}
}
