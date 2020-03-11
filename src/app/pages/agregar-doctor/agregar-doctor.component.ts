import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Doctor,Usuario,Especialidad, Centro_Medico } from '../../models/Modelos';
import { Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from  '@angular/common';
import { forkJoin } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { relativeTimeThreshold } from 'moment';

@Component({
	selector: 'app-agregar-doctor',
	templateUrl: './agregar-doctor.component.html',
	styleUrls: ['./agregar-doctor.component.css'],
})

export class AgregarDoctorComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}


	doctor:Doctor = {
		nombre:'',
		especialidad:'',
		telefono:'',
		id_especialidad:null,
		id_centro_medico:null,
		id_imagen:null,
		color_calendario:'',
		duracion_consulta:null
	}

	usuario:Usuario = {
		id_organizacion: 1,
		id_centro_medico:null,
		id_imagen: null,
		contrasena: '',
		correo_electronico:'',
		factura_rfc:'',
		factura_razon_social:'',
		factura_codigo_postal:'',
		factura_correo_electronico:'',
		tipo: 'DOCTOR'
	}


	especialidades:Especialidad[] = [];
	especialidad_dic:any={};
	centro_medico:Centro_Medico;


	ngOnInit() {

		let usuario = this.rest.getUsuarioSesion();
		this.centro_medico = this.rest.getCurrentCentroMedico();
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
				forkJoin([
					this.rest.usuario.get( id ), 
					this.rest.doctor.get( id ),
					this.rest.especialidad.getAll({},{limit:1000})
				]).subscribe((response)=>
				{
					this.is_loading = false;
					this.usuario = response[0];
					this.doctor = response[1];
					this.especialidades = response[2].datos;
					this.especialidades.forEach((i)=>{this.especialidad_dic[i.id]=i})
				},(error)=>
				{
					this.is_loading = false;
					this.showError( error );
				});
			}
			else
			{
				this.rest.especialidad.getAll({},{limit:1000}).subscribe((response)=>
				{
					this.especialidades = response.datos;
					this.especialidades.forEach((i)=>{this.especialidad_dic[i.id]=i})
				},error=>console.log(error));
				this.usuario={
					id_centro_medico: this.centro_medico.id,
					id_organizacion: this.centro_medico.id_organizacion,
					tipo: 'DOCTOR',
				}

				this.doctor={
					id_centro_medico: this.centro_medico.id
				}
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
			this.usuario.nombre = this.doctor.nombre;
			this.usuario.telefono = this.doctor.telefono;
			this.doctor.especialidad = this.especialidad_dic[this.doctor.id_especialidad].nombre;  
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
			this.usuario.nombre = this.doctor.nombre;
			this.usuario.telefono = this.doctor.telefono;
			this.doctor.especialidad = this.especialidad_dic[this.doctor.id_especialidad].nombre;  
			this.rest.agregarUsuarioDoctor(this.usuario,this.doctor).subscribe((doctor)=>
			{
				this.is_loading = false;
				this.router.navigate(['/doctores']);
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
