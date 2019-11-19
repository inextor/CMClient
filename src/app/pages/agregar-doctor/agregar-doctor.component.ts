import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Doctor,Usuario,Especialidad } from '../../models/Modelos';
import { Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from  '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-agregar-doctor',
	templateUrl: './agregar-doctor.component.html',
	styleUrls: ['./agregar-doctor.component.css'],
})

export class AgregarDoctorComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location)
	{
		super( rest,router,route,location);
    }


	doctor:Doctor = {
		'nombre':'',
		'especialidad':'',
		'telefono':''
	};

	usuario:Usuario = {
		'usuario':'',
		'contrasena':'',
		'tipo':'DOCTOR',
		'id_imagen': null
	};


	especialidades:Especialidad[] = [];

	ngOnInit() {

		let usuario = this.rest.getUsuarioSesion();
		this.is_loading = false;
		if( usuario !== null )
		{
			this.usuario.id_organizacion = usuario.id_organizacion;
		}

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );

			if( id )
			{
				forkJoin([this.rest.usuario.get( id ), this.rest.doctor.get( id ),this.rest.especialidad.getAll({},{limit:200})] ).subscribe((response)=>
				{
					this.is_loading = false;
					this.usuario = response[0];
					this.doctor = response[1];
					this.especialidades = response[2].datos;
				},(error)=>
				{
					this.is_loading = false;
					this.showError( error );
				});
			}
			else
			{
				this.doctor = {
					'nombre':'',
					'especialidad':'',
					'telefono':''
				};

				this.usuario = {
					'usuario':'',
					'contrasena':'',
					'tipo':'DOCTOR',
					'id_imagen': null
				};
			}
		});
	}

	agregar()
	{
		this.is_loading = true;
		if( this.usuario.id )
		{
			this.is_loading = true;
			console.log("Actualizando A",this.doctor);
			this.rest.doctor.update( this.doctor ).subscribe((doctor)=>
			{
				this.doctor = doctor;
				//this.rest.actualizarUsuario( this.usuario ).subscribe( usuario=>
				this.rest.usuario.update( this.usuario ).subscribe( usuario=>
				{
					this.is_loading = false;
					this.location.back();
				}
				,error=>this.showError(error));
			},error=>this.showError(error));
		}
		else
		{
			this.is_loading = true;
			this.rest.agregarUsuarioDoctor(this.usuario,this.doctor).subscribe((doctor)=>
			{
				this.is_loading = false;
				this.router.navigate(['/home']);
			},error=>this.showError(error) );
		}
	}

	uploadImage(evt)
	{
		if( evt.target.files.length )
		{
			this.rest.uploadImage( evt.target.files[0], false ).subscribe((imageData)=>
			{
				this.usuario.id_imagen = imageData.id;
			},error=>this.showError(error) );
		}
	}
}
