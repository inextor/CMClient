import { Component, OnInit,Input,SimpleChanges,OnChanges } from '@angular/core';
import { RestService	} from '../../services/rest.service';
import { Precio_Servicio} from '../../models/Modelos';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Servicio,Pago,Cita} from '../../models/Modelos';
import { DatosVenta } from '../../services/rest.service';


interface Info_Precio
{
	[key:number]:Precio_Servicio[];
}


@Component({
	selector: 'app-punto-venta-consulta',
	templateUrl: './punto-venta-consulta.component.html',
	styleUrls: ['./punto-venta-consulta.component.css']
})

export class PuntoVentaConsultaComponent implements OnInit, OnChanges {

	constructor(public rest:RestService) { }

	search_loading:boolean	= false;
	is_loading:boolean		= false;
	busqueda:string = '';
	precios_info:Info_Precio	= {};

	infoPago			= {
		total_venta 	: 0
		,iva			: 0
		,subtotal		: 0
		,total_pagado	: 0
		,total_a_pagar	: 0
		,cambio			: 0
		,total_cantidades: 0
		,cantidad_faltante	: 0
	};

	pago:Pago = {
		efectivo	: 0.0
		,total		: 0.0
		,dolares	: 0.0
		,tarjeta	: 0.0
		,cheque		: 0.0
		,deposito	: 0.0
		,cambio		: 0.0
		,tipo_cambio_dolares : 0.0
	};

	@Input() datosVenta:DatosVenta = null;
	@Input() id_servicio_default:number = null;

	ngOnInit() {

	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log('Somethign change', changes );
		if( changes['datosVenta'] )
			this.calcularTotalVenta();

		if( changes['id_servicio_default'] )
		{
			console.log('Change id_servicio_default');

			if( this.id_servicio_default == null )
				return;

			this.rest.servicio.get( this.id_servicio_default ).subscribe((servicio)=>
			{
				this.agregarServicio( servicio )
			},(error)=>this.showError );
		}
	}

	search_servicios:Servicio[] = [];

	calcularTotalVenta()
	{
		if( this.datosVenta == null )
			return;

		let total		= 0;
		let subtotal	= 0;
		let iva			= 0;
		let centro_medico = this.rest.getCurrentCentroMedico();

		let prices = [];

		for(let i of this.datosVenta.detalles )
		{
			i.detalle_venta.precio		= i.precio_servicio.precio;
			i.detalle_venta.total		= i.precio_servicio.precio*i.detalle_venta.cantidad;
			i.detalle_venta.subtotal 	= i.detalle_venta.total/(1+(centro_medico.iva*0.01));
			i.detalle_venta.iva			= i.detalle_venta.total- i.detalle_venta.subtotal;

			total 		+= i.detalle_venta.total;
			subtotal	+= i.detalle_venta.subtotal;
			iva			+= i.detalle_venta.iva;
		}

		console.log('Precios', prices );

		this.datosVenta.venta.total		= total;
		this.datosVenta.venta.subtotal	= subtotal;
		this.datosVenta.venta.iva		= iva;

		let pagos_hechos		= this.datosVenta.pagos.reduce((a,b)=>{ return a+b.total},0);
		//this.datosVenta.venta.total = total;
		//this.datosVenta.venta.subtotal

		this.pago.tipo_cambio_dolares = this.datosVenta.centro_medico.tipo_cambio_dolares;

		this.infoPago.iva			= iva;
		this.infoPago.subtotal		= subtotal;
		this.infoPago.total_venta	= total;//this.datosVenta.detalles.reduce((a,b)=>{ return a+b.detalle_venta.total},0);
		this.infoPago.total_pagado	= pagos_hechos;
		this.infoPago.total_a_pagar	= total-pagos_hechos;
		this.infoPago.cambio		= 0 ;
		this.calcularCantidades();
	}

	calcularCantidades()
	{

		this.pago.total		= this.infoPago.total_a_pagar;
		this.pago.subtotal	= this.infoPago.subtotal;
		this.pago.iva		= this.infoPago.iva;

		this.pago.tipo_cambio_dolares	= this.datosVenta.centro_medico.tipo_cambio_dolares;

		this.infoPago.total_cantidades = this.pago.efectivo
				+(this.pago.dolares*this.pago.tipo_cambio_dolares)
				+this.pago.tarjeta
				+this.pago.cheque
				+this.pago.deposito;

		this.pago.cambio		= this.infoPago.total_cantidades - this.pago.total > 0 ? this.infoPago.total_cantidades - this.pago.total : 0;
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
		},(error)=> this.showError( this.rest.getErrorMessage(error) ));
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
				if(	servicio.id in this.precios_info)
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
		if( sd.detalle_venta.cantidad	<= 1 )
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
	showError(error:string)
	{
		this.rest.showError({ mensaje: error , tipo:'alert-danger' })
	}
}
