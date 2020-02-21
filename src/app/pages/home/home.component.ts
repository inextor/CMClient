import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Servicio, Especialidad, Centro_Medico, Sucursal_Doctor } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Location } from '@angular/common';
import { UrlSegment } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

	show_seleccionar_centro_medico: boolean = false;
	clinica;
	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
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
		
				if (this.centros_medicos_doctor.length > 1) {
					let centroMedico = this.rest.getCurrentCentroMedico();

					if (usuario.tipo == "ADMIN" || usuario.tipo == "DOCTOR") {
						if ((centroMedico == null || centroMedico == undefined)) {
							this.show_seleccionar_centro_medico = true;
						}
					}

				}
				else {

					this.rest.centro_medico.get(usuario.id_centro_medico).subscribe(response => {

						localStorage.setItem('centro_medico', JSON.stringify(response));
					})
					console.log(usuario);
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

	onSeleccionarCentroMedico(centro_medico: Centro_Medico) {
		localStorage.setItem("centro_medico", JSON.stringify(centro_medico));
		this.clinica= this.rest.getCurrentCentroMedico();
		this.show_seleccionar_centro_medico = false;
	}
}
