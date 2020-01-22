import { Component, OnInit } from '@angular/core';
import { Usuario,Tipo_Gasto,Gasto_Centro_Medico,Centro_Medico } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
	selector: 'app-agregar-gasto',
	templateUrl: './agregar-gasto.component.html',
	styleUrls: ['./agregar-gasto.component.css'],
})


export class AgregarGastoComponent extends BaseComponent implements OnInit {

	id_tipo_gasto:number = null;
	tiposGasto:Tipo_Gasto[]=[];
	id_gasto:number = null;

    gasto_centro_medico:Gasto_Centro_Medico = {
		id_tipo_gasto:null,
		id_centro_medico: null, //XXX QUITAR Y PONER EL QUE HAY EN SESION
    };

	currentUser:Usuario;
	centros_medicos:Centro_Medico[] = [];


	ngOnInit()
	{
		this.currentUser = this.rest.getUsuarioSesion();

		this.gasto_centro_medico.id_usuario = this.currentUser.id;

		this.rest.centro_medico.getAll({ id_organizacion: this.currentUser.id_organizacion }).subscribe((respuesta)=>
		{
			this.is_loading = false;
			this.centros_medicos = respuesta.datos;
		}
		,(error)=> this.showError( error ));

		this.route.paramMap.subscribe( params =>
		{
			this.id_gasto = params.get('id') == null ? null : parseInt( params.get('id') );


			this.rest.tipo_gasto.getAll({ id_organizacion:this.currentUser.id_organizacion}).subscribe((respTipoGasto)=>
			{
				this.tiposGasto = respTipoGasto.datos;
				if( this.id_gasto )
				{
					this.rest.gasto_centro_medico.get( this.id_gasto ).subscribe((gasto)=>
					{
						this.is_loading = false;
						this.gasto_centro_medico =	gasto;
					}
					,error=>this.showError(error));
				}
			},error=>this.showError(error));
		});
	}

	guardar():void
	{
		console.log("Guardando");
		this.is_loading = true;

		if( this.id_tipo_gasto )
		{
			this.rest.gasto_centro_medico.update( this.gasto_centro_medico ).subscribe((gasto_centro_medico)=>
			{
				this.is_loading = false;
				this.location.back();
			},error=>this.showError(error));
		}
		else
		{
			this.rest.gasto_centro_medico.create(this.gasto_centro_medico).subscribe((gast)=>
			{
				this.is_loading = false;
				this.location.back();
			},error=>{this.showError(error);});
		}
	}
}
