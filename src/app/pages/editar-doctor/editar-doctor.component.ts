import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor } from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { Location } from  '@angular/common';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-editar-doctor',
  templateUrl: './editar-doctor.component.html',
  styleUrls: ['./editar-doctor.component.css']
})
export class EditarDoctorComponent implements OnInit {

	constructor(private rest:RestService,
		public alertController: AlertController,
		private router:Router,
		private route:ActivatedRoute,
		private location: Location
	) {

	}

	is_loading:boolean = false;
	usuario:Usuario = {
		contrasena: '',
		usuario: '',
	}
    doctor:Doctor = {


	};

	ngOnInit()
	{
		this.is_loading = true;

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );

			forkJoin([this.rest.usuario.get( id ), this.rest.doctor.get( id )] ).subscribe((response)=>
			{
				this.is_loading = false;
				this.usuario = response[0];
				this.doctor = response[1];
			},(error)=>
			{
				this.is_loading = false;
				console.error('Ocurrio un error',this.rest.getErrorMessage( error ));
			});
		});
	}

	guardar()
	{
		this.is_loading = true;

		///this.rest.actualizarDoctor( this.doctor ).subscribe((doctor)=>
		this.rest.doctor.update( this.doctor ).subscribe((doctor)=>
		{
			this.doctor = doctor;
			//this.rest.actualizarUsuario( this.usuario ).subscribe( usuario=>
			this.rest.usuario.update( this.usuario ).subscribe( usuario=>
			{
				this.is_loading = false;
				this.location.back();
			}
			,(error)=>{
				this.is_loading = false;
			});
		});
	}

	uploadImage(evt)
	{
		if( evt.target.files.length )
		{
			this.rest.uploadImage( evt.target.files[0], false ).subscribe((imageData)=>
			{
				this.usuario.id_imagen = imageData.id;
			});
		}
	}

}
