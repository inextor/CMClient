import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Centro_Medico } from '../../models/Modelos';

@Component({
  selector: 'app-seleccionar-centro-medico',
  templateUrl: './seleccionar-centro-medico.component.html',
  styleUrls: ['./seleccionar-centro-medico.component.css']
})
export class SeleccionarCentroMedicoComponent implements OnInit {

	constructor(private rest:RestService) {
//		this.centros = navParams.get('centros');
	}

	centros:Centro_Medico[] = [];
	idOrganizacion = localStorage.getItem('id_organizacion')
	ngOnInit() {}

	dismissModal()
	{
//		this.modalCtrl.dismiss(null);
	}

	seleccionarCentro(centro_medico:Centro_Medico)
	{
//		this.modalCtrl.dismiss(centro_medico);
	}
}
