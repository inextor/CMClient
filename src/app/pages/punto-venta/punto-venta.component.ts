import { Component, OnInit } from '@angular/core';
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
import { BaseComponent } from '../base/base.component';
import { DatosVenta } from '../../services/rest.service';


interface OldSearch{
	[key:string]:Servicio[];
}



interface Info_Precio
{
	[key:number]:Precio_Servicio[];
}

interface InfoPago
{
	cambio				: number;
	total_venta			: number;
	total_pagado		: number;
	total_a_pagar		: number;
	total_cantidades	: number;
}

@Component({
	selector: 'app-punto-venta',
	templateUrl: './punto-venta.component.html',
	styleUrls: ['./punto-venta.component.css']
})

export class PuntoVentaComponent extends	BaseComponent implements OnInit {

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title)
	{
		super( rest,router,route,location,titleService);
	}

	busqueda:string				= '';
	tipo_precios:Tipo_Precio[]	= [];
	ventas:Venta[]				= [];

	datosVenta:DatosVenta		= {
		venta			: {
			id_centro_medico 	: null
			,id_usuario_atendio	: null
			,iva				: 0
			,total				: 0
		}
		,centro_medico	: {}
		,detalles		: []
		,cliente		: {}
		,atendio		: {}
		,pagos			: []
		,tipo_precio	: {}
	};

	search_servicios:Servicio[]	= [];
	total						= 0;
	show_modal_pago				= false;
	show_name_input				= false;
	precios_info:Info_Precio	= {};
	procesando_pago		:boolean	= false;
	show_creando_venta	:boolean 	= false;
	feria						= 0;

	infoPago:InfoPago			= {
		total_venta 	: 0
		,total_pagado	: 0
		,total_a_pagar	: 0
		,cambio			: 0
		,total_cantidades: 0

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

	ngOnInit()
	{
		let centro_medico = this.rest.getCurrentCentroMedico();
		this.route.paramMap.subscribe( params =>
		{
			let id =  params.get('id') ? parseInt( params.get('id' ) ): null;
			let usuario = this.rest.getUsuarioSesion();

			let subscription = id
					? forkJoin
					([
						this.rest.tipo_precio.getAll({ id_organizacion: usuario.id_organizacion })
						,this.rest.getDatosVenta(id)
						,this.rest.venta.search({eq:{id_usuario_atendio:usuario.id, estatus: 'PENDIENTE'},limite:200})
					])
					: forkJoin
					([
						this.rest.tipo_precio.getAll({ id_organizacion: usuario.id_organizacion })
						,of(null)
						,this.rest.venta.search({eq:{id_usuario_atendio:usuario.id, estatus: 'PENDIENTE' } })
					]);

			subscription.subscribe((response)=>
			{
				this.tipo_precios		= response[0].datos;
				if( response[1] == null )
				{
					//Venta Nueva
					this.datosVenta					= this.getNewVenta( this.tipo_precios );
					console.log("datosVenta Nuevo",this.datosVenta );
					this.datosVenta.tipo_precio		= this.tipo_precios[0];
					this.datosVenta.venta.id_tipo_precio =this.tipo_precios[0].id;
				}
				else
				{
					//Venta existente
					let response_precios	= response[0];
					this.datosVenta			= response[1];
					//this.changeTipoCliente( response[1].datosVenta.id_tipo_precio );
				}

				this.ventas = response[2].datos;
			}
			,(error)=>
			{
				this.showError( error );
			});
		});
	}

	changeTipoCliente(value)
	{
		let some = this.tipo_precios.some
		(
			i =>{
				return i.nombre == this.datosVenta.venta.cliente
			}
		);

		if( this.datosVenta.venta.cliente == '' || some )
		{
			let find = this.tipo_precios.find(i=>i.id == value );
			if( find )
				this.datosVenta.venta.cliente = find.nombre;
		}
		//Cambiar todos los precios
	}

	ngOnDestroy()
	{
		if( this.datosVenta.detalles.length > 0 )
		{
			this.rest.guardarDatosVenta(this.datosVenta).subscribe(()=>
			{
				console.log('Saved');
			},(error)=>
			{
				console.log('Lost it??',error);
				//se guardo o se perdio, in the end it does'nt even matter
			});
		}
	}

	buscar(evt:any)
	{
		let x = this.rest.servicio.search({
			lk:{ nombre: evt.target.value },
			// eq:{tipo:'PRODUCTO_FISICO'}
		}).subscribe((response)=>
		{
			this.search_servicios = response.datos;
			x.unsubscribe();
		},(error)=>this.showError(error));
	}

	guardarVenta()
	{
		this.rest.guardarDatosVenta( this.datosVenta ).subscribe((datosVenta)=>
		{
			this.datosVenta = datosVenta;
			this.show_modal_pago = true;
		},(error)=>
		{
			this.showError( error );
		});
	}

	agregarServicio(servicio:Servicio)
	{
		let detalle_servicio = this.datosVenta.detalles.find(i=>i.servicio.id == servicio.id );

		if( detalle_servicio )
		{
			detalle_servicio.detalle_venta.cantidad++;
			return;
		}

		let precio_servicio = null;

		of(true).pipe
		(
			flatMap((x)=>
			{
				if(  servicio.id in this.precios_info)
				{
					console.log("HERE IN CHECK IN");
					return of({total: this.precios_info[ servicio.id ].length, datos: this.precios_info[ servicio.id ]});
				}
				//Else
				console.log("HERE IN CHECK WS");
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
			if( response.datos.length == 0 )
			{
				this.showError('El producto "'+servicio.nombre+'" no tiene asignado un precio 1');
				return;
			}


			if( !(servicio.id in this.precios_info ) )
			{
				this.precios_info[ servicio.id ] = response.datos;
			}

			let precio_servicio = this.precios_info[ servicio.id ].find((p) =>p.id_tipo_precio == this.datosVenta.venta.id_tipo_precio );

			if( !precio_servicio )
			{
				this.showError('El producto "'+servicio.nombre+'" no tiene asignado un precio 2');
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
		},(error)=>
		{
			console.log('Solo imprimimos el error en la consola');
		});
	}

	pagarVenta()
	{
		this.rest.pago.create(this.pago).subscribe((response)=>
		{
			this.is_loading = false;
		}
		,(error)=>
		{
			this.is_loading = false;
			this.showError(error);
		});
	}

	aumentar(detalle_servicio)
	{
		detalle_servicio.detalle_venta.cantidad++;
	}

	calcularTotalVenta()
	{
		let total				= this.datosVenta.detalles.reduce((a,b)=>{ return a+b.detalle_venta.total},0);
		let pagos_hechos		= this.datosVenta.pagos.reduce((a,b)=>{ return a+b.total},0);

		this.pago.tipo_cambio_dolares = this.datosVenta.centro_medico.tipo_cambio_dolares;

		this.infoPago.total_venta	= this.datosVenta.detalles.reduce((a,b)=>{ return a+b.detalle_venta.total},0);
		this.infoPago.total_pagado	= pagos_hechos;
		this.infoPago.total_a_pagar	= total-pagos_hechos;
		this.infoPago.cambio		= 0 ;
		this.calcularCantidades();
	}

	calcularCantidades()
	{
		this.pago.total = this.infoPago.total_a_pagar;
		this.pago.tipo_cambio_dolares	= this.datosVenta.centro_medico.tipo_cambio_dolares;

		this.infoPago.total_cantidades = this.pago.efectivo
				+(this.pago.dolares*this.pago.tipo_cambio_dolares)
				+this.pago.tarjeta
				+this.pago.cheque
				+this.pago.deposito;

		this.pago.cambio		= this.infoPago.total_cantidades - this.pago.total > 0 ? this.infoPago.total_cantidades - this.pago.total : 0;
	}

	getNewVenta(tipo_precios):DatosVenta
	{
		let centro_medico:Centro_Medico	= this.rest.getCurrentCentroMedico();
		let usuario:Usuario				= this.rest.getUsuarioSesion();

		return {
				venta			: {
					id_centro_medico 	: centro_medico.id
					,id_usuario_atendio	: usuario.id
					,iva				: centro_medico.iva
					,total				: 0
					,cliente			: tipo_precios[0].nombre
					,id_tipo_precio		: tipo_precios[0].id
				}
				,centro_medico
				,detalles		: []
				,cliente		: null
				,atendio		: this.rest.getUsuarioSesion()
				,pagos			: []
				,tipo_precio	: tipo_precios[0]
		}
	}
	cambiarVenta(id)
	{
		this.router.navigate(['punto-venta',id]);
	}
}
