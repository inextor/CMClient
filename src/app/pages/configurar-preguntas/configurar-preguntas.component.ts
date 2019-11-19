import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor } from '../../models/Modelos';
import { Router,ActivatedRoute} from "@angular/router"
import { Pregunta_Historia_Clinica,Especialidad_Pregunta,Cita } from '../../models/Modelos';
import { PreguntasHistoriaClinicaResponse } from '../../models/Respuestas';
import { Especialidad_Pregunta_Accion } from '../../models/Respuestas';


@Component({
  selector: 'app-configurar-preguntas',
  templateUrl: './configurar-preguntas.component.html',
  styleUrls: ['./configurar-preguntas.component.css']
})
export class ConfigurarPreguntasComponent implements OnInit {
    is_loading:boolean = false;
	constructor(private rest:RestService,private router:Router,private route:ActivatedRoute) { }


	preguntas:Pregunta_Historia_Clinica[] = []; //All the questions
	preguntasEspecialidad:PreguntasHistoriaClinicaResponse[] = [];
	busquedaPreguntas:Pregunta_Historia_Clinica[] = [];//Busqueda
	id_especialidad:number;

	ngOnInit() {

		this.route.paramMap.subscribe( params =>
		{
			this.id_especialidad = parseInt (params.get('idEspecialidad') )
			console.log("Especialidad",this.id_especialidad);
			this.is_loading = true;
			///TODO FIXME debe de pasar algun tipo de parametro
			// ANTERIO TAMBIEN ESTABA MAL this.rest.getPreguntas().subscribe((respuesta)=>
			this.rest.pregunta_historia_clinica.getAll({}).subscribe((respuesta)=>
			{	this.is_loading = false ;
				this.preguntas = respuesta.datos;
				this.actualizarPreguntas();
			},error=>this.showError(error));
		});
	}

	buscar(term)
	{
		this.busquedaPreguntas = this.preguntas.filter((p)=>
		{
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


	actualizarPreguntas()
	{
		this.is_loading = true;
		this.rest.getPreguntasEspecialidad( this.id_especialidad ).subscribe((preguntas)=>
		{
			this.preguntasEspecialidad	= preguntas.datos;
			this.busquedaPreguntas = this.preguntas.filter((i)=>{
				return !this.preguntasEspecialidad.some(j=>j.pregunta_historia_clinica.id == i.id);
			});
			this.is_loading = false;
		}, error=>this.showError(error));
	}

	mover(especialidadPregunta:Especialidad_Pregunta,accion:string)
	{
		this.is_loading = true;
		let e:Especialidad_Pregunta_Accion = {accion};

		for(let i in especialidadPregunta)
			e[i] = especialidadPregunta[i];

		//this.rest.editEspecialidadPregunta( especialidadPregunta, accion ).subscribe((foo)=>
		this.rest.especialidad_pregunta.update( e ).subscribe((foo)=>
		{
			this.is_loading = false;
			console.log('FOOO');
			this.actualizarPreguntas();
		},error=>this.showError(error));
	}

	agregarEspecialidadPregunta(pregunta:Pregunta_Historia_Clinica)
	{
		//return this.rest.agregarEspecialidadPregunta(pregunta.id,this.id_especialidad).subscribe((ep)=>
		return this.rest.especialidad_pregunta.create({ id_pregunta_historia_clinica: pregunta.id, id_especialidad:this.id_especialidad}).subscribe((ep)=>
		{
			this.actualizarPreguntas();
		},error=>this.showError(error));
	}

	deleteEspecialidadPregunta(especialidadPregunta)
	{
		//return this.rest.deleteEspecialidadPregunta(especialidadPregunta.id).subscribe((response)=>
		console.log("REMOVE",especialidadPregunta);
		return this.rest.especialidad_pregunta.delete(especialidadPregunta.id).subscribe((response)=>
		{
			this.actualizarPreguntas();
		},error=>this.showError(error));
	}
}
