import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Doctor } from '../../models/Modelos';

@Component({
  selector: 'app-seleccionar-doctor',
  templateUrl: './seleccionar-doctor.component.html',
  styleUrls: ['./seleccionar-doctor.component.css']
})
export class SeleccionarDoctorComponent implements OnInit {

	constructor(private rest:RestService) {
		console.log( navParams );
		this.doctores = navParams.get('doctores');
	}

	doctores:Doctor[] = [];

	ngOnInit() {}

	dismissModal()
	{
		//this.modalCtrl.dismiss(null);
	}

	seleccionarDoctor(doctor:Doctor)
	{
		//this.modalCtrl.dismiss(doctor);
	}
}
