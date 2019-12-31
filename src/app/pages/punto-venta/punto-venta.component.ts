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
	iva					: number;
	subtotal			: number;
	total_venta			: number;
	total_pagado		: number;
	total_a_pagar		: number;
	total_cantidades	: number;
	cantidad_faltante	: number;
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
	search_loading:boolean		= false;
	debug:boolean				= true;
	facturar:boolean			= false;

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

	search_usuario:Usuario[]	= [];
	search_rfc	:Usuario[] = [];
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

	ngOnInit()
	{
		let centro_medico = this.rest.getCurrentCentroMedico();

		this.route.paramMap.subscribe( params =>
		{
			this.facturar	= false;
			if( this.datosVenta.detalles.length > 0 )
			{
				this.is_loading = true;
				this.rest.guardarDatosVenta( this.datosVenta ).subscribe((response)=>{
					//Si no se subscribe no se manda a llamar
				},(error)=>{
					error.log('Ocurrio un error al guardar los datos');
				});
			}

			let id =  params.get('id') ? parseInt( params.get('id' ) ): null;
			let usuario = this.rest.getUsuarioSesion();

			this.is_loading = true;

			let subscription = id
					? forkJoin
					([
						this.rest.tipo_precio.getAll({ id_organizacion: usuario.id_organizacion })
						,this.rest.getDatosVenta(id)
						,this.rest.venta.search({eq:{id_usuario_atendio:usuario.id, estatus: 'PENDIENTE',activa:'SI'},limite:200})
					])
					: forkJoin
					([
						this.rest.tipo_precio.getAll({ id_organizacion: usuario.id_organizacion })
						,of(null)
						,this.rest.venta.search({eq:{id_usuario_atendio:usuario.id, estatus: 'PENDIENTE',activa:'SI' } })
					]);

			subscription.subscribe((response)=>
			{
				this.tipo_precios		= response[0].datos;
				if( response[1] == null )
				{
					//Venta Nueva
					this.datosVenta					= this.getNewVenta( this.tipo_precios );
					this.datosVenta.tipo_precio		= this.tipo_precios[0];
					this.datosVenta.venta.id_tipo_precio =this.tipo_precios[0].id;
				}
				else
				{
					let response_precios	= response[0];
					this.datosVenta			= response[1];
				}

				this.ventas = response[2].datos;
 				this.calcularTotalVenta();
				this.is_loading = false;
			}
			,(error)=>
			{
				this.showError( error );
			});
		});
	}

	ngOnDestroy()
	{
		console.log('Saving???',this.datosVenta );
		if( this.datosVenta.detalles.length > 0 && (this.datosVenta.venta.estatus == 'PENDIENTE' || this.datosVenta.venta.estatus == '') )
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

	changeTipoPrecio(id_tipo_precio:number)
	{
		this.datosVenta.venta.id_tipo_precio = id_tipo_precio;

		if( this.datosVenta.detalles.length  > 0 )
		{
			this.is_loading = true;
			this.rest.venta.update( this.datosVenta.venta ).pipe(
				flatMap((venta)=>
				{
					return this.rest.getDatosVenta( venta.id );
				})
			)
			.subscribe((datosVenta)=>
			{
				this.is_loading = false;
				this.datosVenta = datosVenta;
				this.calcularTotalVenta();
			}
			,(error)=>
			{
				this.showError( error );
			});
		}
	}

	buscarCliente(evt:any)
	{
		this.is_loading = true;
		if( evt.target.value == '' )
		{
			this.search_usuario = [];
			this.is_loading = false;
			return;
		}

		let x = this.rest.usuario.search({
			eq:{ tipo: 'PACIENTE' }
			,lk:{ nombre: evt.target.value, usuario: evt.target.value },
		}).subscribe((response)=>
		{
			this.is_loading = false;
			this.search_usuario = response.datos;
			//x.unsubscribe();
		},(error)=>this.showError(error));
	}

	buscarRfc(evt:any)
	{
		console.log( evt );
		this.is_loading = true;
		if( evt == undefined || evt.target.value == '' )
		{
			this.search_rfc = [];
			this.is_loading = false;
			return;
		}

		let x = this.rest.usuario.search({
			eq:{ tipo: 'PACIENTE' }
			,start:{ factura_rfc: evt.target.value }
			,limite: 5
		}).subscribe((response)=>
		{
			this.is_loading	= false;
			this.search_rfc		= response.datos;
			//x.unsubscribe();
		},(error)=>this.is_loading = false );

	}


	selectRfc(usuario:Usuario)
	{
		this.datosVenta.venta.factura_rfc 					= usuario.factura_rfc;
		this.datosVenta.venta.factura_razon_social			= usuario.factura_razon_social;
		this.datosVenta.venta.factura_codigo_postal			= usuario.factura_codigo_postal;
		this.datosVenta.venta.factura_correo_electronico	= usuario.factura_correo_electronico;
		this.search_rfc = [];
	}

	selectUsuario(usuario:Usuario)
	{
		console.log( usuario );
		this.datosVenta.venta.id_usuario_cliente	= usuario.id;
		this.datosVenta.venta.cliente				= usuario.usuario;
		this.datosVenta.cliente						= usuario;

		this.datosVenta.venta.factura_rfc 					= usuario.factura_rfc;
		this.datosVenta.venta.factura_razon_social			= usuario.factura_razon_social;
		this.datosVenta.venta.factura_codigo_postal			= usuario.factura_codigo_postal;
		this.datosVenta.venta.factura_correo_electronico	= usuario.factura_correo_electronico;

		console.log('Cliente es', this.datosVenta.cliente );

		if( usuario.id_tipo_precio )
			this.datosVenta.venta.id_tipo_precio				= usuario.id_tipo_precio;

		this.search_usuario = [];
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
		},(error)=>this.showError(error));
	}

	guardarVenta()
	{
		this.is_loading = true;
		this.rest.guardarDatosVenta( this.datosVenta ).subscribe((datosVenta)=>
		{
			this.is_loading = false;
			this.datosVenta = datosVenta;
			this.calcularCantidades();
			this.show_modal_pago = true;
		},(error)=>
		{
			this.showError( error );
		});
	}

	cancelarVenta()
	{
		this.is_loading = true;
		this.rest.venta.update({id: this.datosVenta.venta.id, activa: 'NO' }).subscribe((venta)=>
		{
			this.is_loading = false;
			this.datosVenta					= this.getNewVenta( this.tipo_precios );
			this.router.navigate(['punto-venta']);
		});
	}

	focusBusqueda()
	{
		let x = <HTMLInputElement>document.getElementById('busqueda');
		x.focus();
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

	calcularCambio(pago):number
	{
		let cambio = ((0+pago.efectivo
						+(pago.dolares*pago.tipo_cambio_dolares)
						+pago.tarjeta
						+pago.cheque
						+pago.deposito - pago.total )> 0 ?
						(
							(0+pago.efectivo
							+(pago.dolares*pago.tipo_cambio_dolares)
							+pago.tarjeta
							+pago.cheque
							+pago.deposito
							- pago.total)
						)
						: 0 );

		pago.cambio = cambio;
		pago.cambio_en_dolares = cambio/this.datosVenta.centro_medico.tipo_cambio_dolares;
		return cambio;
	}

	pagarVenta()
	{
		this.pago.id_venta 	= this.datosVenta.venta.id;

		this.rest.pago.create(this.pago).subscribe((response)=>
		{
			this.is_loading = false;
			this.datosVenta.venta.estatus = 'PROCESADA';
			this.router.navigate(['/ticket-venta',this.datosVenta.venta.id,1]);
		}
		,(error)=>
		{
			this.is_loading = false;
			this.showError(error);
		});
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
	calcularTotalVenta()
	{
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
				,estatus			: 'PENDIENTE'
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
