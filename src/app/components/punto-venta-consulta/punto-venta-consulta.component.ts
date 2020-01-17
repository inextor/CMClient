import { Component, OnInit,Input } from '@angular/core';
import { RestService,DetalleServicio  } from '../../services/rest.service';
import { Usuario,Tipo_Precio,Precio_Servicio} from '../../models/Modelos';
import { Router,ActivatedRoute,Params} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { forkJoin,of } from 'rxjs';
import { mergeMap,catchError,flatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Servicio,Pago,Centro_Medico} from '../../models/Modelos';
import { Detalle_Venta,Venta} from '../../models/Modelos';
import { DatosVenta } from '../../services/rest.service';



@Component({
	selector: 'app-punto-venta-consulta',
	templateUrl: './punto-venta-consulta.component.html',
	styleUrls: ['./punto-venta-consulta.component.css']
})
export class PuntoVentaConsultaComponent implements OnInit {

	constructor(public rest:RestService) { }

	search_loading:boolean	= false;
	is_loading:boolean		= false;
	busqueda:string = '';
	precios_info:Info_Precio	= {};


	@Input() datosVenta:DatosVenta = null;

	ngOnInit() {

	}

	search_servicios:Servicio[] = [];

	calcularTotalVenta()
	{

	}

	buscar(evt:any)
	{
		this.search_loading = true;
		let x = this.rest.servicio.search({
			lk:{ nombre: evt.target.value },
			// eq:{tipo:'PRODUCTO_FISICO'}
		}).subscribe((response)=>
		{
			this.search_loading = false;
			this.search_servicios = response.datos;
			x.unsubscribe();
		},(error)=> this.rest.showError({ mensaje: this.rest.getErrorMessage(error) , tipo:'alert-danger' }));
	}

	agregarServicio(servicio:Servicio)
	{
		let detalle_servicio = this.datosVenta.detalles.find(i=>i.servicio.id == servicio.id );

		if( detalle_servicio )
		{
			detalle_servicio.detalle_venta.cantidad++;
			this.search_servicios = [];
			this.busqueda	= '';
			this.calcularTotalVenta();
			this.focusBusqueda();
			return;
		}

		let precio_servicio = null;


		this.is_loading = true;
		of(true).pipe
		(
			flatMap((x)=>
			{
				if(  servicio.id in this.precios_info)
				{
					return of({total: this.precios_info[ servicio.id ].length, datos: this.precios_info[ servicio.id ]});
				}
				//Else
				let centro_medico = this.rest.getCurrentCentroMedico();
				return this.rest.precio_servicio.search
				({
					eq:
					{
						id_servicio			: servicio.id
						,id_centro_medico	: centro_medico.id
					}
				})
			})
		)
		.subscribe((response)=>
		{
			this.is_loading = false;
			if( response.datos.length == 0 )
			{
				this.busqueda = '';
				this.search_servicios = [];
				this.showError('El producto "'+servicio.nombre+'" no tiene asignado un precio 1');
				this.calcularTotalVenta();
				this.focusBusqueda();
				return;
			}


			if( !(servicio.id in this.precios_info ) )
			{
				this.precios_info[ servicio.id ] = response.datos;
			}

			let precio_servicio = this.precios_info[ servicio.id ].find((p) =>p.id_tipo_precio == this.datosVenta.venta.id_tipo_precio );

			if( !precio_servicio )
			{
				this.busqueda = '';
				this.search_servicios = [];
				this.showError('El producto "'+servicio.nombre+'" no tiene asignado un precio 2');
				this.calcularTotalVenta();
				this.focusBusqueda();
				return;
			}

			this.datosVenta.detalles.push({
				servicio
				,precio_servicio
				,detalle_venta:
				{
					id_servicio	: servicio.id
					,cantidad	: 1
				}
			});

			this.busqueda = '';
			this.search_servicios = [];
			this.calcularTotalVenta();
			this.focusBusqueda();
		},(error)=>
		{
			console.log('Solo imprimimos el error en la consola');
		});
	}

	focusBusqueda()
	{
		let x = <HTMLInputElement>document.getElementById('busqueda');
		x.focus();
	}

	disminuir(sd)
	{
		console.log('Disminuir');
		if( sd.detalle_venta.cantidad  <= 1 )
		{
			console.log("try to remove");
			let index = this.datosVenta.detalles.findIndex(i=>i.servicio.id == sd.servicio.id );
			if( index > -1 )
				this.datosVenta.detalles.splice(index,1);
			else
				console.log("No se envio");

			this.calcularTotalVenta();
			return;
		}
		else
		{
			console.log('cantidad >= 2 ');
		}

		sd.detalle_venta.cantidad--;
		this.calcularTotalVenta();
	}
	aumentar(sd)
	{
		sd.detalle_venta.cantidad++;
		this.calcularTotalVenta();
	}

	eliminar(sd)
	{
		let index = this.datosVenta.detalles.findIndex(i=>i.servicio.id == sd.servicio.id );
		if( index > -1 )
			this.datosVenta.detalles.splice(index,1);
		else
			console.log("No se envio");

		this.calcularTotalVenta();
	}
}
