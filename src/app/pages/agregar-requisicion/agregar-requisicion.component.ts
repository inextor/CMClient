import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router"
import { Proveedor, Requisicion,  Servicio, Detalle_Venta , Detalle_Requisicion } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from '../../models/Respuestas';
import { forkJoin } from 'rxjs';

interface OldSearch {
  [key: string]: Servicio[];
}

interface requisicionDetalle {
  servicio:Servicio;
  requisicion:Requisicion;
  detalles_requisicion: Detalle_Requisicion;

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
  detalle_requisiciones: requisicionDetalle[] = [];
  proveedores: Proveedor[] = [];
  requisicion: Requisicion[]=[];

  ngOnInit() {
    let usuario=this.rest.getUsuarioSesion();
    forkJoin([

      this.rest.proveedor.search({ eq: { id_organizacion: usuario.id_organizacion } }),
    ]).subscribe((respuestas) => {
      this.proveedores = respuestas[0].datos;
    }, (error) => this.showError(error));
    }


  buscar(evt: any) {
    let x = this.rest.servicio.search({
      lk: { nombre: evt.target.value },
      eq:{tipo:'PRODUCTO_FISICO'}
    }).subscribe((response) => {
      this.search_servicios = response.datos;
      x.unsubscribe();
    });
  }

  agregarServicio(servicio: Servicio) {
    let s = this.detalle_requisiciones.find(i => i.servicio.id == servicio.id);
    if (s) {
      this.busqueda = '';
      this.aumentar(s);
      return;
    }

    this.detalle_requisiciones.push({servicio,requisicion:{
    },detalles_requisicion:{
      id_servicio	: servicio.id,
      cantidad	: 1,
    }
    });


    this.busqueda = '';
    this.search_servicios = [];
  }

  aumentar(detalle_requisiciones) {
    detalle_requisiciones.detalles_requisicion.cantidad++;
  }

   guardar() {
  //   this.is_loading = true;

  //   if (this.requisicion) {
  //     //this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
  //     this.rest.proveedor.update(this.requisicion).subscribe((requisicion) => {
  //       this.is_loading = false;
  //       this.router.navigate(['/requisiciones']);
  //     }, error => this.showError(error));
  //   }
  //   else {
  //     //this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
  //     this.rest.requisicion.create(this.requisicion).subscribe((requisicion) => {
  //       this.is_loading = false;
  //       this.router.navigate(['/requisiciones']);
  //     }, error => this.showError(error));
  //   }
  }

}
