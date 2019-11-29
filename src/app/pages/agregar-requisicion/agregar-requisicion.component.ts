import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router"
import { Proveedor, Requisicion, Articulo, Servicio, Detalle_Venta } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

interface OldSearch {
  [key: string]: Servicio[];
}

interface ServicioDetalle {
  detalle_venta: Detalle_Venta;
  servicio: Servicio;
}

@Component({
  selector: 'app-agregar-requisicion',
  templateUrl: './agregar-requisicion.component.html',
  styleUrls: ['./agregar-requisicion.component.css']
})
export class AgregarRequisicionComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }
  servicios: Servicio[] = [];
  search_servicios: Servicio[] = [];
  busqueda: string = '';
  todos_servicios: [] = [];
  detalle_servicios: ServicioDetalle[] = [];
  requisicion : Requisicion={
    id:null,
    id_centro_medico:null,
    id_usuario_solicito:null,
    id_usuario_recibio:null,
    id_proveedor:null,
    nota:'',
    flete:null,
    importacion:null,
    total_articulos:null,
    pedimento:'',
    estatus:'',
    total:null,
    tiempo_entrega: null,
  };
  Articulos: Articulo={
    codigo: null,
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id') == null ? null : parseInt(params.get('id'));
      if (id != null) {
        this.is_loading = true;
        //this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
        this.rest.proveedor.get(id).subscribe((proveedor) => {
          this.is_loading = false;
          this.requisicion = proveedor;
        }, error => this.showError(error));
      }
    });
  }

  buscar(evt: any) {
    let x = this.rest.servicio.search({
      lk: { nombre: evt.target.value },
      // eq:{tipo:'PRODUCTO_FISICO'}
    }).subscribe((response) => {
      this.search_servicios = response.datos;
      x.unsubscribe();
    });
  }

  agregarServicio(servicio: Servicio) {
    let s = this.detalle_servicios.find(i => i.servicio.id == servicio.id);
    if (s) {
      this.busqueda = '';
      this.aumentar(s);
      return;
    }

    this.detalle_servicios.push({
      servicio
      , detalle_venta: {
        id_servicio: servicio.id
        , cantidad: 1
      }
    });

    this.busqueda = '';
    this.search_servicios = [];
  }
  aumentar(detalle_servicio) {
    detalle_servicio.detalle_venta.cantidad++;
  }

  guardar() {
    this.is_loading = true;

    if (this.requisicion.id) {
      //this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      this.rest.proveedor.update(this.requisicion).subscribe((proveedor) => {
        this.is_loading = false;
        this.router.navigate(['/proveedores']);
      }, error => this.showError(error));
    }
    else {
      //this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      this.rest.proveedor.create(this.requisicion).subscribe((proveedor) => {
        this.is_loading = false;
        this.router.navigate(['/proveedores']);
      }, error => this.showError(error));
    }
  }

}
