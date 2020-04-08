import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

import { Venta, Centro_Medico, Usuario, Inventario, Servicio, Unidad_Medida } from '../../models/Modelos';
import { SearchObject } from '../../models/Respuestas';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-maximos-minimos',
  templateUrl: './maximos-minimos.component.html',
  styleUrls: ['./maximos-minimos.component.css']
})
export class MaximosMinimosComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
  show: boolean = false;
  inventarios: Inventario[] = [];
  servicios: Servicio[] = [];
  servicio_dic: any={};
  unidades_medida:Unidad_Medida[]=[];
  unidad_dic: any={};
  usuario_list: Usuario[] = [];
  usuarios_atendio: Usuario[] = [];
  centros_medicos: Centro_Medico[] = [];
  centro_medico:Centro_Medico;
  detalle_inventario_search: SearchObject<Venta> = {
  };
  venta_usuario
  busquedaAvanzada: boolean = false;
  clearBusqueda() {
    this.detalle_inventario_search = {
      lt: {}
      , eq: {}
      , ge: {}
      , gt: {}
      , le: {}
      , lk: {}
      , csv: {}
    };
    this.search();
  }
  ngOnInit() {
    this.centro_medico = this.rest.getCurrentCentroMedico();
    this.route.queryParams.subscribe(params => {

      this.detalle_inventario_search = {
        lt: {}
        , eq: { id_usuario_cliente: null, id_centro_medico: this.centro_medico.id, id_usuario_atendio: null }
        , ge: {}
        , gt: {}
        , le: {}
        , lk: {}
        , csv: {}
      };

      this.titleService.setTitle('reportes');

      this.detalle_inventario_search.lk.id = "lk.id" in params ? params["lk.id"] : null;
      this.detalle_inventario_search.eq.id_usuario_cliente = "eq.id_usuario_cliente" in params ? params["eq.id_usuario_cliente"] : null;
      this.detalle_inventario_search.eq.facturado = "eq.facturado" in params ? params["eq.facturado"] : null;
      this.detalle_inventario_search.eq.id_usuario_atendio = "eq.id_usuario_atendio" in params ? params["eq.id_usuario_atendio"] : null;
      this.detalle_inventario_search.eq.id_centro_medico = "eq.id_centro_medico" in params ? params["eq.id_centro_medico"] : this.centro_medico.id;
      this.detalle_inventario_search.eq.activa = "eq.activa" in params ? params["eq.activa"] : null;
      this.detalle_inventario_search.lk.cliente = "lk.cliente" in params ? params["lk.cliente"] : null;
      this.detalle_inventario_search.le.fecha = "le.fecha" in params ? params["le.fecha"] : null;
      this.detalle_inventario_search.ge.fecha = "ge.fecha" in params ? params["ge.fecha"] : null;
      this.detalle_inventario_search.eq.estatus = "eq.estatus" in params ? params["eq.estatus"] : null;
      this.detalle_inventario_search.limite = this.pageSize;
      console.log('Search', this.detalle_inventario_search);

      let rjoinObj: any = {};
      let fjarray = [];


      this.is_loading = true;
      this.detalle_inventario_search.pagina = params['pagina'] ? parseInt(params['pagina']) : 0;

      forkJoin(
        this.rest.inventario.search(this.detalle_inventario_search), 
        this.rest.servicio.search({}),
        this.rest.centro_medico.search({ eq: { id_organizacion: this.rest.getUsuarioSesion().id_organizacion } })
        , this.rest.paciente.search({}),
        this.rest.unidad_medida.search({}),
        this.rest.detalle_requisicion.search(this.detalle_inventario_search),
      ).subscribe((result) => {
          this.inventarios = result[0].datos;
          this.servicios = result[1].datos;
          this.servicios.forEach( (i)=> {this.servicio_dic[i.id]= i});
          this.unidades_medida = result[4].datos;
          this.unidades_medida.forEach((i)=>{ this.unidad_dic[i.id] = i });          
          this.setPages(this.detalle_inventario_search.pagina, result[0].total);
          this.centros_medicos = result[2].datos;
          this.usuario_list = result[3].datos;
          // traer la lista de usuarios y sus respectivas ventas desde el webservice.
        }, error => {
          this.showError(error);
        });
    });
  }

  search() {
    this.is_loading = true;
    this.detalle_inventario_search.pagina = 0;
    let search = {};
    let array = ['eq', 'le', 'lt', 'ge', 'gt', 'csv', 'lk'];
    for (let i in this.detalle_inventario_search) {
      console.log('i', i, array.indexOf(i));
      if (array.indexOf(i) > -1) {
        for (let j in this.detalle_inventario_search[i])
          search[i + '.' + j] = this.detalle_inventario_search[i][j];
      }
    }
    console.log('search', this.detalle_inventario_search);
    console.log('Busqueda', search);
    this.router.navigate(['/reportes'], { queryParams: search });
  }
}
