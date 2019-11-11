import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor,Paciente } from '../../models/Modelos';
import { Router,ActivatedRoute } from "@angular/router"
import { SeleccionarCentroMedicoComponent } from '../../components/seleccionar-centro-medico/seleccionar-centro-medico.component';
import { PreguntasHistoriaClinicaResponse } from '../../models/Respuestas';
import { switchMap,catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { BasePage } from '../base/base.page';
import { RespuestaPreguntaHistoriaClinica } from '../../models/Respuestas';
import { Respuesta } from '../../models/Respuestas';
import { Respuesta_Historia_Clinica } from '../../models/Modelos';

@Component({
  selector: 'app-llenar-historia-clinica',
  templateUrl: './llenar-historia-clinica.component.html',
  styleUrls: ['./llenar-historia-clinica.component.css']
})
export class LlenarHistoriaClinicaComponent  extends BasePage implements OnInit {

	preguntas:RespuestaPreguntaHistoriaClinica[] = [];
	doctor:Doctor = {};
	usuario:Usuario = null;
	paciente:Paciente = {};
	msgError:string = null;

	ngOnInit() {
		this.is_loading = true;
		this.route.paramMap.pipe(
			switchMap(params=>
			{
				let idDoctor	= parseInt( params.get('idDoctor') );
				let idPaciente	= parseInt( params.get('idPaciente') );

				return forkJoin([
					this.rest.doctor.get( idDoctor )
					,this.rest.paciente.get(idPaciente)
				])

			}),
			switchMap(response=>
			{
				console.log("doctor y paciente",response );
				this.doctor = response[0];
				this.paciente = response[1];

				//If id_especialidad is null then 1
				//

				return this.rest.getPreguntasRespuestasHistoriaClinica(  this.paciente.id,this.doctor.id, this.doctor.id_especialidad );
			}),
			catchError(error=>
			{
				this.is_loading = false;
				this.msgError = this.rest.getErrorMessage( error );
				return null;
			})
		).subscribe((response:Respuesta<RespuestaPreguntaHistoriaClinica>)=>
		{
			console.log('Preguntas',response);

			response.datos.forEach((i)=>
			{
				if( i.respuesta == null )
				{
					i.respuesta = {
						respuesta_binaria: null,
						respuesta: null,
						id_pregunta_historia_clinica : i.pregunta.id,
						id_paciente: this.paciente.id,
						id_doctor: this.doctor.id
					};
					console.log("NOT NULL NOW");
				}
			});

			console.log( response.datos );
			this.preguntas = response.datos;
			this.is_loading = false;

		},(error)=>
		{
			this.showError( error );
			//this.msgError = this.rest.getErrorMessage( error );
			//console.log( this.msgError );
		});
	}

	guardar()
	{
		this.is_loading = true;
		let respuestas:Respuesta_Historia_Clinica[] = this.preguntas.map( i => i.respuesta );

		this.rest.guardarRespuestasHistoriaClinica( respuestas ).subscribe((respuestas)=>
		{
			this.is_loading = false;
		}
		,(error)=>
		{
			this.showError( error );
			this.is_loading = false;
		});
	}
}
