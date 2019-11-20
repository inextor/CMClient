import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service'
import { Doctor, Cita, Usuario, Paciente, Centro_Medico, Consulta } from '../../models/Modelos';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-agregar-consulta',
  templateUrl: './agregar-consulta.component.html',
  styleUrls: ['./agregar-consulta.component.css']
})

export class AgregarConsultaComponent extends BaseComponent implements OnInit {


  paciente: Paciente = {};
  doctor: Doctor = {};
  consulta: Consulta = {};

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location) {
    super(rest, router, route, location);
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id') ? parseInt(params.get('id')) : null;

      if (id) {
        this.consulta = {
          motivo_consulta: '',
          diagnostico: '',
          tratamiento: '',
          id_paciente: null,
          id_doctor: null,
        };

        this.is_loading = true;
        this.rest.consulta.get(id).subscribe((consulta) => {
          this.consulta = consulta;
          forkJoin([this.rest.paciente.get(consulta.id_paciente), this.rest.doctor.get(consulta.id_doctor)])
            .subscribe(results => {
              this.paciente = results[0];
              this.doctor = results[1];
            }, error => this.showError(error));
        }, error => this.showError(error));
      }
      else {
        let usuario = this.rest.getUsuarioSesion();
        let id_paciente = parseInt(params.get('id_paciente'));

        forkJoin([this.rest.paciente.get(id_paciente), this.rest.doctor.get(usuario.id)])
          .subscribe(results => {
            this.paciente = results[0];
            this.doctor = results[1];
          }, error => this.showError(error));


        this.consulta = {
          motivo_consulta: '',
          diagnostico: '',
          tratamiento: '',
          id_paciente: id_paciente,
          id_doctor: usuario.id,
        };
      }
    });
  }

  guardar() {
    this.is_loading = true;
    let observable = this.consulta.id ? this.rest.consulta.update(this.consulta) : this.rest.consulta.create(this.consulta);

    observable.subscribe
      (
        consulta => {
          this.consulta = consulta
          this.is_loading = false;
        }
        , error => this.showError(error)
      );
  }

}
