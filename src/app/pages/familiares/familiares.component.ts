import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Modelos';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.css']
})
export class FamiliaresComponent extends BaseComponent implements OnInit {
  usuario: Usuario[] = []
  nombre: string = null

  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();

        this.rest.paciente.getAll({ id_usuario: usuario.id }).subscribe(params => {
            this.usuario = params.datos
          }
        );
      
    
  }

}
