import { Component, OnInit } from '@angular/core';
import { RestService, DatosVenta } from '../../services/rest.service';
import { Usuario,Gasto_Centro_Medico,Tipo_Gasto, Pago_Poliza, Paciente, Tipo_Precio, Centro_Medico, Poliza, Servicio, Precio_Servicio, Pago, Venta, Aseguranza } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin, of } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse, SearchObject } from '../../models/Respuestas';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { flatMap } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-pagos-aseguranza',
  templateUrl: './pagos-aseguranza.component.html',
  styleUrls: ['./pagos-aseguranza.component.css']
})
export class PagosAseguranzaComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		//import { Title } from '@angular/platform-browser';
		super( rest,router,route,location,titleService);
	}

 	pagos:Pago[] = [];
  usuarios: Paciente[]=[];
	usuarios_dic:any = {};
	pago_aseguranza_search:SearchObject<Pago>;

	aseguranzas:Aseguranza[]=[];
	aseguranzas_dic:any = {};

	ngOnInit() {
		this.titleService.setTitle('Pagos Aseguranza')
    let usuario = this.rest.getUsuarioSesion();
    let centro_medico = this.rest.getCurrentCentroMedico();
		this.is_loading = true;
		this.route.queryParams.subscribe( params =>
			{
				this.pago_aseguranza_search = {
					eq: {},
					gt: {},
					ge: {},
					le: {},
					lt: {},
					lk: {},
					csv: {},
				};
        console.log("params",params);
    		this.pago_aseguranza_search.eq.id_aseguranza	= "id" in params ?params["id"]:null;
		    this.pago_aseguranza_search.pagina =  'pagina' in params ? parseInt( params.pagina ) : 0;
		    this.pago_aseguranza_search.limite = this.pageSize;
      this.currentPage = this.pago_aseguranza_search.pagina;
    
		forkJoin(
			[
        this.rest.pago.search(this.pago_aseguranza_search),
        this.rest.usuario.getAll({}),
        this.rest.aseguranza.getAll({})

			]
		).subscribe(
			(response:any[])=>
			{
				console.log("gastos",response);
        		this.pagos = response[0].datos;
        		this.usuarios = response[1].datos;
        		this.usuarios.forEach(i=>this.usuarios_dic[ i.id ] =  i);
        // this.tipos_gasto.forEach(i=> this.tipo_gastos_dic[ i.id ] =  i);
        
        this.aseguranzas = response[2].datos;
        this.aseguranzas.forEach(i=>this.aseguranzas_dic[ i.id ] =  i);
        console.log('ventas',this.aseguranzas_dic);
				this.setPages( this.pago_aseguranza_search.pagina, response[0].total );
				this.is_loading = false;
			}
			,(error)=>
			{
				this.showError( error );
				this.is_loading = false ;
			}
		);
	});
	}

	search()
	{
		this.is_loading = true;
		this.pago_aseguranza_search.pagina= 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.pago_aseguranza_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.pago_aseguranza_search[i])
                    search[i+'.'+j] = this.pago_aseguranza_search[i][j];
            }
		}
		this.is_loading = false;
		this.router.navigate(['pagos-aseguranza'],{queryParams: search});
	}

}
