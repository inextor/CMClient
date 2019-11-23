import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Usuario , Paciente } from '../../models/Modelos';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent extends BaseComponent implements OnInit {

	usuario:Usuario = {
		id_organizacion: 1,
		id_imagen: null,
		contrasena: '',
		correo_electronico:'',
		tipo: 'PACIENTE'
	};
	paciente:Paciente = {
		nombre:'',
		apellidos:'',
		sexo:'',
		fecha_nacimiento:'',
		telefono_celular:'',
		telefono_casa: '',
		domicilio: '',
	};

	confirmar_contrasena:string = '';

	registrarse()
	{
		this.is_loading = true;
		this.rest.registrarUsuarioPaciente( this.usuario, this.paciente ).subscribe((usuario)=>
		{
			this.is_loading = false;
			this.router.navigate(['/pacientes']);
		}, error=> this.showError );
	}

	uploadImage(evt) {
		if (evt.target.files.length) {
			this.rest.uploadImage(evt.target.files[0], false).subscribe((imageData) => {
				this.usuario.id_imagen = imageData.id;
			}, error => this.showError(error));
		}
	}
}
