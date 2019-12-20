import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Gasto_Centro_Medico, Tipo_Gasto, Ingreso } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse } from '../../models/Respuestas';
import { Location } from '@angular/common';

@Component({
	selector: 'app-ingreso',
	templateUrl: './ingreso.component.html',
	styleUrls: ['./ingreso.component.css']
})

export class IngresoComponent extends BaseComponent implements OnInit {

	@Input() show:boolean = false;
	@Output() onClose= new EventEmitter<boolean>();

	ingreso: Ingreso = {
		id:null,
		monto:null,
		nota: null,
	};

	ngOnInit() {
		let centro_medico=this.rest.getCurrentCentroMedico()
		this.ingreso = {
			monto:null,
			nota:null,
			id_centro_medico: centro_medico.id
		};
		let usuario = this.rest.getUsuarioSesion();
		console.log(usuario)
		this.is_loading = true;

	}

	onCancel()
	{
		this.onClose.emit( false );
	}

	guardar(){
		this.is_loading = true;

		if (this.ingreso.id) {
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.ingreso.update(this.ingreso).subscribe((response) => {
				this.is_loading = false;
				this.show = false;
				this.onClose.emit(true);
			}, error => this.showError(error));
		}
		else {
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.ingreso.create(this.ingreso).subscribe((response) => {
				this.is_loading = false;
				this.show = false;
				this.onClose.emit(true);
			}, error => this.showError(error));
		}
	}
}
