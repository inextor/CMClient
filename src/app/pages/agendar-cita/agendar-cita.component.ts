import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente, Centro_Medico, Doctor } from 'src/app/models/Modelos';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.page.html',
  styleUrls: ['./agendar-cita.page.scss'],
})
export class AgendarCitaPage implements OnInit {

  constructor(
    private restService:RestService,
    private activatedRoute:ActivatedRoute
  ) { }

  paciente:Paciente={};
  centroMedico:Centro_Medico={};
  doctor:Doctor={};

  ngOnInit() {

		this.restService.paciente.get(parseInt(this.activatedRoute.snapshot.paramMap.get('idPaciente')))
	  		//his.restService.getPaciente(parseInt(this.activatedRoute.snapshot.paramMap.get('idPaciente')))
      .subscribe( paciente => {
        this.paciente = paciente;
      });
	  this.restService.doctor.get(parseInt(this.activatedRoute.snapshot.paramMap.get('idDoctor')))
	  //this.restService.getDoctor(parseInt(this.activatedRoute.snapshot.paramMap.get('idDoctor')))
    .subscribe( doctor => {
      this.doctor = doctor;
    })

	  this.restService.centro_medico.get( parseInt(this.activatedRoute.snapshot.paramMap.get('idCentroMedico')))
	  //this.restService.getCentroMedico(parseInt(this.activatedRoute.snapshot.paramMap.get('idCentroMedico')))
    .subscribe( centroMedico => {
      this.centroMedico = centroMedico;
    })

    // this.restService.getPaciente(parseInt(this.activatedRoute.snapshot.paramMap.get('idPaciente')))
    //   .subscribe( paciente => {
    //     this.paciente = paciente;
    //   });
    // this.restService.getDoctor(parseInt(this.activatedRoute.snapshot.paramMap.get('idDoctor')))
    // .subscribe( doctor => {
    //   this.doctor = doctor;
    // })
    // this.restService.getCentroMedico(parseInt(this.activatedRoute.snapshot.paramMap.get('idCentroMedico')))
    // .subscribe( centroMedico => {
    //   this.centroMedico = centroMedico;
    // })
  }

}
