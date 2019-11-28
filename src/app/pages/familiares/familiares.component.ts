import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Usuario, Paciente } from 'src/app/models/Modelos';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.css']
})
export class FamiliaresComponent extends BaseComponent implements OnInit {
  familiares: Paciente[] = []
  nombre: string = null

  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();

        this.rest.paciente.getAll({ id_usuario: usuario.id }).subscribe(params => {
            this.familiares = params.datos
            console.log(params.datos)
          }
        );
      
    
  }

}
