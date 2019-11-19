import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario , Paciente } from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';



@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent extends BaseComponent implements OnInit {

	usuario:Usuario = {
		id_organizacion: null,
		contrasena: '',
		correo_electronico:'',
		tipo: null
	};


	confirmar_contrasena:string = '';

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>{
			let currentUser = this.rest.getUsuarioSesion();
			this.usuario.id_organizacion = currentUser.id_organizacion;
		});
	}

	registrarse()
	{
		this.error_message = '';
		if( this.confirmar_contrasena !== this.usuario.contrasena )
		{
			this.error_message = 'Las contraseñas no coinciden';
			return;
		}

		this.is_loading = true;

		this.rest.agregarUsuario( this.usuario, this.paciente ).subscribe((usuario)=>
		{
			this.is_loading = false;
			this.router.navigate(['/home']);
		}, error=> this.showError(error) );
	}
}
