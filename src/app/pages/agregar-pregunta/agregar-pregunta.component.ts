import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Pregunta_Historia_Clinica,Doctor} from '../../models/Modelos';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-agregar-pregunta',
	templateUrl: './agregar-pregunta.component.html',
	styleUrls: ['./agregar-pregunta.component.css'],
})
export class AgregarPreguntaComponent extends BaseComponent implements OnInit {


	preguntas_generales:Pregunta_Historia_Clinica[] = [];
	pregunta:Pregunta_Historia_Clinica = {

	};

	ngOnInit() {
		this.route.paramMap.subscribe( params =>{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			this.is_loading = true;

			if( id )
			{
				forkJoin
				(
					[
						this.rest.pregunta_historia_clinica.get( id ),
						this.rest.pregunta_historia_clinica.getAll({ tipo_pregunta:'PREGUNTA_GENERAL' })
					]
				).subscribe((response)=>
				{
					this.is_loading				= false;
					this.pregunta				= response[0];
					this.preguntas_generales	= response[1].datos;
				},(error) => {
					this.showError(error);
					this.is_loading = false;
				});
			}
			else
			{
				this.rest.pregunta_historia_clinica.getAll({ tipo_pregunta:'PREGUNTA_GENERAL' }).subscribe((respuesta)=>
				{
					this.is_loading = false;
					this.preguntas_generales = respuesta.datos;
				});
			}
		});
	}

	guardar()
	{
		this.is_loading = true;

		if( this.pregunta.id )
		{
			///this.rest.actualizarDoctor( this.doctor ).subscribe((doctor)=>
			this.rest.pregunta_historia_clinica.update( this.pregunta ).subscribe( (pregunta) =>
			{
				this.pregunta = pregunta;
				this.location.back();
			});
		}
		else
		{
			this.rest.pregunta_historia_clinica.create( this.pregunta ).subscribe( pregunta =>
			{
				this.pregunta = pregunta;
				this.location.back();
			});
		}
	}
}
