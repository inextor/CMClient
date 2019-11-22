import { Component, OnInit,Input } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Tipo_Gasto } from '../../models/Modelos';
import { Router,ActivatedRoute} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';



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
	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location)
	{

	}

	ngOnInit() {
		this.route.queryParams.subscribe((queryParams)=>
		{
			console.log("new foo");
		});
	}

}
