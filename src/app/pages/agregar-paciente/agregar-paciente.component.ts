import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent extends BaseComponent implements OnInit {

	usuario:Usuario = {
		id_organizacion: 1,
		contrasena: '',
		correo_electronico:'',
		tipo: 'PACIENTE'
	};
	paciente:Paciente = {
		nombre:'',
		apellidos:''
	};

	confirmar_contrasena:string = '';

	registrarse()
	{
		this.is_loading = true;
		this.rest.registrarUsuarioPaciente( this.usuario, this.paciente ).subscribe((usuario)=>
		{
			this.is_loading = false;
			this.router.navigate(['/home']);
		}, error=> this.showError );
	}
}
