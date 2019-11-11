import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { Centro_Medico } from '../../models/Modelos';

@Component({
  selector: 'app-seleccionar-centro-medico-home',
  templateUrl: './seleccionar-centro-medico-home.component.html',
  styleUrls: ['./seleccionar-centro-medico-home.component.css']
})
export class SeleccionarCentroMedicoHomeComponent implements OnInit {

  constructor(private rest:RestService,private modalCtrl:ModalController,navParams:NavParams) {
		console.log( navParams );
		this.centros = navParams.get('centros');
	}

	centros:Centro_Medico[] = [];

	ngOnInit() {}

	dismissModal()
	{
		this.modalCtrl.dismiss(null);
	}

	seleccionarCentro(centro_medico:Centro_Medico)
	{
		this.modalCtrl.dismiss(centro_medico);
	}
}
