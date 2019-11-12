import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service'
import { Doctor,Cita, Usuario,Paciente,Centro_Medico} from '../../models/Modelos';
import {Router,ActivatedRoute,ParamMap} from "@angular/router"
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(private rest :RestService, private route: Route, private paramMap:ParamMap) { }

  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
    this.rest.doctor.get( usuario.id ).subscribe(doctor=> this.doctor = doctor);
    this.route.paramMap.subscribe( params =>{
      let idPaciente = params.get('id_paciente') == null ? null : parseInt( params.get('id_paciente') );
    
      if(idPaciente){
        this.rest.paciente.get(idPaciente).subscribe(paciente => {this.paciente = paciente});
      }
    
    });
  
  }

}
