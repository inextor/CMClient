import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Subject,Observable,of } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { Paciente } from '../../models/Modelos';
import {map,distinctUntilChanged,mergeMap,delay} from 'rxjs/operators';
import {debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-seleccionar-paciente',
  templateUrl: './seleccionar-paciente.component.html',
  styleUrls: ['./seleccionar-paciente.component.css']
})
export class SeleccionarPacienteComponent implements OnInit {

	@Input() show:boolean;
	@Input() showCancel:boolean;
	@Output() selected = new EventEmitter<Paciente>();


	pacientes:Paciente[] = [];
	last:string = '';


	constructor(private rest:RestService)
	{
	}

	ngOnInit()
	{
		this.rest.paciente.getAll({}).subscribe((respuesta)=>
		{
			this.pacientes = respuesta.datos;
		});

	}

	onKeyPressed(evt)
	{
		let input = <HTMLInputElement>document.getElementById('searchPaciente');
		console.log( input.value );
		if( this.last === input.value.trim() )
			return;

		this.last = input.value.trim();

		this.rest.paciente.getAll({nombre:this.last},{limit:10}).subscribe((respuesta)=>
		{
			this.pacientes = respuesta.datos;
		});
	}


	dismissModal()
	{
//		this.modalCtrl.dismiss(null);
	}

	seleccionarPaciente(paciente:Paciente)
	{
		this.selected.emit( paciente );
	}
}
