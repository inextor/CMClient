import { Component, OnInit } from '@angular/core';
import { Location } from	'@angular/common';
import { BaseComponent } from '../base/base.component';
import { Inventario, Servicio,Centro_Medico } from '../../models/Modelos';
import { SearchObject } from '../../models/Respuestas';
import { forkJoin } from 'rxjs';


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
	centros_medicos:Centro_Medico[] = [];
	searchServicio:SearchObject<Servicio> = {
		lk: { nombre: '' }
		,eq:{}
		,csv:{}
	};
	search_inventario:SearchObject<Inventario> = {
		eq : { id_centro_medico: null },
		csv: {}
	};

	ngOnInit()
	{
		this.is_loading = true;
		console.log("HERE");

		this.route.queryParams.subscribe((params)=>
		{
			this.search_inventario.eq.id_centro_medico = 'id_centro_medico' in params ? params.id_centro_medico : this.rest.getCurrentCentroMedico();

			this.searchServicio.eq.tipo		= 'PRODUCTO_FISICO';
			this.searchServicio.lk.nombre	= 'nombre' in params ? params.nombre : '';
			this.searchServicio.pagina		= 'pagina' in params ? params.pagina : 0;
			let usuario = this.rest.getUsuarioSesion();
			forkJoin([
				this.rest.servicio.search( this.searchServicio ),
				this.rest.centro_medico.search({eq:{ id_organizacion: usuario.id_organizacion }}),
			]).subscribe((respuestas)=>
			{
				let respuestaServicios  =respuestas[0];
				this.centros_medicos = respuestas[1].datos;

				let servicios_ids		= respuestaServicios.datos.map( i=> i.id );
				this.search_inventario.csv['id_servicios'] = servicios_ids;

				this.rest.inventario.search( this.search_inventario ).subscribe((respuestaInventario)=>
				{
					console.log("HERE4");
					this.is_loading = false;
					let objInventario:InventarioKeys= {};
					this.inventarioServicios = [];

					respuestaInventario.datos.forEach((i)=>{ objInventario[ i.id_servicio ] = i});
					respuestaServicios.datos.forEach((servicio)=>
					{
						let inventario = servicio.id in objInventario ? objInventario[ servicio.id ]: { id_servicio: servicio.id, id_centro_medico: this.search_inventario.eq.id_centro_medico, cantidad: 0  };
						this.inventarioServicios.push({ servicio, inventario });
					});

					console.log('Invetnario servicios', this.inventarioServicios );

					this.setPages( this.searchServicio.pagina , respuestaServicios.total );
				},(error)=>this.showError(error));
			},(error)=>this.showError( error ));
		},(error)=>this.showError( error ));
	}

	buscar()
	{
		//this.router.navigate(['/citas'],{queryParams: this.getParams()});

		let queryParams = {
			id_centro_medico	: this.search_inventario.eq.id_centro_medico
			,pagina				: this.searchServicio.pagina
			,nombre				: this.searchServicio.lk.nombre
		};

		console.log('Buscar', queryParams );

		this.router.navigate(['/inventario'], { queryParams });
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

