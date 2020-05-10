import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Especialidad, Categoria_Merma } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-agregar-categoria-merma',
  templateUrl: './agregar-categoria-merma.component.html',
  styleUrls: ['./agregar-categoria-merma.component.css']
})
export class AgregarCategoriaMermaComponent extends BaseComponent implements OnInit {
  is_loading:boolean	= false;

	categoria_merma:Categoria_Merma = {
		nombre: '',
		descripcion: ''
	};

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	ngOnInit() {
		this.categoria_merma = {
			id: null,
			nombre:'',
			descripcion:''
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.categoria_merma.get( id ).subscribe((categoria_merma)=>
				{
					this.is_loading = false;
					this.categoria_merma = categoria_merma;
				}, error=>this.showError(error));
			}
		});
	}

	agregar()
	{
		this.is_loading = true;

		if( this.categoria_merma.id)
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.categoria_merma.update( this.categoria_merma ).subscribe((categoria_merma)=>{
				this.is_loading = false;
				this.router.navigate(['/categorias-merma']);
			},error=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.categoria_merma.create( this.categoria_merma ).subscribe((categoria_merma)=>{
				this.is_loading = false;
				this.router.navigate(['/categorias-merma']);
			},error=>this.showError(error));
		
		}
	}
}
