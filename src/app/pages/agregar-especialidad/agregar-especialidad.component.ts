import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Especialidad } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-agregar-especialidad',
	templateUrl: './agregar-especialidad.component.html',
	styleUrls: ['./agregar-especialidad.component.css'],
})
export class AgregarEspecialidadComponent extends BaseComponent implements OnInit {
	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	
	is_loading:boolean	= false;

	especialidad:Especialidad = {
		nombre: '',
		abreviacion: ''
	};
	ngOnInit() {
		this.especialidad = {
			id: null,
			nombre:'',
			abreviacion:''
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.especialidad.get( id ).subscribe((especialidad)=>
				{
					this.is_loading = false;
					this.especialidad = especialidad;
				}, error=>this.showError(error));
			}
		});
	}

	agregar()
	{
		this.is_loading = true;

		if( this.especialidad.id)
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.especialidad.update( this.especialidad ).subscribe((especialidad)=>{
				this.is_loading = false;
				this.router.navigate(['/especialidades']);
			},error=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.especialidad.create( this.especialidad ).subscribe((especialidad)=>{
				this.is_loading = false;
				this.router.navigate(['/especialidades']);
			},error=>this.showError(error));
		
		}
	}
}
