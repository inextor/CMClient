import { Component, OnInit, ɵConsole } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor,Paciente, Pregunta_Historia_Clinica } from '../../models/Modelos';
import { Router,ActivatedRoute } from "@angular/router"
import { SeleccionarCentroMedicoComponent } from '../../components/seleccionar-centro-medico/seleccionar-centro-medico.component';
import { PreguntasHistoriaClinicaResponse } from '../../models/Respuestas';
import { switchMap,catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { RespuestaPreguntaHistoriaClinica } from '../../models/Respuestas';
import { Respuesta } from '../../models/Respuestas';
import { Respuesta_Historia_Clinica } from '../../models/Modelos';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-llenar-historia-clinica',
  templateUrl: './llenar-historia-clinica.component.html',
  styleUrls: ['./llenar-historia-clinica.component.css']
})
export class LlenarHistoriaClinicaComponent  extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	preguntas:RespuestaPreguntaHistoriaClinica[] = [];
	doctor:Doctor = {};
	usuario:Usuario = null;
	paciente:Paciente = {};
  msgError:string = null;
  pregunta: Pregunta_Historia_Clinica = {
    tipo_pregunta: '',
    pregunta: '',
    es_pregunta_binaria: '',
    depende_del_genero: '',
  };

  preguntas_odontograma:RespuestaPreguntaHistoriaClinica[]  = [];
  preguntas_seccion_a:RespuestaPreguntaHistoriaClinica[] = [];
  preguntas_seccion_b:RespuestaPreguntaHistoriaClinica[] = [];

  seleccionarAnalisis: boolean = false;
  opcion_odontograma:string;
  respuesta_odontograma:RespuestaPreguntaHistoriaClinica;
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
				this.showError( error );
				return null;
			})
		).subscribe((response:Respuesta<RespuestaPreguntaHistoriaClinica>)=>
		{
			console.log('Preguntas',response);
      this.rest.getPreguntasRespuestasOdontograma(  this.paciente.id,this.doctor.id, this.doctor.id_especialidad ).subscribe((response)=>{
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
        this.seccionarDatos(response.datos);
      })
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

      console.log('estas son las preguntas',response.datos );

      this.preguntas = response.datos;
			this.is_loading = false;

		},error=>this.showError(error));
	}


	guardar()
	{
		this.is_loading = true;
		let respuestas:Respuesta_Historia_Clinica[] = this.preguntas.map( i => i.respuesta );

		this.rest.guardarRespuestasHistoriaClinica( respuestas ).subscribe((respuestas)=>
		{
			this.is_loading = false;
		},this.showError );
  }

  createOdontograma() {

    this.rest.odontograma.create(this.pregunta).subscribe((pregunta) => {
      this.pregunta = pregunta;
      this.showSuccess('Se agrego el odontograma con exito.');
    }, error => this.showError(error));

  }

  seccionarDatos(datos){
    let preguntas_odontograma:RespuestaPreguntaHistoriaClinica[] = [];
    let preguntas_seccion_a:RespuestaPreguntaHistoriaClinica[] = [];
    let preguntas_seccion_b:RespuestaPreguntaHistoriaClinica[] = [];
    console.log('i',datos);
    datos.forEach((i)=>{
      if(i.pregunta.tipo_pregunta=='PREGUNTA_ODONTOGRAMA'){
        console.log('i',i);
        preguntas_odontograma.push(i);
      }
    })
    preguntas_seccion_a = preguntas_odontograma.slice(0,80);
    preguntas_seccion_b = preguntas_odontograma.slice(80,160);

    console.log('preguntas_seccion_a',preguntas_seccion_a);
    console.log('preguntas_seccion_b',preguntas_seccion_b);

    this.preguntas_odontograma = preguntas_odontograma;
    this.preguntas_seccion_a = preguntas_seccion_a;
    this.preguntas_seccion_b = preguntas_seccion_b;
  }

   registrarRespuesta(respuesta){
     this.respuesta_odontograma = respuesta;
    this.seleccionarAnalisis = true;
   }

   guardarRespuestaOdontograma(){
    this.is_loading = true;
    let respuesta: Respuesta_Historia_Clinica
    this.respuesta_odontograma.respuesta.respuesta = this.opcion_odontograma;
    let respuestas:Respuesta_Historia_Clinica[] = [];
    respuestas.push(this.respuesta_odontograma.respuesta);
    this.rest.guardarRespuestasHistoriaClinica( respuestas ).subscribe((respuestas)=>
		{
      this.is_loading = false;
      this.showSuccess('Se registro la opcion')
      this.seleccionarAnalisis = false;
		},error=>this.showError(error) );

   }

}
