import { Component, OnInit } from '@angular/core';
import { Usuario,Tipo_Gasto,Gasto_Centro_Medico,Centro_Medico } from '../../models/Modelos';
import { BasePage } from '../base/base.page';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
	selector: 'app-agregar-gasto',
	templateUrl: './agregar-gasto.page.html',
	styleUrls: ['./agregar-gasto.page.scss'],
})


export class AgregarGastoPage extends BasePage implements OnInit {

	id_tipo_gasto:number = null;
	tiposGasto:Tipo_Gasto[]=[];
	id_gasto:number = null;

    gasto_centro_medico:Gasto_Centro_Medico = {
		id_tipo_gasto:0,
		id_centro_medico: 1, //XXX QUITAR Y PONER EL QUE HAY EN SESION
    };

	currentUser:Usuario;
	centros_medicos:Centro_Medico[] = [];


	ngOnInit()
	{
		this.currentUser = this.rest.getUsuarioSesion();

		this.gasto_centro_medico.id_usuario = this.currentUser.id;

		//this.rest.getCentrosMedicosPorOrganizacion( this.currentUser.id_organizacion )
		this.rest.centro_medico.getAll({ id_organizacion: this.currentUser.id_organizacion }).subscribe((respuesta)=>
		{
			this.centros_medicos = respuesta.datos;
		});

		this.route.paramMap.subscribe( params =>
		{
			this.id_gasto = params.get('id') == null ? null : parseInt( params.get('id') );


			this.rest.tipo_gasto.getAll({ id_organizacion:this.currentUser.id_organizacion}).subscribe((respTipoGasto)=>
			{
				this.tiposGasto = respTipoGasto.datos;

				if( this.id_gasto )
				{
					//this.rest.getGastoCentroMedico(this.id_gasto).subscribe((gasto)=>
					this.rest.gasto_centro_medico.get( this.id_gasto ).subscribe((gasto)=>
					{
						this.gasto_centro_medico =	gasto;
					}
					,(error)=>
					{
						let msg = this.rest.getErrorMessage( error );
						console.log( msg );
					});
				}
			});
		});
	}

	guardar()
	{
		console.log("Guardando");
		this.is_loading = true;

		if( this.id_tipo_gasto )
		{
			//this.rest.updateGastoCentroMedico( this.gasto_centro_medico ).subscribe((gasto_centro_medico)=>
			this.rest.gasto_centro_medico.update( this.gasto_centro_medico ).subscribe((gasto_centro_medico)=>
			{
				this.location.back();
			},(error)=>
			{
				this.showError( error );
			});
		}
		else
		{
			//this.rest.agregarGastoCentroMedico( this.gasto_centro_medico ).subscribe((gasto)=>
			this.rest.gasto_centro_medico.create(this.gasto_centro_medico).subscribe((gast)=>
			{
				this.location.back();
			});
		}
	}

}
