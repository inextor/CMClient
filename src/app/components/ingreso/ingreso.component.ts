import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Gasto_Centro_Medico, Tipo_Gasto, Ingreso } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse } from '../../models/Respuestas';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location) {
    super(rest, router, route, location);
  }
  // ingreso : Ingreso[]= [];
  id_ingreso: number = null;
  ingreso: Ingreso = {
    monto: null, 
  };


  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
    console.log(usuario)
    this.is_loading = true;

  }
  
  guardar(): void {
    console.log("Guardando");
    this.is_loading = true;

    if (this.id_ingreso) {
      this.ingreso.update(this.ingreso).subscribe((gasto_centro_medico) => {
        this.is_loading = false;
        this.location.back();
      }, error => this.showError(error));
    }
    else {
      this.ingreso.create(this.ingreso).subscribe((gast) => {
        this.is_loading = false;
        this.location.back();
      }, error => { this.showError(error); });
    }
  }

}
