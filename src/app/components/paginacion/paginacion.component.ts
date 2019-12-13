import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
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

	@Input() path:string = null;
	@Input() totalPages:number;
	@Input() currentPage:number;
	@Input() pages:number[];
	@Output() selectedPage = new EventEmitter<number>();

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

	gotoPage(page:number)
	{
		if( this.path !== null )
		{
			this.selectedPage.emit( page );
		}
		else
		{
			let params = { pagina: page }
			this.router.navigate([this.path],{queryParams: params,  queryParamsHandling:"merge"});
		}
		//[routerLink]="[path]" [queryParams]="{pagina:totalPages-1}" queryParamsHandling="merge"
	}
}
