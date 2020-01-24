import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Gasto_Centro_Medico, Tipo_Gasto, Ingreso } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse, SearchObject } from '../../models/Respuestas';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-ingresos',
	templateUrl: './ingresos.component.html',
	styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent extends BaseComponent implements OnInit {
	showAddIngreso: boolean = false;
	ingresos: Ingreso[] = [];
	ingreso_search:SearchObject<Ingreso>;
	@Input() onClose:boolean;

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	ngOnInit() {

		this.route.queryParams.subscribe( params =>
		{
			this.ingreso_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};

			this.titleService.setTitle('Ingresos');
			let usuario = this.rest.getUsuarioSesion().id;
			this.ingreso_search.lk.nota	= "lk.nota" in params ?params["lk.nota"]:null;
			this.ingreso_search.limite			= this.pageSize;
			this.ingreso_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			this.is_loading = true;

			this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );

			this.rest.ingreso.search(this.ingreso_search)
				.subscribe(respuesta => {
					
					this.ingresos = respuesta.datos;
					this.setPages( this.ingreso_search.pagina, respuesta.total );
					this.is_loading = false;
				});
		});
	}

	ingresoClosed(itChanged)
	{
		console.log("IT CHANGED");
		if( itChanged )
		{
			this.rest.ingreso.search(this.ingreso_search)
			.subscribe(respuesta => {
				this.is_loading = false;
				this.ingresos = respuesta.datos;
				this.setPages( this.ingreso_search.pagina, respuesta.total );
			})
		}
	}

	search()
	{
		this.is_loading = true;
		this.ingreso_search.pagina = 0;
		this.ingreso_search.lk.nota	= this.ingreso_search.lk.nota;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.ingreso_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.ingreso_search[i])
                    search[i+'.'+j] = this.ingreso_search[i][j];
            }
        }
		console.log( search );
		this.is_loading = false;
		this.router.navigate(['ingresos'],{queryParams: search});
	}

}
