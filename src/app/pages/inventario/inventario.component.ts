import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BaseComponent } from '../base/base.component';
import { Inventario, Servicio, Centro_Medico } from '../../models/Modelos';
import { SearchObject } from '../../models/Respuestas';
import { forkJoin } from 'rxjs';


interface InventarioKeys {
	[key: number]: Inventario
}

interface InventarioServicio {
	servicio: Servicio;
	inventario: Inventario;
}
interface ServicioById {
	[key: number]: Servicio;
};


@Component({
	selector: 'app-inventario',
	templateUrl: './inventario.component.html',
	styleUrls: ['./inventario.component.css']
})

export class InventarioComponent extends BaseComponent implements OnInit {

	inventarioServicios: InventarioServicio[] = [];
	centros_medicos: Centro_Medico[] = [];
	centro_medico: Centro_Medico;
	inventarios: Inventario[]=[];
	searchServicio: SearchObject<Servicio> = {
		lk: { nombre: '' }
		, eq: {}
		, csv: {}
	};
	search_inventario: SearchObject<Inventario> = {
		eq: { id_centro_medico: null },
		csv: {}
	};
	busqueda: string = '';
	servicios: Servicio[] = [];
	inventarioService: Inventario = {};
	search_servicios: Servicio[] = [];
	servicios_by_id: ServicioById = {};
	ngOnInit() {
		this.is_loading = true;
		console.log("HERE");
		this.centro_medico = this.rest.getCurrentCentroMedico();
		this.route.queryParams.subscribe((params) => {
			let centro_medico: Centro_Medico = this.rest.getCurrentCentroMedico();

			this.search_inventario.eq.id_centro_medico = 'id_centro_medico' in params ? params.id_centro_medico : centro_medico.id;

			this.searchServicio.eq.tipo = 'PRODUCTO_FISICO';
			this.searchServicio.lk.nombre = 'nombre' in params ? params.nombre : '';
			this.searchServicio.pagina = 'pagina' in params ? params.pagina : 0;
			let usuario = this.rest.getUsuarioSesion();
			forkJoin([
				this.rest.servicio.search(this.searchServicio),
				this.rest.centro_medico.search({ eq: { id_organizacion: usuario.id_organizacion } }),
				this.rest.inventario.search(this.search_inventario)
			]).subscribe((respuestas) => {
				let respuestaServicios = respuestas[0];
				this.centros_medicos = respuestas[1].datos;
				this.inventarios = respuestas[2].datos;
				console.log("inventariosss",this.inventarios);
				// let servicios_ids = respuestaServicios.datos.map(i => i.id);
				// this.search_inventario.csv['id_servicios'] = servicios_ids;

				// this.rest.inventario.search(this.search_inventario).subscribe((respuestaInventario) => {
				// 	console.log("HERE4");
				// 	this.is_loading = false;
				// 	let objInventario: InventarioKeys = {};
				// 	this.inventarioServicios = [];

				// 	respuestaInventario.datos.forEach((i) => { objInventario[i.id_servicio] = i });

				// 	respuestaServicios.datos.forEach((servicio) => {
				// 		let inventario = servicio.id in objInventario ? objInventario[servicio.id] : {
				// 			id_servicio: servicio.id, id_centro_medico: this.search_inventario.eq.id_centro_medico, cantidad: 0
				// 		};
				// 		console.log(this.search_inventario.eq.id_centro_medico);
				// 		this.inventarioServicios.push({ servicio, inventario });
				// 	});

				// 	console.log('Invetnario servicios', this.inventarioServicios);

				// 	this.setPages(this.searchServicio.pagina, respuestaServicios.total);
				// }, (error) => this.showError(error));
			}, (error) => this.showError(error));
		}, (error) => this.showError(error));
	}

	buscar() {
		//this.router.navigate(['/citas'],{queryParams: this.getParams()});

		let queryParams = {
			id_centro_medico: this.search_inventario.eq.id_centro_medico
			, pagina: this.searchServicio.pagina
			, nombre: this.searchServicio.lk.nombre
		};

		console.log('Buscar', queryParams);

		this.router.navigate(['/inventario'], { queryParams });
	}

	buscarServicios(evt: any) {
		let x = this.rest.servicio.search({
			lk: { nombre: evt.target.value },
			eq: { tipo: 'PRODUCTO_FISICO' }
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}

	agregarServicio(servicio) {
		if (!(servicio.id in this.servicios_by_id))
			this.servicios_by_id[servicio.id] = servicio;
		// let total= 0;

		// let s = this.detalles_requisicion.find(i => i.servicio.id == servicio.id );
		// if (s) {
		// 	this.busqueda = '';
		// 	this.aumentar(s);
		// 	this.calcularCantidades(total);
		// 	return;
		// }
		let s = this.servicios.find(i => i.id == servicio.id);
		if (s) {
			this.showError("Este servicio ya fue agregado a lista");
		} else {
			let inventario = this.inventarios.find(i => i.id_servicio == servicio.id);
			if (inventario) {
				this.showError("Este Servicio ya existe en el inventario");
			} else {
				if(this.servicios.length >= 1){
					this.showError("Solo se puede agregar un servicio a la vez");
				}else{
					this.servicios.push(servicio);
					this.inventarioService = {
						id_centro_medico: this.search_inventario.eq.id_centro_medico,
						id_servicio: servicio.id,
						nombre: servicio.nombre,
						cantidad: 0
					};
				}
			}
		}

		this.busqueda = '';
		this.search_servicios = [];
	}
	guardarServicio() {
		let inventario = this.inventarioServicios.map(i => i.inventario);
		console.log('inventario', inventario);
		this.rest.inventario.create(this.inventarioService).subscribe(() => {
			this.showError("Se guardo con exito");	
			this.servicios=[];
			this.ngOnInit();
		}, error => this.showError(error));
	}


	guardar() {
		let inventario = this.inventarioServicios.map(i => i.inventario);
		console.log('inventario', inventario);
		this.rest.inventario.batchUpdate(this.inventarios).subscribe(() => {
			this.showError("Se guardo con exito");
		}, error => this.showError(error));
	}
}

