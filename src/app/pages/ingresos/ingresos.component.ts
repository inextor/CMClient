import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Gasto_Centro_Medico, Tipo_Gasto, Ingreso } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse } from '../../models/Respuestas';
import { Location } from '@angular/common';
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent extends BaseComponent implements OnInit {
  showAddIngreso: boolean = false;
  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location) {
    super(rest, router, route, location);
  }
  ingresos: Ingreso[] = [];


  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
    console.log(usuario)
    this.is_loading = true;

      this.rest.ingreso.getAll({})
        //this.rest.getDoctores()
        .subscribe(respuesta => {
          this.is_loading = false;
          this.ingresos = respuesta.datos;
          console.log(this.ingresos);
        })
        }



}