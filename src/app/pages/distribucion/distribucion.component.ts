import { Component, OnInit } from '@angular/core';
import { RestService, Detalle_Requisicion_Info } from '../../services/rest.service';
import { SearchObject } from '../../models/Respuestas';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';


import { Distribucion, Servicio, Requisicion, Proveedor, Detalle_Requisicion } from 'src/app/models/Modelos';
import { Centro_Medico } from 'src/app/models/Modelos';
import { Usuario } from 'src/app/models/Modelos';
import { DistribucionInfo } from 'src/app/models/Respuestas';

@Component({
	selector: 'app-distribucion',
	templateUrl: './distribucion.component.html',
	styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent extends BaseComponent implements OnInit {
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	//modales
	show: boolean = false;
	showOrdenarRequisicion: boolean = false;
	//
	requisiciones_search: SearchObject<Requisicion> = {};
	servicios: Servicio[] = [];
	servicios_dic: any = {};
	busqueda: string = '';
	todos_servicios: [] = [];
	requisiciones: Requisicion[] = [];
	proveedores: Proveedor[] = [];
	proveedor_dic: any = {};
	sucursales: Centro_Medico[] = [];
	sucursal_dic: any = {};
	busquedaAvanzada: boolean = false;
	fecha_entrega;
	id_requisicion = null;
	detalles: Detalle_Requisicion[] = []

	distribucion_list: DistribucionInfo[] = [];
	usuario_list: Usuario[] = [];
	centro_medico_list: Centro_Medico[] = [];
	currentRequisicion: Requisicion;
	distribucion_search: SearchObject<Distribucion> = {

	};

	centros_medicos = {};

	ngOnInit() {
		let centro_medico = this.rest.getCurrentCentroMedico();
		let usuario = this.rest.getUsuarioSesion();
		this.route.queryParams.subscribe(params => {
			this.requisiciones_search = {
				eq: { id_centro_medico_distribuidor: centro_medico.id, estatus: "PENDIENTE" },
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			this.requisiciones_search.lk.pedimento = "lk.pedimento" in params ? params["lk.pedimento"] : null;
			//   this.requisiciones_search.eq.estatus	= "eq.estatus" in params ?params["eq.estatus"]:null;
			this.requisiciones_search.eq.id_proveedor = "eq.id_proveedor" in params ? params["eq.id_proveedor"] : null;
			this.requisiciones_search.ge.tiempo_creacion = "ge.tiempo_creacion" in params ? params["ge.tiempo_creacion"] : null;
			this.requisiciones_search.le.tiempo_entrega = "le.tiempo_entrega" in params ? params["le.tiempo_entrega"] : null;
			this.requisiciones_search.limite = this.pageSize;
			this.requisiciones_search.pagina = 'pagina' in params ? parseInt(params.pagina) : 0;

			this.is_loading = true;
			forkJoin(
				[
					//getTiposGastos({id_organizacion: usuario.id_organizacion}),
					//this.rest.getGastos({ id_centro_medico: 1 })
					this.rest.proveedor.getAll({ id_organizacion: usuario.id_organizacion }),
					this.rest.requisicion.search(this.requisiciones_search), //TODO FIX ponerlo de la session o seleccionarlo
					this.rest.centro_medico.search(this.requisiciones_search)
				]
			).subscribe(
				(response) => {
					this.proveedores = response[0].datos;
					this.sucursales = response[2].datos;
					this.proveedores.forEach(i => this.proveedor_dic[i.id] = i);
					this.sucursales.forEach(i => this.sucursal_dic[i.id] = i);
					console.log('proveedor', this.proveedor_dic);
					this.requisiciones = response[1].datos;//TODO Cambiar al usaurio de la sesion
					this.setPages(this.requisiciones_search.pagina, response[1].total);
					this.is_loading = false;
				}
				, (error) => {
					this.showError(error);
					this.is_loading = false;
				}
			);
		});

	}


	ordenarRequisicion(currentRequisicion: Requisicion) {
		console.log("asdfasdf", this.fecha_entrega);
		this.rest.requisicion.update({
			id: currentRequisicion.id
			, estatus: 'EN_TRANSITO'
			, tiempo_entrega: this.fecha_entrega
		}).subscribe((requisicion) => {
			this.showOrdenarRequisicion = false;
			let index = this.requisiciones.findIndex(i => i.id == currentRequisicion.id);
			this.is_loading = false;
			if (index >= 0)
				this.requisiciones[index] = requisicion;
		}
			, (error) => {
				this.is_loading = false;
				this.showOrdenarRequisicion = false;
				this.showError(error);
			});
	}




	// this.route.queryParams.subscribe( params =>
	// {

	// 	this.distribucion_search = {
	// 		eq: {},
	// 		gt: {},
	// 		ge: {},
	// 		le: {},
	// 		lt: {},
	// 		lk: {},
	// 		csv: {},
	// 		start: {}
	// 	};


	// 	this.distribucion_search.limite = this.pageSize;

	// 	this.titleService.setTitle('distribucion');

	// 	let keys = ['eq','le','lt','ge','gt','csv','lk'];
	// 	let fields = [ "id","id_centro_medico_solicitante","estatus","id_usuario_recibio","id_usuario_envio","guia","paqueteria","id_centro_medico_distribuidor","tiempo_creacion","tiempo_actualizacion" ]

	// 	keys.forEach((k)=>
	// 	{
	// 		fields.forEach((f)=>
	// 		{
	// 			let field = k+"."+f;

	// 			if( params[field ] )
	// 			{
	// 				this.distribucion_search[ k ][ f ] = params[ field ];
	// 			}
	// 		});
	// 	});

	// 	console.log('Search', this.distribucion_search);

	// 	this.is_loading = true;
	// 	this.distribucion_search.pagina =	'pagina' in params ? parseInt( params.pagina ) : 0;
	// 	this.currentPage = this.distribucion_search.pagina;
	// 	let usuario = this.rest.getUsuarioSesion();

	// 	forkJoin([
	// 		this.rest.distribucionInfo.search(this.distribucion_search)
	// 		,this.rest.usuario.search({
	// 			eq:{ id_organizacion: usuario.id_organizacion }
	// 			,csv:{ tipo:['DOCTOR','RECEPCIONISTA','ADMIN','ASISTENTE'] }
	// 		})
	// 		,this.rest.centro_medico.search({
	// 			eq:{ id_organizacion: usuario.id_organizacion }
	// 		})
	// 	])
	// 	.subscribe((responses)=>
	// 	{
	// 		console.log('distribucion',responses);
	// 		this.centro_medico_list = responses[2].datos;
	// 		this.centro_medico_list.forEach((i)=>
	// 		{
	// 			this.centros_medicos[i.id]=i;
	// 		});

	// 		console.log( this.centros_medicos );

	// 		this.usuario_list = responses[1].datos;
	// 		this.setPages( this.distribucion_search.pagina, responses[0].total );
	// 		this.distribucion_list = responses[0].datos;
	// 	});
	// });
	get_detalles(currentRequisicion) {
		let usuario = this.rest.getUsuarioSesion();
		this.currentRequisicion = currentRequisicion;
		forkJoin(
			[
				//getTiposGastos({id_organizacion: usuario.id_organizacion}),
				//this.rest.getGastos({ id_centro_medico: 1 })
				this.rest.detalle_requisicion.search({ eq: { id_requisicion: this.currentRequisicion.id } }),
				this.rest.servicio.getAll({}), //TODO FIX ponerlo de la session o seleccionarlo
			]
		).subscribe(
			(response) => {
				this.detalles = response[0].datos;
				this.servicios = response[1].datos;
				this.servicios.forEach(i => this.servicios_dic[i.id] = i);
				console.log("servis", this.servicios_dic)
				this.is_loading = false;
			}
			, (error) => {
				this.showError(error);
				this.is_loading = false;
			}
		);
		// this.rest.detalle_requisicion.search({eq:{id_requisicion:currentRequisicion.id}}).subscribe((response)=>{
		// 	this.detalles = response.datos;
		// })

	}

	search() {
		this.is_loading = true;
		this.distribucion_search.pagina = 0;

		let search = {};
		let array = ['eq', 'le', 'lt', 'ge', 'gt', 'csv', 'lk'];
		for (let i in this.distribucion_search) {
			console.log('i', i, array.indexOf(i));
			if (array.indexOf(i) > -1) {
				for (let j in this.distribucion_search[i])
					search[i + '.' + j] = this.distribucion_search[i][j];
			}
		}

		console.log(search);
		this.router.navigate(['/list-distribucion'], { queryParams: search });
	}
}
