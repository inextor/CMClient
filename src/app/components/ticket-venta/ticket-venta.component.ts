import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Observable, BehaviorSubject,forkJoin } from 'rxjs';
import { Requisicion, Venta } from 'src/app/models/Modelos';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { formatDate } from '@fullcalendar/core';

@Component({
  selector: 'app-ticket-venta',
  templateUrl: './ticket-venta.component.html',
  styleUrls: ['./ticket-venta.component.css']
})

export class TicketVentaComponent extends BaseComponent implements OnInit {
	@Input() show:boolean = false;
	@Input() closable:boolean = true;
  @Output() showChange= new EventEmitter<boolean>();
  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
    super( rest,router,route,location,titleService);
  }

  busqueda: string = '';
  venta: Venta[]=[]
  vent={
    id:null
  }
  ngOnInit() {
    // forkJoin([
    //   this.rest.venta.search({ eq: { id: this.vent.id} }),
    // ]).subscribe((respuestas) => {
    //   this.venta = respuestas[0].datos;
    //   console.log(this.venta)
    // }, (error) => this.showError(error));

    this.rest.keyUpObserver.subscribe((e)=>
		{
			if( e.keyCode == 27 )
			{
				if( this.closable )
				{
					this.showChange.emit( false );
				}
			}
		});
  }
  buscar(){
    forkJoin([
      this.rest.venta.search({ eq: { id: this.vent.id} }),
    ]).subscribe((respuestas) => {
      this.venta = respuestas;
      console.log(this.venta)
    }, (error) => this.showError(error));
  }
}
