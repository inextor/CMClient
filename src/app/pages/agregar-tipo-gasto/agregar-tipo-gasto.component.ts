import { Component, OnInit } from '@angular/core';
import { Usuario,Tipo_Gasto } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';



@Component({
	selector: 'app-agregar-tipo-gasto',
	  templateUrl: './agregar-tipo-gasto.component.html',
	styleUrls: ['./agregar-tipo-gasto.component.css']
})
export class AgregarTipoGastoComponent  extends BaseComponent implements OnInit {

	id_tipo_gasto = null;
	tipoGasto:Tipo_Gasto={

	};

	ngOnInit() {
		this.is_loading = true;
		let centro_medico = this.rest.getCurrentCentroMedico();
		this.tipoGasto.id_centro_medico = centro_medico.id;
		this.route.paramMap.subscribe( params =>
		{
			this.id_tipo_gasto = params.get('id') == null ? null : parseInt( params.get('id') );
			if( this.id_tipo_gasto )
			{
				//this.rest.getTipoGasto(this.id_tipo_gasto).subscribe((tipoGasto)=>
				this.rest.tipo_gasto.get(this.id_tipo_gasto).subscribe((tipoGasto)=>
				{
					this.is_loading = false;
					this.tipoGasto =  tipoGasto;
					this.is_loading = false;
				},error=>this.showError(error));
			}
		});
	}

	guardar()
	{
		this.is_loading = true;
		console.log("Guardando");
		if( this.id_tipo_gasto )
		{
			//this.rest.updateTipoGasto( this.tipoGasto ).subscribe(()=>
			this.rest.tipo_gasto.update( this.tipoGasto ).subscribe((tipo_gasto)=>
			{
				this.is_loading = false;
			},error=>this.showError(error));
		}
		else
		{
			this.is_loading= false;
			//this.rest.agregarTipoGasto( this.tipoGasto ).subscribe((tipo_gasto)=>
			this.rest.tipo_gasto.create( this.tipoGasto ).subscribe((tipo_gasto)=>
			{
				this.is_loading = false;
				this.location.back();
			},error=>this.showError(error));
		}
	}
}
