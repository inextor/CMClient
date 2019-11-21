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
  ingreso: Ingreso = {
    monto:null,
  };


  ngOnInit() {
    this.ingreso = {
      id: null,
      monto:null,
    };
    let usuario = this.rest.getUsuarioSesion();
    console.log(usuario)
    this.is_loading = true;

  }
  tempfunction() {
    this.router.navigate(['/ingresos']);
  }

  guardar(){
    this.is_loading = true;

    if (this.ingreso.id) {
      //this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      this.rest.ingreso.update(this.ingreso).subscribe((response) => {
        this.is_loading = false;
        this.router.navigate(['/ingresos']);
      }, error => this.showError(error));
    }
    else {
      //this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      this.rest.ingreso.create(this.ingreso).subscribe((response) => {
        this.is_loading = false;
        this.router.navigate(['/ingresos']);
      }, error => this.showError(error));
    }
  }
}
