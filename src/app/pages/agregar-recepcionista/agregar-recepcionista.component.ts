import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario, Recepcionista } from 'src/app/models/Modelos';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-agregar-recepcionista',
  templateUrl: './agregar-recepcionista.component.html',
  styleUrls: ['./agregar-recepcionista.component.css']
})
export class AgregarRecepcionistaComponent extends BaseComponent implements OnInit {


  usuario: Usuario = {
    id_organizacion: 1,
    usuario: '',
    contrasena: '',
    correo_electronico: '',
    tipo: 'RECEPCIONISTA',
    id_imagen: null
  };
  recepcionista: Recepcionista = {
    nombre: '',
    apellidos: '',
    telefono: ''
  };
  is_loading: boolean = false;

  confirmar_contrasena: string = '';
  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
    this.is_loading = false;
    if (usuario !== null) {
      this.usuario.id_organizacion = usuario.id_organizacion;
    }

  }

  async showError(message: string) {
		/*
		const alert = await this.alertController.create
		({
			header: 'Error',
			//subHeader: 'Subtitle',
			message: message,
			buttons: ['OK']
		});

		await alert.present();
		*/
  }

  registrarse() {

    // this.is_loading = true;
    // this.rest.agregarUsuarioRecepcionista(this.usuario, this.recepcionista).subscribe((recepcionista) => {
    //   this.is_loading = false;
    //   this.router.navigate(['/recepcionistas/0']);
    // },
    //   (error) => {
    //     console.log("Error al registrar recepcionista");
    //     this.showError(this.rest.getErrorMessage(error));
    //     this.is_loading = false;
    //   });
  }


  uploadImage(evt) {
    if (evt.target.files.length) {
      this.rest.uploadImage(evt.target.files[0], false).subscribe((imageData) => {
        this.usuario.id_imagen = imageData.id;
      });
    }
  }
}
