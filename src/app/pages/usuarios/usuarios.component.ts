import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente, Doctor, Centro_Medico, Usuario } from 'src/app/models/Modelos';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private rest: RestService,
    private router: Router,
    private route: ActivatedRoute,) { }

  usuarios: Usuario[]= [];
  is_loading: boolean = false;
  // info_pacientes: SearchPacienteResponse[] = [];
  tipo_busqueda = 'nombre';
  orderBy = 'Fecha';
  orderDirection = 'ASC';
  doctor: Doctor = {};
  //Sacarlo de la session del recepcionista
  centro_medico: Centro_Medico = { id: 1 };
  // crequest: SearchPacienteRequest = {};
  usuario: Usuario = {};
  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
    this.is_loading = true;
    // this.rest.doctor.get({}).subscribe((respuesta)=>
    // {this.doctor = respuesta.datos;});
    //this.rest.getDoctor( id_doctor ).subscribe(doctor=> this.doctor = doctor);
    if (usuario.tipo == "ADMIN") {
      this.rest.usuario.get(usuario.id).subscribe(usuario => this.usuario = usuario);
    }


    if (usuario) {
      this.usuario = usuario;
      //this.rest.getPacientes(usuario.id_organizacion).subscribe((respuesta)=>
      //FIX THIS
      this.rest.usuario.getAll({}, { id_organizacion: usuario.id_organizacion }).subscribe((respuesta) => {
        this.usuarios = respuesta.datos;
        console.log(this.usuarios)
        this.is_loading = false;
      }, (error) => {
        this.showError(this.rest.getErrorMessage(error));
        this.is_loading = false;
      });

    }
    else {
      this.rest.currentUser.subscribe(user => {
        this.usuario = usuario;

        //FIX THIS
        //this.rest.getPacientes(usuario.id_organizacion).subscribe((respuesta)=>
        this.rest.usuario.getAll({}, { id_organizacion: usuario.id_organizacion }).subscribe((respuesta) => {
          this.usuarios = respuesta.datos;
          console.log(this.usuarios)
        }, (error) => {
          this.showError(this.rest.getErrorMessage(error));
          this.is_loading = false;
        });
      });
    }
  }


  async showError(message: string) {

		/*
		const alert = await this.alertController.create({
			header: 'Error',
			//subHeader: 'Subtitle',
			message: message,
			buttons: ['OK']
		});

		await alert.present();
		this.is_loading = false;
		*/
  }

}
