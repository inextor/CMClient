import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Centro_Medico } from '../../models/Modelos';


@Component({
  selector: 'app-seleccionar-centro-medico',
  templateUrl: './seleccionar-centro-medico.component.html',
  styleUrls: ['./seleccionar-centro-medico.component.css']
})
export class SeleccionarCentroMedicoComponent implements OnInit {

	@Output() selected = new EventEmitter<Centro_Medico>();

	centros:Centro_Medico[] = [];

	constructor(private rest:RestService)
	{
	}

	ngOnInit()
	{
		this.rest.centro_medico.getAll({}).subscribe((respuesta)=>
		{
			this.centros = respuesta.datos;
		});
	}

	dismissModal()
	{
//		this.modalCtrl.dismiss(null);
	}

	seleccionarCentro(centro_medico:Centro_Medico)
	{
		this.selected.emit( centro_medico );
	}
}
