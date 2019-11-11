import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Paciente } from '../../models/Modelos';

@Component({
  selector: 'app-seleccionar-paciente',
  templateUrl: './seleccionar-paciente.component.html',
  styleUrls: ['./seleccionar-paciente.component.css']
})
export class SeleccionarPacienteComponent implements OnInit {

	constructor(private rest:RestService) {
		// console.log( navParams );
		//this.pacientes	= navParams.get('pacientes');
	}

	pacientes:Paciente[] = [];

	ngOnInit() {}

	/*
	dismissModal()
	{
		this.modalCtrl.dismiss(null);
	}

	seleccionarPaciente(paciente:Paciente)
	{
		this.modalCtrl.dismiss(paciente);
	}
	*/
}
