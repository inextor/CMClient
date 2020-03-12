import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Subject,Observable,of } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { Paciente } from '../../models/Modelos';
import {map,distinctUntilChanged,mergeMap,delay} from 'rxjs/operators';
import {debounceTime} from 'rxjs/operators';
import { PaginacionComponent } from '../paginacion/paginacion.component';

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

	public totalPages:number	= 0;
	public totalItems: number 	= 0;
	public currentPage:number	= 0;
	public pages:number[]		= [];
	public pageSize:number		= 10;


	constructor(private rest:RestService)
	{
	}

	ngOnInit()
	{
		this.currentPage = 0;
		this.rest.paciente.getAll({},{limite:10}).subscribe((respuesta)=>
		{
			this.setPages( this.currentPage, respuesta.total );
			this.pacientes = respuesta.datos;
		});
	}

	setPages(currentPage:number,totalItems:number)
	{
		this.currentPage = currentPage;
		this.pages.splice(0,this.pages.length);
		this.totalItems = totalItems;

		console.log('Calculo con el pie derecho',this.totalPages, this.totalItems,	(this.totalPages % this.totalItems) );
		if( ( this.totalItems % this.pageSize ) > 0 )
		{
			this.totalPages = Math.floor(this.totalItems/this.pageSize)+1;
			console.log('First');
		}
		else
		{
			console.log('Second');
			this.totalPages = this.totalItems/this.pageSize;
		}

		//console.log('TOTAL Pages',this.totalPages,'current',this.currentPage,'total items',this.totalItems );

		for(let i=this.currentPage-5;i<this.currentPage+5;i++)
		{
			if( i >= 0 && i<this.totalPages)
			{
				this.pages.push( i );
			}
		}
		console.log( this.pages );
	}

	onKeyPressed(evt)
	{
		let input = <HTMLInputElement>document.getElementById('searchPaciente');
		console.log( input.value );
		if( this.last === input.value.trim() )
			return;

		this.last = input.value.trim();
		this.currentPage = 0;
		this.onSelectedPage(0);
	}

	onSelectedPage(page)
	{
		console.log('ON Selected page paciente',page);

		this.rest.paciente.search({lk:{nombre:this.last},limite:10,pagina:page}).subscribe((respuesta)=>
		{
			this.currentPage = page;
			this.setPages( this.currentPage, respuesta.total );
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
