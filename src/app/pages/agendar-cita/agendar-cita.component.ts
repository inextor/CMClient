import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente, Centro_Medico, Doctor, Cita, Servicio } from 'src/app/models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Observable, BehaviorSubject,forkJoin, fromEvent,of} from 'rxjs';

@Component({
	selector: 'app-agendar-cita',
	templateUrl: './agendar-cita.component.html',
	styleUrls: ['./agendar-cita.component.css'],
})

export class AgendarCitaComponent extends BaseComponent implements OnInit {

	paciente:Paciente			={};
	centro_medico:Centro_Medico	={};
	doctor:Doctor				={};
	servicio:Servicio 			={};

	ngOnInit()
	{
		this.route.paramMap.subscribe(params=>
		{
			console.log( params );
			forkJoin
			([
				this.rest.doctor.get( params.get('id_doctor') )
				,this.rest.paciente.get( params.get('id_paciente') )
				,this.rest.centro_medico.get( params.get('id_paciente') )
			])
			.subscribe((responses)=>
			{
				this.doctor	= responses[0];
				this.paciente = responses[1];
				this.centro_medico =  responses[2];


			},(error)=>this.showError(error));
		});
	}

	onCitaAgendada(cita:Cita)
	{
		console.log('Cita is cita', cita );
		this.router.navigate(['/citas']);
	}
}
