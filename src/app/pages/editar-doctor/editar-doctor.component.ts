import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor } from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-doctor',
  templateUrl: './editar-doctor.component.html',
  styleUrls: ['./editar-doctor.component.css']
})
export class EditarDoctorComponent extends BaseComponent implements OnInit {

	is_loading:boolean = false;
	usuario:Usuario = {
		contrasena: '',
		usuario: '',
	}
    doctor:Doctor = {


	};
	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

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
			},error=>this.showError(error));
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
			},error=>this.showError(error) );
		});
	}

	uploadImage(evt)
	{
		if( evt.target.files.length )
		{
			this.rest.uploadImage( evt.target.files[0], false ).subscribe((imageData)=>
			{
				this.usuario.id_imagen = imageData.id;
			},error=> this.showError( error ));
		}
	}

}
