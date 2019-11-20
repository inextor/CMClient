import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-toast-error',
  templateUrl: './toast-error.component.html',
  styleUrls: ['./toast-error.component.css']
})
export class ToastErrorComponent implements OnInit {

	show:boolean			= false;
	hightlight:boolean		= false;
	message_error:string	= null;

	constructor(private restService:RestService)
	{

	}

	ngOnInit()
	{
		this.restService.errorObservable.subscribe((error)=>
		{
			console.log("error",error);
			this.message_error	= error;
			this.show			= true;
			this.hightlight		= true;

			setTimeout(()=>{
				this.hightlight = false;
			},1500);
		});
	}

	clicked()
	{
		this.message_error = null;
		this.show = false;
		this.hightlight = false;
	}
}
