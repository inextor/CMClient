import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Venta, Centro_Medico, Usuario, Inventario, Servicio, Unidad_Medida, Lote_Inventario } from '../../models/Modelos';
import { SearchObject } from '../../models/Respuestas';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';


interface ServicioById {
	[key:number]:Servicio;
};

@Component({
  selector: 'app-control-inventario',
  templateUrl: './control-inventario.component.html',
  styleUrls: ['./control-inventario.component.css']
})

export class ControlInventarioComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }
  // modal control
  show_modal: boolean = false;
  selected_articulo;
  // 
  inventarios: Inventario[] = [];
  // lotes inventario
  lotes_inventario:Lote_Inventario[]=[];
  lote_inventario_search: SearchObject<Lote_Inventario>={};
  //buscarservicios
  busqueda: string				= '';
  search_servicios: Servicio[]	= [];
  servicios_by_id:ServicioById	= {};
  // 
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
    this.lote_inventario_search = {
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
    this.titleService.setTitle('Ajuste Inventario');
    this.centro_medico = this.rest.getCurrentCentroMedico();
    this.route.queryParams.subscribe(params => {

      this.lote_inventario_search = {
        lt: {}
        , eq: { id_centro_medico: this.centro_medico.id }
        , ge: {}
        , gt: {}
        , le: {}
        , lk: {}
        , csv: {}
      };
      this.lote_inventario_search.lk.id = "lk.id" in params ? params["lk.id"] : null;
      this.lote_inventario_search.eq.id_inventario = "eq.id_inventario" in params ? params["eq.id_inventario"] : null;
      this.lote_inventario_search.eq.id_servicio = "eq.id_servicio" in params ? params["eq.id_servicio"] : null;
      this.lote_inventario_search.eq.id_centro_medico = "eq.id_centro_medico" in params ? params["eq.id_centro_medico"] : this.centro_medico.id;
      this.lote_inventario_search.le.fecha_caducidad = "le.fecha_caducidad" in params ? params["le.fecha_caducidad"] : null;
      this.lote_inventario_search.ge.fecha_caducidad = "ge.fecha_caducidad" in params ? params["ge.fecha_caducidad"] : null;
      this.lote_inventario_search.limite = this.pageSize;
      console.log('Search', this.lote_inventario_search);

      let rjoinObj: any = {};
      let fjarray = [];

      this.is_loading = true;
      this.lote_inventario_search.pagina = params['pagina'] ? parseInt(params['pagina']) : 0;

      forkJoin(
        this.rest.lote_inventario.search(this.lote_inventario_search), 
        this.rest.servicio.search({}),
        // this.rest.centro_medico.search({ eq: { id_organizacion: this.rest.getUsuarioSesion().id_organizacion } }),
        this.rest.unidad_medida.search({}),
      ).subscribe((result) => {
          this.lotes_inventario = result[0].datos;
          this.servicios = result[1].datos;
          this.servicios.forEach( (i)=> {this.servicio_dic[i.id]= i});
          this.unidades_medida = result[2].datos;
          this.unidades_medida.forEach((i)=>{ this.unidad_dic[i.id] = i });          
          this.setPages(this.lote_inventario_search.pagina, result[0].total);
        }, error => {
          this.showError(error);
        });
    });
  }

  buscarServicios(evt: any)
	{
		let x = this.rest.servicio.search({
			lk: { nombre: evt.target.value },
			eq:{tipo:'PRODUCTO_FISICO'}
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}
  addToSearch(servicio){
    if( !( servicio.id in this.servicios_by_id ) ){
      this.servicios_by_id[ servicio.id ] = servicio;

    }
    this.busqueda =  this.servicios_by_id[ servicio.id ].nombre;
    this.lote_inventario_search.eq.id_servicio = servicio.id;
    this.search_servicios	= [];
  }

  search() {
    this.is_loading = true;
    this.lote_inventario_search.pagina = 0;
    let search = {};
    let array = ['eq', 'le', 'lt', 'ge', 'gt', 'csv', 'lk'];
    for (let i in this.lote_inventario_search) {
      console.log('i', i, array.indexOf(i));
      if (array.indexOf(i) > -1) {
        for (let j in this.lote_inventario_search[i])
          search[i + '.' + j] = this.lote_inventario_search[i][j];
      }
    }

    console.log('search', this.lote_inventario_search);
    console.log('Busqueda', search);
    this.router.navigate(['/control-inventario'], { queryParams: search });
  }
  // salida inventario
  salidaInventario(inventario){
    this.selected_articulo = inventario
    this.show_modal= true;
  }
}
