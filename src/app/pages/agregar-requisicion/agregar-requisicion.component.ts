import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router"
import { Proveedor, Requisicion, Articulo } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-agregar-requisicion',
  templateUrl: './agregar-requisicion.component.html',
  styleUrls: ['./agregar-requisicion.component.css']
})
export class AgregarRequisicionComponent extends BaseComponent implements OnInit {

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
