import { Component, OnInit } from '@angular/core';
import { RestService,ErrorMensaje } from '../../services/rest.service';


interface Msg_Class{
	[key:string]:boolean;
}
@Component({
  selector: 'app-toast-error',
  templateUrl: './toast-error.component.html',
  styleUrls: ['./toast-error.component.css']
})
export class ToastErrorComponent implements OnInit {

	show:boolean			= false;
	hightlight:boolean		= false;
	message: ErrorMensaje	= null;
	class_obj:Msg_Class	= { }

	constructor(private restService:RestService)
	{

	}

	ngOnInit()
	{
		this.restService.errorObservable.subscribe((error)=>
		{
			if( error == null )
				return;

			console.log("error",error);
			this.message	= error;
			this.show			= true;
			this.hightlight		= true;

			this.class_obj = {
				alert: true
			}

			this.class_obj[error.tipo] = true;

			setTimeout(() => {
				this.hightlight = false;
				this.show = false;
			}, 3500);
		});
		// this.restService.errorObservable.subscribe((error)=>
		// {
		// 	console.log("error",error);
		// 	this.message	= error;
		// 	this.show			= true;
		// 	this.hightlight		= true;

		// 	setTimeout(()=>{
		// 		this.hightlight = false;
		// 		this.show = false;
		// 	},3500);
		// });
	}

	clicked()
	{
		this.message = null;
		this.show = false;
		this.hightlight = false;
	}
}
