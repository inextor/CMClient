import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Centro_Medico, Doctor } from 'src/app/models/Modelos';

@Component({
  selector: 'app-configurar-horario',
  templateUrl: './configurar-horario.component.html',
  styleUrls: ['./configurar-horario.component.css']
})
export class ConfigurarHorarioComponent implements OnInit {

	constructor(
		private restService:RestService,
		private activatedRoute:ActivatedRoute
	) { }

	centroMedico:Centro_Medico={}
	doctor:Doctor={}
	idCentroMedico:number;
	idDoctor:number;


	ngOnInit()
	{
		this.idCentroMedico = parseInt(this.activatedRoute.snapshot.paramMap.get('idCentroMedico'));
		//XXX Para que queremos el centro medico????
		this.restService.centro_medico.get( this.idCentroMedico ).subscribe( centroMedico =>
		{
			this.centroMedico = centroMedico;
		});


		this.idDoctor = parseInt(this.activatedRoute.snapshot.paramMap.get('idDoctor'));
		//XXX Para que queremos el doctor????
		this.restService.doctor.get( this.idDoctor ).subscribe( doctor =>
		{
			this.doctor = doctor;
		});
	}
}
