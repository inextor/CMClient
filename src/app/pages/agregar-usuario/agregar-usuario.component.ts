import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario, Paciente } from 'src/app/models/Modelos';
import { BaseComponent } from '../base/base.component';



@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent extends BaseComponent implements OnInit {
	usuario: Usuario = {
		id_organizacion: 1,
		usuario: '',
		contrasena: '',
		correo_electronico: '',
		tipo: 'RECEPCIONISTA',
		id_imagen: null
	};
	recepcionista: Paciente = {
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
		console.log("Guardando");
		this.is_loading = true;

		if (this.usuario) {
			this.rest.usuario.update(this.usuario).subscribe((usuario) => {
				this.is_loading = false;
				this.location.back();
			}, (error) => {
				this.is_loading = false;
				this.showError(error);
			});
		}
		else {
			this.rest.usuario.create(this.usuario).subscribe((usuario) => {
				this.is_loading = false;
				this.location.back();
			}, (error) => {
				this.is_loading = false;
				this.showError(error);
			});
		}
	}
	


	uploadImage(evt) {
		if (evt.target.files.length) {
			this.rest.uploadImage(evt.target.files[0], false).subscribe((imageData) => {
				this.usuario.id_imagen = imageData.id;
			});
		}
	}
}
