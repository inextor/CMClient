import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { Centro_Medico, Sucursal_Doctor } from '../../models/Modelos';
import { map, distinctUntilChanged, mergeMap, delay } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchObject } from 'src/app/models/Respuestas';
import { WindowScrollController } from '@fullcalendar/core';

@Component({
	selector: 'app-seleccionar-centro-medico',
	templateUrl: './seleccionar-centro-medico.component.html',
	styleUrls: ['./seleccionar-centro-medico.component.css']
})

export class SeleccionarCentroMedicoComponent extends BaseComponent implements OnInit {

	@Input() show: boolean;
	@Input() showCancel: boolean;
	@Output() selected = new EventEmitter<Centro_Medico>();

	centros: Centro_Medico[] = [];
	last: string = '';
	centros_search: SearchObject<Sucursal_Doctor>;
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}

	ngOnInit() {
		let usuario = this.rest.getUsuarioSesion();


		this.route.queryParams.subscribe(params => {
			console.log("params", params);
			this.centros_search = {
				eq: { id_doctor: usuario.id },
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			// this.especialidad_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;

			this.centros_search.limite = this.pageSize;
			this.centros_search.pagina = 'pagina' in params ? parseInt(params.pagina) : 0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
			if (usuario.tipo !== "ADMIN") {
				this.rest.sucursal_doctor.search(this.centros_search).subscribe((respuesta) => {
					this.centros = respuesta.datos;
					this.setPages(this.centros_search.pagina, respuesta.total);
					this.is_loading = false;
				}, error => this.showError(error));
			} else {
				this.rest.centro_medico.search(this.centros_search).subscribe((respuesta) => {
					this.centros = respuesta.datos;
					this.setPages(this.centros_search.pagina, respuesta.total);
					this.is_loading = false;
				})
			}
		});

		// this.rest.centro_medico.search(this.centros_search).subscribe((respuesta)=>
		// {
		// 	this.centros = respuesta.datos;
		// 	this.setPages( this.centros.pagina, respuesta.total );
		// });
	}

	onKeyPressed(evt) {
		let input = <HTMLInputElement>document.getElementById('searchCentroMedico');
		console.log(input.value);
		if (this.last === input.value.trim())
			return;
		// ,{limit:10} dentro de search
		this.last = input.value.trim();

		let usuario = this.rest.getUsuarioSesion();
		this.centros_search = {
			eq: { id_doctor: usuario.id },
			gt: {},
			ge: {},
			le: {},
			lt: {},
			lk: { nombre: this.last },
			csv: {},
		};

		// this.especialidad_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
		this.is_loading = true;
		this.centros_search.limite = this.pageSize;

		if (usuario.tipo !== "ADMIN") {
			this.rest.sucursal_doctor.search(this.centros_search).subscribe((respuesta) => {
				this.centros = respuesta.datos;
				this.setPages(this.centros_search.pagina, respuesta.total);
				this.is_loading = false;
			}, error => this.showError(error));
		} else {
			this.rest.centro_medico.search(this.centros_search).subscribe((respuesta) => {
				this.centros = respuesta.datos;
				this.setPages(this.centros_search.pagina, respuesta.total);
				this.is_loading = false;
			})
		}
	}


	dismissModal() {
		//		this.modalCtrl.dismiss(null);
	}

	seleccionarCentro(centro_medico: Centro_Medico) {
		this.selected.emit(centro_medico);
	}

}
