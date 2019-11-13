import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Tipo_Gasto } from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';




@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit {


	constructor(
		public rest:RestService,
		public router:Router,
		public route:ActivatedRoute,
		public location: Location
	) {

		//this.rest.getNetworkMonitor().subscribe((is_loading)=>
		//{
		//	console.log('is_loading');
		//});
	}

	public is_loading:boolean	= false;
	public totalPages:number	= 0;
	public totalItems: number 	= 0;
	public currentPage:number	= 0;
	public pages:number[]		= [];
	public pageSize:number		= 10;

	public error_message		= null;
	public success_message		= null;
	public warning_message		= null;

	setPages(currentPage:number,totalItems:number)
	{
		this.currentPage = currentPage;
		this.pages.splice(0,this.pages.length);
		this.totalItems = totalItems;

		console.log('Calculo con el pie derecho',this.totalPages, this.totalItems,  (this.totalPages % this.totalItems) );
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

		console.log('TOTAL Pages',this.totalPages,'current',this.currentPage,'total items',this.totalItems );

		for(let i=this.currentPage-5;i<this.currentPage+5;i++)
		{
			if( i >= 0 && i<this.totalPages)
			{
				this.pages.push( i );
			}
		}
		console.log( this.pages );
	}

	ngOnInit() {
		//this.rest.getNetworkMonitor().subscribe((is_loading)=>
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
}
