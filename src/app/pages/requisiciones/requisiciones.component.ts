import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor, Centro_Medico, Proveedor, Servicio, Requisicion } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { SearchObject } from '../../models/Respuestas';

@Component({
  selector: 'app-requisiciones',
  templateUrl: './requisiciones.component.html',
  styleUrls: ['./requisiciones.component.css']
})
export class RequisicionesComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }

  servicios: Servicio[] = [];
  requisiciones_search: SearchObject<Requisicion> = {};
  busqueda: string = '';
  todos_servicios: [] = [];
  requisiciones: Requisicion[] = [];
  proveedores:Proveedor[]=[];
  proveedor_dic:any = {};
  busquedaAvanzada:boolean = false;
  clearBusqueda(){
		this.requisiciones_search = {
			eq: {},
			gt: {},
			ge: {},
			le: {},
			lt: {},
			lk: {},
			csv: {},
		};
		this.search();
	}
  ngOnInit() {
    let centro_medico = this.rest.getCurrentCentroMedico();
    let usuario = this.rest.getUsuarioSesion();
    this.route.queryParams.subscribe(params => {
      this.requisiciones_search = {
        eq: {},
        gt: {},
        ge: {},
        le: {},
        lt: {},
        lk: {},
        csv: {},
      };

      this.requisiciones_search.lk.pedimento	= "lk.pedimento" in params ?params["lk.pedimento"]:null;
      this.requisiciones_search.eq.estatus	= "eq.estatus" in params ?params["eq.estatus"]:null;
      this.requisiciones_search.eq.id_proveedor	= "eq.id_proveedor" in params ?params["eq.id_proveedor"]:null;
      this.requisiciones_search.ge.tiempo_creacion	= "ge.tiempo_creacion" in params ?params["ge.tiempo_creacion"]:null;
      this.requisiciones_search.le.tiempo_entrega	= "le.tiempo_entrega" in params ?params["le.tiempo_entrega"]:null;
      this.requisiciones_search.limite = this.pageSize;
      this.requisiciones_search.pagina = 'pagina' in params ? parseInt(params.pagina) : 0;

      this.is_loading = true;
      forkJoin(
          [
            //getTiposGastos({id_organizacion: usuario.id_organizacion}),
            //this.rest.getGastos({ id_centro_medico: 1 })
            this.rest.proveedor.getAll({id_organizacion: usuario.id_organizacion}),
            this.rest.requisicion.search(this.requisiciones_search) //TODO FIX ponerlo de la session o seleccionarlo
          ]
        ).subscribe(
          (response) => {
            this.proveedores = response[0].datos;
            this.proveedores.forEach(i=>this.proveedor_dic[ i.id ] =  i);
            console.log('proveedor',this.proveedor_dic);
            this.requisiciones = response[1].datos;//TODO Cambiar al usaurio de la sesion
            this.setPages(this.requisiciones_search.pagina, response[1].total);
            this.is_loading = false;
          }
          , (error) => {
            this.showError(error);
            this.is_loading = false;
          }
        );
    });
  }

  search()
	{
		this.is_loading = true;
		this.requisiciones_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.requisiciones_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.requisiciones_search[i])
                    search[i+'.'+j] = this.requisiciones_search[i][j];
            }
        }
		console.log( search );
		this.router.navigate(['requisiciones'],{queryParams: search});
	}

}
