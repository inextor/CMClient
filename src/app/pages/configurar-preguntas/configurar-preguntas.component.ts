import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { Pregunta_Historia_Clinica, Especialidad_Pregunta, Cita } from '../../models/Modelos';
import { PreguntasHistoriaClinicaResponse } from '../../models/Respuestas';
import { Especialidad_Pregunta_Accion } from '../../models/Respuestas';
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-configurar-preguntas',
  templateUrl: './configurar-preguntas.component.html',
  styleUrls: ['./configurar-preguntas.component.css']
})
export class ConfigurarPreguntasComponent extends BaseComponent implements OnInit {
  is_loading: boolean = false;
  // constructor(private rest:RestService,private router:Router,private route:ActivatedRoute) { }


  preguntas: Pregunta_Historia_Clinica[] = []; //All the questions
  preguntasEspecialidad: PreguntasHistoriaClinicaResponse[] = [];
  busquedaPreguntas: Pregunta_Historia_Clinica[] = [];//Busqueda
  id_especialidad: number;

  preguntasGeneral: PreguntasHistoriaClinicaResponse[] = [];
  preguntasOdontograma: PreguntasHistoriaClinicaResponse[] = [];
  pregunta: Pregunta_Historia_Clinica = {
    tipo_pregunta: '',
    pregunta: '',
    es_pregunta_binaria: '',
    depende_del_genero: '',
  };

  preguntas_odontograma: Pregunta_Historia_Clinica[] = [];
  preguntas_seccion_a: Pregunta_Historia_Clinica[] = [];
  preguntas_seccion_b: Pregunta_Historia_Clinica[] = [];
  preguntas_seccion_c: Pregunta_Historia_Clinica[] = [];
  preguntas_seccion_d: Pregunta_Historia_Clinica[] = [];

  seleccionarAnalisis: boolean = false;
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id_especialidad = parseInt(params.get('idEspecialidad'))
      console.log("Especialidad", this.id_especialidad);
      this.is_loading = true;
      ///TODO FIXME debe de pasar algun tipo de parametro
      // ANTERIO TAMBIEN ESTABA MAL this.rest.getPreguntas().subscribe((respuesta)=>
      forkJoin([
        this.rest.pregunta_historia_clinica.getAll({}),
        this.rest.odontograma.getAll({})
      ]).subscribe((respuestas) => {
        this.is_loading = false;
        this.preguntas = respuestas[0].datos;
        console.log('pregs',this.preguntas);
        console.log("preguntas", this.preguntas);
        this.actualizarPreguntas();
        this.seccionarDatos(respuestas[1].datos)
      }, (error) => this.showError(error));
      // this.rest.pregunta_historia_clinica.getAll({}).subscribe((respuesta) => {
      //   this.is_loading = false;
      //   this.preguntas = respuesta.datos;
      //   console.log("preguntas", this.preguntas);
      //   this.seccionarDatos(respuesta.datos)
      //   this.actualizarPreguntas();
      // }, error => this.showError(error));
    });
  }

  buscar(term) {
    this.busquedaPreguntas = this.preguntas.filter((p) => {
      return p.pregunta.toLowerCase().indexOf(term) > -1;
    });
  }


  async showError(message: string) {

    /*
    const alert = await this.alertController.create({
      header: 'Error',
      //subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    this.is_loading = false;
    */
  }

  /*
agregarPregunta(pregunta:Pregunta_Historia_Clinica)
{
  return this.rest.agregarPregunta(pregunta).subscribe((e_p)=>
  {
    this.preguntasEspecialidad.push( pregunta );
  });
}
   */


  actualizarPreguntas() {
    this.is_loading = true;
    this.rest.getPreguntasEspecialidad(this.id_especialidad).subscribe((preguntas) => {
      this.preguntasEspecialidad = preguntas.datos;
      console.log('preguntaespecialidadactualizacion',this.preguntasEspecialidad);
      this.busquedaPreguntas = this.preguntas.filter((i) => {
        return !this.preguntasEspecialidad.some(j => j.pregunta_historia_clinica.id == i.id);
      });
      this.is_loading = false;
    }, error => this.showError(error));
  }

  mover(especialidadPregunta: Especialidad_Pregunta, accion: string) {
    this.is_loading = true;
    let e: Especialidad_Pregunta_Accion = { accion };

    for (let i in especialidadPregunta)
      e[i] = especialidadPregunta[i];

    //this.rest.editEspecialidadPregunta( especialidadPregunta, accion ).subscribe((foo)=>
    this.rest.especialidad_pregunta.update(e).subscribe((foo) => {
      this.is_loading = false;
      console.log('FOOO');
      this.actualizarPreguntas();
    }, error => this.showError(error));
  }

  agregarEspecialidadPregunta(pregunta: Pregunta_Historia_Clinica) {
    //return this.rest.agregarEspecialidadPregunta(pregunta.id,this.id_especialidad).subscribe((ep)=>
    return this.rest.especialidad_pregunta.create({ id_pregunta_historia_clinica: pregunta.id, id_especialidad: this.id_especialidad }).subscribe((ep) => {
      this.actualizarPreguntas();
    }, error => this.showError(error));
  }

  deleteEspecialidadPregunta(especialidadPregunta) {
    //return this.rest.deleteEspecialidadPregunta(especialidadPregunta.id).subscribe((response)=>
    console.log("REMOVE", especialidadPregunta);
    return this.rest.especialidad_pregunta.delete(especialidadPregunta).subscribe((response) => {
      this.actualizarPreguntas();
    }, error => this.showError(error));
  }

  createOdontograma() {

    forkJoin([
      this.rest.odontograma.create(this.pregunta)
    ]).subscribe((respuestas) => {
      console.log('preguntasEspecialidad',this.preguntas);
      this.rest.pregunta_historia_clinica.getAll({}).subscribe((respuesta) => {
        this.is_loading = false;
        this.preguntas = respuesta.datos;
        console.log("preguntas", this.preguntas);
        this.preguntas.forEach((i) => {
          if (i.tipo_pregunta == 'PREGUNTA_ODONTOGRAMA') {
            this.agregarEspecialidadPregunta(i);
          }
        })
        this.actualizarPreguntas();
      }, error => this.showError(error));
      this.showSuccess('Se agrego el odontograma con exito.');
    }, (error) => this.showError(error));

    // this.rest.odontograma.create(this.pregunta).subscribe((pregunta) => {
    //   this.pregunta = pregunta;
    //   this.showSuccess('Se agrego el odontograma con exito.');
    //   this.actualizarPreguntas();

    // }, error => this.showError(error));

  }
  createPregunta() {

  }

  seccionarDatos(datos) {
    let preguntas_odontograma: Pregunta_Historia_Clinica[] = [];
    let preguntas_seccion_a: Pregunta_Historia_Clinica[] = [];
    let preguntas_seccion_b: Pregunta_Historia_Clinica[] = [];

    preguntas_odontograma = datos;
    preguntas_seccion_a = preguntas_odontograma.slice(0, 80);
    preguntas_seccion_b = preguntas_odontograma.slice(80, 160);

    this.preguntas_odontograma = preguntas_odontograma;
    this.preguntas_seccion_a = preguntas_seccion_a;
    this.preguntas_seccion_b = preguntas_seccion_b;

  }
  registrarRespuesta(pregunta) {
    this.seleccionarAnalisis = true;
  }
}
