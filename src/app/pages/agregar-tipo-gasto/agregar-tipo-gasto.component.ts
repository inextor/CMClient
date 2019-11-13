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
		this.route.paramMap.subscribe( params =>
		{
			this.id_tipo_gasto = params.get('id') == null ? null : parseInt( params.get('id') );
			if( this.id_tipo_gasto )
			{
				//this.rest.getTipoGasto(this.id_tipo_gasto).subscribe((tipoGasto)=>
				this.rest.tipo_gasto.get(this.id_tipo_gasto).subscribe((tipoGasto)=>
				{
					this.tipoGasto =  tipoGasto;
				}
				,(error)=>
				{
					let msg = this.rest.getErrorMessage( error );
					console.log( msg );
				});
			}
		});
	}

	guardar()
	{
		console.log("Guardando");
		if( this.id_tipo_gasto )
		{
			//this.rest.updateTipoGasto( this.tipoGasto ).subscribe(()=>
			this.rest.tipo_gasto.update( this.tipoGasto ).subscribe((tipo_gasto)=>
			{

			},(error)=>
			{
				this.showError( error );
			});
		}
		else
		{
			//this.rest.agregarTipoGasto( this.tipoGasto ).subscribe((tipo_gasto)=>
			this.rest.tipo_gasto.create( this.tipoGasto ).subscribe((tipo_gasto)=>
			{
				this.location.back();
			});
		}
	}
}
