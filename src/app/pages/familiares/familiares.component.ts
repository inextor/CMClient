import { Component, OnInit, Input, Output } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'
import { RestService } from '../..//services/rest.service';
import { Router } from '@angular/router';
import { Usuario, Paciente } from '../../models/Modelos';
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
  show_seleccionar_doctor_cita: boolean = false;
  id_paciente: number = null;
  
  ngOnInit() {
  console.log(this.id_paciente);
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
  showSeleccionarDoctorCita(familiar) {
    this.show_seleccionar_doctor_cita = true;
    this.id_paciente = familiar;
  }
  

}
