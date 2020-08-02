import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute,ParamMap} from "@angular/router"
import { HttpErrorResponse } from '@angular/common/http';
import { Paciente,Usuario } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-agregar-familiar',
	templateUrl: './agregar-familiar.component.html',
	styleUrls: ['./agregar-familiar.component.css'],
})
export class AgregarFamiliarComponent extends BaseComponent implements OnInit {

	is_loading:boolean = false;

	usuario:Usuario = {
		usuario: 'Usuario '+Date.now(),
		tipo:'PACIENTE'
	}

	paciente:Paciente = {
		nombre:'',
		apellidos:'',
		familiar:1,
		id_organizacion:null,
		fecha_nacimiento: '',
		telefono: ''
	};

	ngOnInit() {
		this.route.paramMap.subscribe( params =>
			{
				let centro_medico = this.rest.getCurrentCentroMedico();
				this.paciente.id_organizacion = centro_medico.id_organizacion;
				this.paciente.familiar = 1 ;
				let id = params.get('id') ==null ? null : parseInt(params.get('id') );
				if( id != null )
				{
					this.is_loading = true;
					//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
					this.rest.paciente.get( id ).subscribe((paciente)=>
					{
						this.is_loading = false;
						this.paciente = paciente;
					}, error=>this.showError(error));
				}
				let id_usuario = params.get('id_usuario') ==null ? null : parseInt(params.get('id_usuario') );
				if(id_usuario!=null){
					this.paciente.id_usuario = id_usuario;
				}
			});
	}

	guardarPaciente()
	{
		this.is_loading = true;

		if( this.paciente.id )
		{
			//this.rest.updatePaciente(this.paciente ).subscribe((paciente)=>
			this.rest.paciente.update( this.paciente ).subscribe((paciente)=>
			{
				this.is_loading = false;
				this.router.navigate(['/dashboard']);
			},error=>this.showError(error));

		}
		else
		{
			//this.rest.agregarPaciente(this.paciente ).subscribe((paciente)=>
			this.rest.paciente.create( this.paciente ).subscribe((paciente)=>
			{
				this.is_loading = false;
				this.router.navigate(['/dashboard']);
			},error=>this.showError(error));
		}
	}

	uploadImage(evt)
	{
		if( evt.target.files.length )
		{
			this.rest.uploadImage( evt.target.files[0], false ).subscribe((imageData)=>
			{
				this.usuario.id_imagen = imageData.id;
			},error=>this.showError(error));
		}
	}
}
