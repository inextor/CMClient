import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Especialidad, Unidad_Medida } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-agregar-unidad-medida',
  templateUrl: './agregar-unidad-medida.component.html',
  styleUrls: ['./agregar-unidad-medida.component.css']
})
export class AgregarUnidadMedidaComponent extends BaseComponent implements OnInit {

  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

  is_loading:boolean	= false;

	unidad_medida:Unidad_Medida = {
    nombre: '',
    codigo:'',
    tipo: '',
    
	};

  ngOnInit() {
    this.unidad_medida = {
			id: null,
      nombre:'',
      codigo:'',
			tipo:''
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.unidad_medida.get( id ).subscribe((unidad_medida)=>
				{
					this.is_loading = false;
					this.unidad_medida = unidad_medida;
				}, error=>this.showError(error));
			}
		});
  }

  agregar()
	{
		this.is_loading = true;

		if( this.unidad_medida.id)
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.unidad_medida.update( this.unidad_medida ).subscribe((unidad_medida)=>{
				this.is_loading = false;
				this.router.navigate(['/unidades-medida']);
			},error=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.unidad_medida.create( this.unidad_medida ).subscribe((unidad_medida)=>{
				this.is_loading = false;
				this.router.navigate(['/unidades-medida']);
			},error=>this.showError(error));
		
		}
	}
}
