import { Component, OnInit, Input,Output,EventEmitter	} from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Observable, BehaviorSubject,forkJoin } from 'rxjs';
import { Requisicion, Venta, Usuario, Pago, Detalle_Venta, Centro_Medico } from 'src/app/models/Modelos';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { DatosVenta } from '../../services/rest.service';

@Component({
	selector: 'app-ticket-venta',
	templateUrl: './ticket-venta.component.html',
	styleUrls: ['./ticket-venta.component.css']
})

export class TicketVentaComponent extends BaseComponent implements OnInit {

	_datosVenta:DatosVenta

	@Input('datosVenta')
	set datosVenta(dv:DatosVenta)
	{
		console.log('Detalles Venta', dv );
		this._datosVenta = dv;
		this.indice_pago = 0;
	}

	@Input() indice_pago:number = 0;

	ngOnInit()
	{

	}

}

