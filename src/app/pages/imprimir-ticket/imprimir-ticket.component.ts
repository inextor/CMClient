import { Component, OnInit } from '@angular/core';
import { RestService,DetalleServicio  } from '../../services/rest.service';
import { Usuario,Tipo_Precio,Precio_Servicio} from '../../models/Modelos';
import { Router,ActivatedRoute,Params} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { forkJoin,of } from 'rxjs';
import { mergeMap,catchError,flatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Servicio,Pago,Centro_Medico} from '../../models/Modelos';
import { Detalle_Venta,Venta} from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { DatosVenta } from '../../services/rest.service';

@Component({
	selector: 'app-imprimir-ticket',
	templateUrl: './imprimir-ticket.component.html',
	styleUrls: ['./imprimir-ticket.component.css']
})

export class ImprimirTicketComponent extends BaseComponent implements OnInit {

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title)
	{
		super( rest,router, route, location, titleService );
	}

	datosVenta:DatosVenta	= null;
	imprimir:number = false;

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			let id_venta	= parseInt( params.get('id') );
			this.is_loading = true;
			this.imprimir	= parseInt( params.get('imprimir') | 0 );
			this.rest.getDatosVenta( id_venta ).subscribe((datosVenta)=>
			{
				this.is_loading = false;
				this.datosVenta = datosVenta;
				if( this.imprimir>0 )
				{
					setTimeout(()=>
					{
						window.print();
						this.router.navigate(['/punto-venta']);
					},1000);
				}
			},
			(error)=>this.showError(error));
		});
	}
}
