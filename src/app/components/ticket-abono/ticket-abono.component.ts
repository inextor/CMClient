import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Observable, BehaviorSubject,forkJoin } from 'rxjs';

@Component({
  selector: 'app-ticket-abono',
  templateUrl: './ticket-abono.component.html',
  styleUrls: ['./ticket-abono.component.css']
})
export class TicketAbonoComponent implements OnInit {
	@Input() show:boolean = false;
	@Input() closable:boolean = true;
	@Output() showChange= new EventEmitter<boolean>();
  constructor(private rest:RestService) { }

  ngOnInit() {
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
  

}
