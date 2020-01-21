import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Subject,Observable,of } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { Centro_Medico } from '../../models/Modelos';
import {map,distinctUntilChanged,mergeMap,delay} from 'rxjs/operators';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-seleccionar-centro-medico',
  templateUrl: './seleccionar-centro-medico.component.html',
  styleUrls: ['./seleccionar-centro-medico.component.css']
})

export class SeleccionarCentroMedicoComponent implements OnInit {

	@Input() show:boolean;
	@Input() showCancel:boolean;
	@Output() selected = new EventEmitter<Centro_Medico>();


	centros:Centro_Medico[] = [];
	last:string = '';

	constructor(private rest:RestService)
	{
	}

	ngOnInit()
	{
		let usuario = this.rest.getUsuarioSesion();

		this.rest.centro_medico.search({eq:{ id_organizacion: usuario.id_organizacion }}).subscribe((respuesta)=>
		{
			this.centros = respuesta.datos;
		});
	}

	onKeyPressed(evt)
	{
		let input = <HTMLInputElement>document.getElementById('searchCentroMedico');
		console.log( input.value );
		if( this.last === input.value.trim() )
			return;
			// ,{limit:10} dentro de search
		this.last = input.value.trim();
		let usuario = this.rest.getUsuarioSesion();

		this.rest.centro_medico.search
		({
			eq:{ id_organizacion: usuario.id_organizacion }
			,lk: { nombre:this.last}
		}).subscribe((respuesta)=>
		{
			this.centros = respuesta.datos;
		});
	}


	dismissModal()
	{
//		this.modalCtrl.dismiss(null);
	}

	seleccionarCentro(centro_medico:Centro_Medico)
	{
		this.selected.emit( centro_medico );
	}
}
