import { Component, OnInit } from '@angular/core';
import { RestService, DatosVenta } from '../../services/rest.service';
import { Usuario,Gasto_Centro_Medico,Tipo_Gasto, Pago_Poliza, Paciente, Tipo_Precio, Centro_Medico, Poliza, Servicio, Precio_Servicio } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin, of } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse, SearchObject } from '../../models/Respuestas';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { flatMap } from 'rxjs/operators';
import * as moment from 'moment';



interface Info_Precio {
	[key: number]: Precio_Servicio[];
}

@Component({
  selector: 'app-pagos-poliza',
  templateUrl: './pagos-poliza.component.html',
  styleUrls: ['./pagos-poliza.component.css']
})
export class PagosPolizaComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		//import { Title } from '@angular/platform-browser';
		super( rest,router,route,location,titleService);
	}

 	pagos_poliza:Pago_Poliza[] = [];
  	usuarios: Paciente[]=[];
	usuarios_dic:any = {};
	pago_poliza_search:SearchObject<Pago_Poliza>;
	//
	datosVenta: DatosVenta = {
		venta: {
			id_centro_medico: null
			, id_usuario_atendio: null
			, iva: 0
			, total: 0
		}
		, centro_medico: {}
		, detalles: []
		, cliente: {}
		, atendio: {}
		, pagos: []
		, tipo_precio: {}
	};
	tipo_precios: Tipo_Precio[] = [];
	poliza:Poliza;
	polizas:Poliza[]=[];
	precios_info: Info_Precio = {};
	polizas_dic:any = {};
	fecha_actual:Date;

	ngOnInit() {
		this.titleService.setTitle('Pagos Poliza')
		let usuario = this.rest.getUsuarioSesion();
		this.fecha_actual = new Date(moment().format("YYYY/MM/DD"));
		console.log('lafecha',this.fecha_actual);
		this.is_loading = true;
		this.route.queryParams.subscribe( params =>
			{
				this.pago_poliza_search = {
					eq: { id_organizacion: this.rest.getUsuarioSesion().id_organizacion },
					gt: {},
					ge: {},
					le: {},
					lt: {},
					lk: {},
					csv: {},
				};
				let rjoinObj:any = {};
				let fjarray = [];
		this.pago_poliza_search.eq.id_usuario	= "eq.id_usuario" in params ?params["eq.id_usuario"]:null;
		this.pago_poliza_search.pagina =  'pagina' in params ? parseInt( params.pagina ) : 0;
		this.pago_poliza_search.limite = this.pageSize;
    	this.currentPage = this.pago_poliza_search.pagina;
    
		forkJoin(
			[
        		this.rest.pago_poliza.search(this.pago_poliza_search),
				this.rest.usuario.getAll({}),
				this.rest.tipo_precio.getAll({ id_organizacion: usuario.id_organizacion }),
				this.rest.poliza.getAll({})
			]
		).subscribe(
			(response:any[])=>
			{
				console.log("gastos",response);
        		this.pagos_poliza = response[0].datos;
        		this.usuarios = response[1].datos;
        		this.usuarios.forEach(i=>this.usuarios_dic[ i.id ] =  i);
				// this.tipos_gasto.forEach(i=> this.tipo_gastos_dic[ i.id ] =  i);
				this.tipo_precios = response[2].datos;
				//agregando nueva venta
				this.datosVenta = this.getNewVenta(this.tipo_precios);
				this.datosVenta.tipo_precio = this.tipo_precios[0];
				this.datosVenta.venta.id_tipo_precio = this.tipo_precios[0].id;
				//polizas
				this.polizas = response[3].datos
				this.polizas.forEach(i=>this.polizas_dic[ i.id ] =  i);
				this.setPages( this.pago_poliza_search.pagina, response[0].total );
				this.is_loading = false;
			}
			,(error)=>
			{
				this.showError( error );
				this.is_loading = false ;
			}
		);
	});
	}

	obtenerVencimiento(pago_poliza){
		this.fecha_actual;
		let fecha_vencimiento = new Date(this.rest.getDateFromMysqlString(pago_poliza.fecha_cobro));
		if(this.fecha_actual>fecha_vencimiento ){
			let estado = 'vencido'
			return 1;
		}else{
			let dias = 6;
			fecha_vencimiento.setDate(fecha_vencimiento.getDate() + dias);
			console.log('nuevafechavencimiento',fecha_vencimiento);
			if(this.fecha_actual>fecha_vencimiento){
				let estado = 'proximo'
				return 2;
			}else{
				let estado = 'valido'
				return 3;
			}
		}
	}

	search()
	{
		this.is_loading = true;
		this.pago_poliza_search.pagina= 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.pago_poliza_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.pago_poliza_search[i])
                    search[i+'.'+j] = this.pago_poliza_search[i][j];
            }
		}
		this.is_loading = false;
		this.router.navigate(['pagos'],{queryParams: search});
	}

	guardar(pago_poliza) {
		this.is_loading = true;
		console.log("guardando venta", this.datosVenta);

			if (pago_poliza.estado == "PROCESADO") {
				this.is_loading = false;
				// this.calcularTotalVenta();
				// this.calcularCantidades();
				if(pago_poliza.id_venta){
					this.router.navigate(['punto-venta',pago_poliza.id_venta]);
				}else{
					this.showError('La venta no existe');
				}
			} else {
				if (pago_poliza.estado !== 'PAGADO') {
					pago_poliza.estado = 'PROCESADO';
					forkJoin(
						[
							this.rest.guardarDatosVenta(this.datosVenta),
						]
					).subscribe(
						(response:any[])=>
						{
							this.datosVenta = response[0];
							console.log("DATOSQUE TRAJO", this.datosVenta);
							this.actualizarPago(pago_poliza);
							this.router.navigate(['punto-venta',this.datosVenta.venta.id]);
							this.is_loading = false ;
						}
						,(error)=>
						{
							this.showError( error );
							this.is_loading = false ;
						}
					);
				} else {
					this.showError('Error, la pago ya fue liquidado')
				}
			}
	}

	actualizarPago(pago_poliza){
		pago_poliza.estado = 'PROCESADO';
		pago_poliza.id_venta = this.datosVenta.venta.id;
		this.rest.pago_poliza.update(pago_poliza).subscribe((response)=>{
			console.log("pagopolizaresponse",response);
		})
	}

	procesarVenta(pago_poliza){
		let poliza = this.polizas.find(i =>i.id = pago_poliza.id);
		console.log('lakpoliza',poliza);
		if (!poliza) {
			this.showError("no se encontro ninguna poliza");
			return;
		}
		console.log('lapoliza',poliza)
		forkJoin(
			[
				this.rest.servicio.get(poliza.id_servicio),
				this.rest.usuario.get(poliza.id_paciente)
			]
		).subscribe(
			(response:any[])=>
			{
				let servicio = response[0];
				let usuario = response[1];
				this.agregarServicio(servicio);
				this.selectUsuario(usuario);
				this.guardar(pago_poliza);

			}
			,(error)=>
			{
				this.showError( error );
				this.is_loading = false ;
			}
		);

	}

	agregarServicio(servicio: Servicio) {

		if (this.datosVenta.venta.estatus == 'PENDIENTE') {

			this.is_loading = true;
			of(true).pipe
				(
					flatMap((x) => {
						if (servicio.id in this.precios_info) {
							return of({ total: this.precios_info[servicio.id].length, datos: this.precios_info[servicio.id] });
						}
						//Else
						let centro_medico = this.rest.getCurrentCentroMedico();
						return this.rest.precio_servicio.search
							({
								eq:
								{
									id_servicio: servicio.id
									, id_centro_medico: centro_medico.id
								}
							})
					})
				).subscribe((response) => {
					this.is_loading = false;

					if (!(servicio.id in this.precios_info)) {
						this.precios_info[servicio.id] = response.datos;
					}

					let precio_servicio = this.precios_info[servicio.id].find((p) => p.id_tipo_precio == this.datosVenta.venta.id_tipo_precio);


					this.datosVenta.detalles.push({
						servicio
						, precio_servicio
						, detalle_venta:
						{
							id_servicio: servicio.id
							, cantidad: 1
						}
					});
					// calculando cantidades 
					this.calcularTotalVenta();
				}, (error) => {
					console.log('Solo imprimimos el error en la consola');
				});
		} else {
			this.showError('No puedes agregar un servicio, la venta ya fue procesada')
		}
	}

	calcularTotalVenta() {
		let total = 0;
		let subtotal = 0;
		let iva = 0;
		let centro_medico = this.rest.getCurrentCentroMedico();

		let prices = [];

		for (let i of this.datosVenta.detalles) {
			i.detalle_venta.precio = i.precio_servicio.precio;
			i.detalle_venta.total = i.precio_servicio.precio * i.detalle_venta.cantidad;
			i.detalle_venta.subtotal = i.detalle_venta.total / (1 + (centro_medico.iva * 0.01));
			i.detalle_venta.iva = i.detalle_venta.total - i.detalle_venta.subtotal;

			total += i.detalle_venta.total;
			subtotal += i.detalle_venta.subtotal;
			iva += i.detalle_venta.iva;
		}

		console.log('Precios', prices);

		this.datosVenta.venta.total = total;
		this.datosVenta.venta.subtotal = subtotal;
		this.datosVenta.venta.iva = iva;
	}

	selectUsuario(usuario: Usuario) {
		console.log(usuario);
		this.datosVenta.venta.id_usuario_cliente = usuario.id;
		this.datosVenta.venta.cliente = usuario.usuario;
		this.datosVenta.cliente = usuario;

		this.datosVenta.venta.factura_rfc = usuario.factura_rfc;
		this.datosVenta.venta.factura_razon_social = usuario.factura_razon_social;
		this.datosVenta.venta.factura_codigo_postal = usuario.factura_codigo_postal;
		this.datosVenta.venta.factura_correo_electronico = usuario.factura_correo_electronico;

		console.log('Cliente es', this.datosVenta.cliente);
		//id_tipo_precio
		if (usuario.id_tipo_precio)
			this.datosVenta.venta.id_tipo_precio = usuario.id_tipo_precio;

	}

	getNewVenta(tipo_precios): DatosVenta {
		let centro_medico: Centro_Medico = this.rest.getCurrentCentroMedico();
		let usuario: Usuario = this.rest.getUsuarioSesion();

		return {
			venta: {
				id_centro_medico: centro_medico.id
				, id_usuario_atendio: usuario.id
				, iva: centro_medico.iva
				, total: 0
				, estatus: 'PENDIENTE'
				, cliente: tipo_precios[0].nombre
				, id_tipo_precio: tipo_precios[0].id
			}
			, centro_medico
			, detalles: []
			, cliente: null
			, atendio: this.rest.getUsuarioSesion()
			, pagos: []
			, tipo_precio: tipo_precios[0]
		}
	}

	
}
