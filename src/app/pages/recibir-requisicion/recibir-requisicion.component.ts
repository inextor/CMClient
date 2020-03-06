import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Doctor, Centro_Medico, Especialidad, Paciente, Servicio, Doctor_Servicio, Detalle_Requisicion, Requisicion, Inventario } from '../../models/Modelos';
import { RestService, RequisicionInfo, Detalle_Requisicion_Info } from '../../services/rest.service';
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router"
import { SearchObject } from '../../models/Respuestas';
import { BaseComponent } from '../../pages/base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ServiciosComponent } from 'src/app/pages/servicios/servicios.component';
import { identifierModuleUrl } from '@angular/compiler';
import { InventarioComponent } from '../inventario/inventario.component';

@Component({
	selector: 'app-recibir-requisicion',
	templateUrl: './recibir-requisicion.component.html',
	styleUrls: ['./recibir-requisicion.component.css']
})
export class RecibirRequisicionComponent extends BaseComponent implements OnInit {
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	//modales
	showConfirmarRecibir: boolean = false;
	//fin modales
	requisicion: Requisicion;
	detalles: Detalle_Requisicion[] = [];
	requisicion_search: SearchObject<Requisicion>;
	detalle_requisicion_search: SearchObject<Detalle_Requisicion>;
	test_search: SearchObject<RequisicionInfo>;
	detalles_requisicion: Detalle_Requisicion_Info[] = [];
	servicios: Servicio[] = [];
	servicio_dic: any = {};
	detalle_list: Detalle_Requisicion[] = [];
	inventario: Inventario[] = [];
	ngOnInit() {
		let usuario = this.rest.getUsuarioSesion();

		this.route.paramMap.subscribe(params => {
			let id = params.get('id_requisicion') == null ? null : parseInt(params.get('id_requisicion'))

			this.requisicion_search = {
				eq: { id: id },
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			}

			this.detalle_requisicion_search = {
				eq: { id_requisicion: id },
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.detalle_requisicion_search.eq.id_requisicion	= "eq.id_requisicion" in params ?params["eq.id_requisicion"]:null;
			// this.detalle_requisicion_search.limite			= this.pageSize;
			// this.detalle_requisicion_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;

			forkJoin([
				this.rest.servicio.getAll({}),
				this.rest.requisicion.search(this.requisicion_search),
				this.rest.detalle_requisicion.search(this.detalle_requisicion_search)
			]).subscribe(results => {
				this.servicios = results[0].datos;
				this.servicios.forEach(i => this.servicio_dic[i.id] = i);
				this.requisicion = results[1];
				this.detalles = results[2].datos;
				this.detalles.forEach(i => {
					this.detalles_requisicion.push({
						detalle_requisicion: i, servicio: this.servicios.find(j => j.id == i.id_servicio)
					})
				})
				console.log(this.detalles_requisicion);
			}, error => this.showError(error));
		});
	}
	//si el material no llega completo o existen mermas, el usuario pondra la cantidad correspondiente de lo contrario
	// si selecciona check la cantidad se pondre completa sin faltante
	incrementar(detalle_requisicion) {
		let s = this.detalles.find(i => i.id == detalle_requisicion.id);
		console.log("s", s);
		if (s) {
			s.recibido = detalle_requisicion.recibido;
			s.merma = detalle_requisicion.merma;
			console.log("detalle1", s);
		}
	}
	// se asigna la cantidad recibida y la merma si existe

	checked(detalle_requisicion) {
		if (detalle_requisicion !== 'RECIBIDO') {
			let detalle = this.detalles.find(i => i.id == detalle_requisicion.id)
			if (detalle && detalle.recibido == 0) {
				detalle.merma = detalle_requisicion.merma;
				detalle.recibido = detalle_requisicion.cantidad;

			} else {
				// aun no se ke poner aki :( )

			}
		} else {
			this.showError("Error, este articulo ya fue recibido.");
		}
	}

	//test
	check(detalle_requisicion) {
		console.log("hola", detalle_requisicion);
		if (detalle_requisicion.estatus !== "RECIBIDO") {
			console.log("ola");
			let detalle = this.detalles.find(i => i.id == detalle_requisicion.id)
			if (detalle) {
				detalle.merma = detalle_requisicion.merma
				detalle.recibido = detalle_requisicion.cantidad
				// if(detalle.recibido + detalle.merma == detalle_requisicion.cantidad){
				// 	detalle.estatus = 'RECIBIDO'
				// }
				// this.detalles.push({
				// 	recibido: detalle_requisicion.cantidad, merma : detalle_requisicion.merma});
			}
		}
		else {
			this.showError("Error, este articulo ya fue recibido.");
		}
	}
	//fin test

	recibir() {
		if (this.requisicion.estatus !== "RECIBIDO") {
			this.guardar();
		}
		else {
			this.showError("La requisicion ya fue recibida")
		}
	}

	guardar() {
		this.is_loading = true;
		console.log("larekisicion", this.requisicion);
		console.log("ladetallerekisicion", this.detalles_requisicion);

		forkJoin([
			// this.rest.inventario.update(this.inventario[0]),
			// this.rest.detalle_requisicion.update(servicio),
			this.rest.requisicionInfo.update({ requisicion: this.requisicion, detalles: this.detalles_requisicion }),
		]).subscribe(results => {
			// this.detalles.forEach(i=>{
			// 	if(i.estatus !== "RECIBIDO"){
			// 		return
			// 	}
			// })
			this.is_loading = false;
			this.router.navigate(['/requisiciones']);
		}, error => this.showError(error));
		//  this.rest.inventario.update(this.inventario[0]).subscribe((inventario) => {
		// 	 this.is_loading = false;
		// 	 this.router.navigate(['/requisiciones']);
		//  }, error => this.showError(error));

	}
	// terminarRequisicion(){
	// 	this.requisicion.estatus = "RECIBIDO"
	// 	this.rest.requisicion.update(this.requisicion).subscribe((requisicion) => {

	// 		 }, error => this.showError(error));
	// }

}

