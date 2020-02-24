import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Centro_Medico } from '../../models/Modelos';
import { BaseComponent } from '../../pages/base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { UrlSegment } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router"
@Component({
	selector: 'app-seleccionar-centro-medico-home',
	templateUrl: './seleccionar-centro-medico-home.component.html',
	styleUrls: ['./seleccionar-centro-medico-home.component.css']
})
export class SeleccionarCentroMedicoHomeComponent extends BaseComponent implements OnInit {

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	show_seleccionar_centro_medico: boolean = false;
	clinica;
	centros: Centro_Medico[] = [];
	centros_medicos_doctor;
	ngOnInit() {


		this.route.paramMap.subscribe(() => {
			let usuario = this.rest.getUsuarioSesion();
			// this.rest.centro_medico.get(usuario.id_centro_medico).subscribe(response=>{
			// 	let currentCentroMedico = response
			// })
			forkJoin([
				this.rest.sucursal_doctor.getAll({ id_doctor: usuario.id })
			]).subscribe((response) => {
				this.centros_medicos_doctor = response[0].datos
				console.log('los centros medicos del doctor', this.centros_medicos_doctor)
				if (this.centros_medicos_doctor.length > 1) {
					let centroMedico = this.rest.getCurrentCentroMedico();

					if (usuario.tipo == "ADMIN" || usuario.tipo == "DOCTOR" || usuario.tipo == "RECEPCIONISTA") {
						if ((centroMedico == null || centroMedico == undefined)) {
							this.show_seleccionar_centro_medico = true;
						} else {
							this.router.navigate(['/dashboard']);
						}
					} else {
						this.router.navigate(['/dashboard']);
					}

				}
				else {

					this.rest.centro_medico.get(usuario.id_centro_medico).subscribe(response => {

						localStorage.setItem('centro_medico', JSON.stringify(response));
					})
					console.log(usuario);
					this.router.navigate(['/dashboard']);
					// let centroMedico = this.rest.getCurrentCentroMedico();
					// if (usuario.tipo == "ADMIN" || usuario.tipo == "DOCTOR") {
					// 	if ((centroMedico == null || centroMedico == undefined)) {
					// 		this.show_seleccionar_centro_medico = true;
					// 	}
					// } else {
					// 	this.show_seleccionar_centro_medico = false;
					// }


				}
			})

		})

	}

	dismissModal() {
		//this.modalCtrl.dismiss(null);
	}

	seleccionarCentro(centro_medico: Centro_Medico) {
		//this.modalCtrl.dismiss(centro_medico);
	}

	onSeleccionarCentroMedico(centro_medico: Centro_Medico) {
		localStorage.setItem("centro_medico", JSON.stringify(centro_medico));
		this.clinica = this.rest.getCurrentCentroMedico();
		this.show_seleccionar_centro_medico = false;
		this.router.navigate(['/dashboard']);
	}
}
