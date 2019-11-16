import { Component, OnInit,Input } from '@angular/core';

@Component({
	selector: 'app-paginacion',
	templateUrl: './paginacion.component.html',
	styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {

	@Input() path:string;
	@Input() totalPages:number;
	@Input() currentPage:number;
	@Input() pages:number[];

	/*
	@Input('total') set allowDay(value: boolean) {
		this._total = value;
		if( this.itemPerPage )
		{
		}
		this.updatePeriodTypes();
	}
	<app-paginacion [path]="'/tipo-precio'"  [totalPages]="totalPages" [currentPage]="currentPage"></app-paginacion>
	*/
	constructor() { }

	ngOnInit() {
	}

}
