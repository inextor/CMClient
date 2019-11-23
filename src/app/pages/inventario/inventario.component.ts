import { Component, OnInit } from '@angular/core';
import { Location } from	'@angular/common';
import { BaseComponent } from '../base/base.component';
import { Inventario, Servicio } from '../../models/Modelos';
import { SearchObject } from '../../models/Respuestas';


interface InventarioKeys{
	[key:number] : Inventario
}

interface InventarioServicio
{
	servicio:Servicio;
	inventario:Inventario;
}





@Component({
	selector: 'app-inventario',
	templateUrl: './inventario.component.html',
	styleUrls: ['./inventario.component.css']
})

export class InventarioComponent extends BaseComponent implements OnInit {

	inventarioServicios:InventarioServicio[] = [];

	ngOnInit()
	{
		this.is_loading = true;
		console.log("HERE");

		this.route.queryParams.subscribe((params)=>
		{
			let search_inventario:SearchObject<Inventario>= {
				eq:{
					id_centro_medico : 'id_centro_medico' in params ? params.id_centro_medico : this.rest.getCurrentCentroMedico()
				}
			};

			console.log("HERE2");
			this.currentPage = 'pagina' in params ? params.pagina : 0;


			this.rest.servicio.search
			({
				eq:{tipo:'PRODUCTO_FISICO'}
				,pagina: this.currentPage
			}).subscribe((respuestaServicios)=>
			{
				console.log("HERE3");
				let servicios_ids		= respuestaServicios.datos.map( i=> i.id );
				search_inventario.ids	= servicios_ids;

				this.rest.inventario.search( search_inventario ).subscribe((respuestaInventario)=>
				{
					console.log("HERE4");
					this.is_loading = false;
					let objInventario:InventarioKeys= {};

					respuestaInventario.datos.forEach((i)=>{ objInventario[ i.id_servicio ] = i});
					respuestaServicios.datos.forEach((servicio)=>
					{
						let inventario = servicio.id in objInventario ? objInventario[ servicio.id ]: { id_servicio: servicio.id, id_centro_medico: search_inventario.eq.id_centro_medico, cantidad: 0  };
						this.inventarioServicios.push({ servicio, inventario });
					});

					console.log('Invetnario servicios', this.inventarioServicios );

					this.setPages( this.currentPage, respuestaServicios.total );
				},(error)=>this.showError(error));
			},(error)=>this.showError( error ));
		},(error)=>this.showError( error ));
	}

	guardar()
	{
		let inventario = this.inventarioServicios.map(i=>i.inventario);
		console.log( 'inventario',inventario );
		this.rest.inventario.batchUpdate( inventario ).subscribe(()=>
		{
			this.showError("Se guardo con exito");
		},error=>this.showError(error));
	}
}

