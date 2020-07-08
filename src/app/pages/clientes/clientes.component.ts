import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchObject } from '../../models/Respuestas';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';


import { Usuario } from '../../models/Modelos';
import { Organizacion } from '../../models/Modelos';
import { Imagen } from '../../models/Modelos';


@Component({
	selector: 'app-clientes',
	templateUrl: './clientes.component.html',
	styleUrls: ['./clientes.component.css']
})

export class ClientesComponent extends BaseComponent implements OnInit {
	usuario_list: Usuario[] = [];
	organizacion_list: Organizacion[] = [];
	imagen_list: Imagen[] = [];
	usuario_search: SearchObject<Usuario> = {
	};
	busquedaAvanzada: boolean = false;
	clearBusqueda() {
		this.usuario_search = {
			lt: {}
			, eq: {}
			, ge: {}
			, gt: {}
			, le: {}
			, lk: {}
			, csv: {}
		};
		this.search();
	}
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}

	ngOnInit() {

		let centro_medico = this.rest.getCurrentCentroMedico();
		this.route.queryParams.subscribe(params => {
			this.usuario_search = {
				eq: { id_organizacion : centro_medico.id_organizacion},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};


			this.usuario_search.limite = this.pageSize;

			this.titleService.setTitle('usuario');


			// let keys = ['eq', 'le', 'lt', 'ge', 'gt', 'csv', 'lk'];
			// let fields = ["id", "usuario", "nombre", "id_organizacion", "id_imagen", "tipo", "id_device_notification", "contrasena", "telefono", "correo_electronico", "tiempo_creacion", "tiempo_actualizacion"]

			// keys.forEach((k) => {
			// 	fields.forEach((f) => {
			// 		let field = k + "." + f;

			// 		if (params[field]) {
			// 			this.usuario_search[k][f] = params[field];
			// 		}
			// 	});
			// });


			console.log('Search', this.usuario_search);

			let rjoinObj: any = {};
			let fjarray = [];


			this.is_loading = true;
			this.usuario_search.lk.id = "lk.id" in params ? params["lk.id"] : null;
			this.usuario_search.lk.usuario = "lk.usuario" in params ? params["lk.usuario"] : null;
			this.usuario_search.lk.nombre = "lk.nombre" in params ? params["lk.nombre"] : null;
			this.usuario_search.lk.telefono = "lk.telefono" in params ? params["lk.telefono"] : null;
			this.usuario_search.lk.correo_electronico = "lk.correo_electronico" in params ? params["lk.correo_electronico"] : null;
			this.usuario_search.pagina = 'pagina' in params ? parseInt(params.pagina) : 0;
			this.usuario_search.eq.tipo = 'PACIENTE'

			forkJoin([
				this.rest.usuario.search(this.usuario_search)
				//,this.rest.organizacion.getAll({})
				//,this.rest.imagen.getAll({})
			])
				.subscribe((responses) => {
					this.usuario_list = responses[0].datos;
					this.setPages(this.usuario_search.pagina, responses[0].total);
					//this.organizacion_list = responses[ 1 ].datos;
					//this.imagen_list = responses[ 2 ].datos;
				});
		});
	}

	search() {
		this.is_loading = true;
		this.usuario_search.pagina = 0;

		let search = {};
		let array = ['eq', 'le', 'lt', 'ge', 'gt', 'csv', 'lk'];
		for (let i in this.usuario_search) {
			console.log('i', i, array.indexOf(i));
			if (array.indexOf(i) > -1) {
				for (let j in this.usuario_search[i])
					search[i + '.' + j] = this.usuario_search[i][j];
			}
		}

		console.log(search);
		this.router.navigate(['/clientes'], { queryParams: search });
	}
}
