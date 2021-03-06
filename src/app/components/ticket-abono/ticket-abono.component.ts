import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { Requisicion, Venta, Usuario, Pago, Detalle_Venta, Centro_Medico } from 'src/app/models/Modelos';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { formatDate } from '@fullcalendar/core';

@Component({
	selector: 'app-ticket-abono',
	templateUrl: './ticket-abono.component.html',
	styleUrls: ['./ticket-abono.component.css']
})
export class TicketAbonoComponent extends BaseComponent implements OnInit {
	@Input() show: boolean = false;
	@Input() closable: boolean = true;
	@Output() showChange = new EventEmitter<boolean>();
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	busqueda: string = '';
	venta: Venta = null;
	vent = {
		id: null
	};
	usuario = null;
	detalle_ventas: Detalle_Venta[] = [];
	servicio = null;
	centro_medico = null;
	todayDate: Date = new Date();
	pago = null;
	ngOnInit() {
		let centro_medico=this.rest.getCurrentCentroMedico();
		console.log(centro_medico)
		this.rest.centro_medico.search({ eq: { id: centro_medico.id } }).subscribe((respuestas) => {
			this.centro_medico = respuestas;
			console.log(this.centro_medico)
		}, (error) => this.showError(error));


		this.rest.keyUpObserver.subscribe((e) => {
			if (e.keyCode == 27) {
				if (this.closable) {
					this.showChange.emit(false);
				}
			}
		});
	}
	buscar() {

		forkJoin([
			this.rest.venta.search({ eq: { id: this.vent.id } }),
		]).subscribe((respuestas) => {
			this.venta = respuestas[0];
			forkJoin([
				this.rest.usuario.search({ eq: { id: this.venta.id_usuario_atendio } }),
				this.rest.detalle_venta.search({ eq: { id_venta: this.venta.id } }),
				this.rest.pago.search({ eq: { id_venta: this.venta.id } })
			]).subscribe((respuestas) => {
				this.usuario = respuestas[0];
				this.detalle_ventas = respuestas[1].datos;
				this.pago = respuestas[2];
				this.rest.servicio.search({ eq: { id: this.detalle_ventas[0].id_servicio } }).subscribe((respuestas) => {
					this.servicio = respuestas;
				}), (error) => this.showError(error);
			}, (error) => this.showError(error));
		}, (error) => this.showError(error))

	}
}
