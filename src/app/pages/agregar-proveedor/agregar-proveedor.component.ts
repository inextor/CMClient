import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router"
import { Proveedor } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent extends BaseComponent implements OnInit {

	proveedor:Proveedor = {
		nombre: ''
	};

  ngOnInit() {
    this.proveedor = {
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
				this.rest.proveedor.get( id ).subscribe((proveedor)=>
				{
					this.is_loading = false;
					this.proveedor = proveedor;
				},error=>this.showError(error));
			}
		});
	}

 	 guardar()
	{
		this.is_loading = true;

		if( this.proveedor.id  )
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.proveedor.update( this.proveedor ).subscribe((proveedor)=>{
				this.is_loading = false;
				this.router.navigate(['/proveedores']);
			},error=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.proveedor.create( this.proveedor ).subscribe((proveedor)=>{
				this.is_loading = false;
				this.router.navigate(['/proveedores']);
			},error=>this.showError(error) );
		}
	}
}
