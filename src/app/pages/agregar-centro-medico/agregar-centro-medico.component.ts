import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router"
import { Centro_Medico } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from    '@angular/common';
import { Title } from '@angular/platform-browser';


@Component({
	selector: 'app-agregar-centro-medico',
	templateUrl: './agregar-centro-medico.component.html',
	styleUrls: ['./agregar-centro-medico.component.css'],
})
export class AgregarCentroMedicoComponent extends BaseComponent implements OnInit {

	is_loading:boolean  = false;

	centro_medico:Centro_Medico = {
		nombre: ''
	};

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	ngOnInit()
	{
		this.centro_medico = {
			id: null,
			nombre:''
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.centro_medico.get( id ).subscribe((centro_medico)=>
				{
					this.is_loading = false;
					this.centro_medico = centro_medico;
				});
			}
		});
	}

	guardar()
	{
		this.is_loading = true;

		if( this.centro_medico.id  )
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.centro_medico.update( this.centro_medico ).subscribe((centro_medico)=>{
				this.is_loading = false;
				this.router.navigate(['/centros-medicos']);

			});
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.centro_medico.create( this.centro_medico ).subscribe((centro_medico)=>{
				this.is_loading = false;
				this.router.navigate(['/centros-medicos']);
			});
		}
	}

	uploadImage(evt)
	{
		if( evt.target.files.length )
		{
			this.rest.uploadImage( evt.target.files[0], false ).subscribe((imageData)=>
			{
				this.centro_medico.id_imagen = imageData.id;
			});
		}
	}
	uploadImageTicket(evt)
	{
		if( evt.target.files.length )
		{
			this.rest.uploadImage( evt.target.files[0], false ).subscribe((imageData)=>
			{
				this.centro_medico.id_imagen_ticket = imageData.id;
			});
		}
	}
}
