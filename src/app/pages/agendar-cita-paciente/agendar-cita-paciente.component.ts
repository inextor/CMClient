import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente, Centro_Medico, Doctor, Cita, Servicio } from 'src/app/models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Observable, BehaviorSubject,forkJoin, fromEvent,of} from 'rxjs';

@Component({
  selector: 'app-agendar-cita-paciente',
  templateUrl: './agendar-cita-paciente.component.html',
  styleUrls: ['./agendar-cita-paciente.component.css']
})
export class AgendarCitaPacienteComponent extends BaseComponent implements OnInit {

	paciente:Paciente			={};
	centro_medico:Centro_Medico	={};
	doctor:Doctor				={};
	servicio:Servicio 			={};

  ngOnInit() {
    this.route.paramMap.subscribe(params=>
      {
        console.log( params );
        forkJoin
        ([
          this.rest.doctor.get( params.get('id_doctor') )
          ,this.rest.paciente.get( params.get('id_paciente') )
          ,this.rest.centro_medico.get( params.get('id_centro_medico') )
          ,this.rest.servicio.get(params.get('id_servicio'))
        ])
        .subscribe((responses)=>
        {
          this.doctor	= responses[0];
          this.paciente = responses[1];
          this.centro_medico =  responses[2];
          this.servicio =  responses[3];
  
        },(error)=>this.showError(error));
      });
    }
  
    onCitaAgendada(cita:Cita)
    {
      console.log('Cita is cita', cita );
      this.router.navigate(['/citas-paciente']);
  
    }
  
}
