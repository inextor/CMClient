import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Usuario, Paciente } from 'src/app/models/Modelos';
import { ThrowStmt } from '@angular/compiler';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.css']
})
export class FamiliaresComponent extends BaseComponent implements OnInit {
  familiares: Paciente[] = []
  nombre: string = null

  ngOnInit() {
    

    this.route.paramMap.subscribe( params =>{
      let id = params.get('id') ==null ? null : parseInt(params.get('id') );
      if(id==null){
        let currentUser = this.rest.getUsuarioSesion();
        this.rest.paciente.getAll({id_usuario: currentUser.id}).subscribe(params=>{
          this.familiares = params.datos
        })
      }else{
        this.is_loading = true;
      
        this.rest.paciente.getAll({ id_usuario: id}).subscribe(params => {
          this.familiares = params.datos
        }
      );
      }
     
    });

      
  }

}
