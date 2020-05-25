import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Especialidad, Aseguranza, Tipo_Precio } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-agregar-aseguranza',
  templateUrl: './agregar-aseguranza.component.html',
  styleUrls: ['./agregar-aseguranza.component.css']
})
export class AgregarAseguranzaComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }

  is_loading: boolean = false;
  aseguranza: Aseguranza = {
    nombre: '',
    id_centro_medico: null,
    id_organizacion: null,
    id_imagen: null,
    id_tipo_precio:null,
    telefono: '',
    correo_electronico: '',
    factura_rfc: '',
    factura_razon_social: '',
    factura_codigo_postal: '',
    factura_correo_electronico: '',
    fecha_corte: null,
    tiempo_corte: null,
  };
  tipos_precio: Tipo_Precio[] = [];
  // tipos_precio_dic: any = {};
  ngOnInit() {
    let centro_medico = this.rest.getCurrentCentroMedico();
    this.aseguranza = {
      id: null
      , nombre: ''
      , id_centro_medico: centro_medico.id
      , id_organizacion: centro_medico.id_organizacion
      , id_tipo_precio: null
      , tiempo_corte: null
    };

    this.route.paramMap.subscribe(params => {
      let id = params.get('id') == null ? null : parseInt(params.get('id'));
      if (id != null) {
        this.is_loading = true;
        //this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
        this.rest.aseguranza.get(id).subscribe((aseguranza) => {
          this.is_loading = false;
          this.aseguranza = aseguranza;
        }, error => this.showError(error));
      } else {
        forkJoin(
          [
            this.rest.tipo_precio.getAll({ id_organizacion: centro_medico.id_organizacion }),
          ]
        ).subscribe(
          (response: any[]) => {
            this.tipos_precio = response[0].datos;
            console.log("tipos_precio", this.tipos_precio);
            // this.tipos_precio.forEach(i => this.tipos_precio_dic[i.id] = i);
            this.is_loading = false;
          }
          , (error) => {
            this.showError(error);
            this.is_loading = false;
          }
        );
      }
    });
  }

  agregar() {
    this.is_loading = true;

    if (this.aseguranza.id) {
      //this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      this.rest.aseguranza.update(this.aseguranza).subscribe((aseguranza) => {
        this.is_loading = false;
        this.router.navigate(['/aseguranzas']);
      }, error => this.showError(error));
    }
    else {
      //this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      this.rest.aseguranza.create(this.aseguranza).subscribe((aseguranza) => {
        this.is_loading = false;
        this.router.navigate(['/aseguranzas']);
      }, error => this.showError(error));

    }
  }

}
