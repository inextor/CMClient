import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { Consulta } from '../../models/Modelos';
import { Servicio_Recurso } from '../../models/Respuestas';
import { from } from 'rxjs';
import { Location } from	'@angular/common';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router"



@Component({
	selector: 'app-ver-consultas',
	templateUrl: './ver-consultas.component.html',
	styleUrls: ['./ver-consultas.component.css']
})

export class VerConsultasComponent extends BaseComponent implements OnInit {

	id_paciente:number = null;
	id_doctor:number = null;
	consultas:Consulta[] = [];
	paciente:Paciente = {};

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			this.id_paciente = params.get('id_paciente') ==null ? null : parseInt(params.get('id_paciente') );
			this.id_paciente = params.get('id_doctor') ==null ? null : parseInt(params.get('id_doctor') );
			this.is_loading = true;

			this.rest.paciente.get( this.id_paciente ).subscribe((paciente)=>
			{
				this.paciente = paciente;
			});

			this.rest.consulta.getAll({ id_paciente:this.id_paciente,id_doctor:this.id_doctor }).subscribe((consultas)=>
			{
				this.consultas = consultas.datos;
				this.is_loading = false;
			},error=>this.showError(error));
		});
	}
}
