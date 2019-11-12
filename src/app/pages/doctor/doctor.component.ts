import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor } from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { Horario_Doctor,Cita } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent extends BaseComponent implements OnInit {



	doctor:Doctor		= null;
	is_loading:boolean	= false;
	horario_doctor:Horario_Doctor[] = [];
	citas:Cita[] = [];

	ngOnInit()
	{
		this.is_loading = true;
		this.route.paramMap.subscribe( params =>
		{
			let id_usuario = params.get('id_usuario') ==null ? null : parseInt(params.get('id_usuario') );

			//this.rest.getDoctor( id_usuario )subscribe((doctor)=>
			this.rest.doctor.get( id_usuario ).subscribe((doctor)=>
			{
				this.doctor = doctor;
				this.is_loading = false;
			},
			(error)=>
			{
				this.showError( this.rest.getErrorMessage( error ) );
				this.is_loading = false;
			});

			let date = new Date();

			//Fix this
			//this.rest.getCitas( id_usuario,null,null ).subscribe((respuesta)=>
			//Posiblemente es esta las solucion
			this.rest.cita.getAll({ id_doctor: id_usuario }).subscribe((respuesta)=>
			{
				this.citas = respuesta.datos;
			});
		});
	}
}
