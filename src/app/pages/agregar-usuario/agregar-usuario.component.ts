import { Component, OnInit, Output } from '@angular/core';
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
		tipo: null,
	};
	confirmar_contrasena:string = '';

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>{
			let currentUser = this.rest.getUsuarioSesion();
			this.usuario.id_organizacion = currentUser.id_organizacion;

			this.usuario.id			= params.get('id') ==null ? null : parseInt(params.get('id') );;

			if( this.usuario.id )
			{
				//forkJoin([
				//])
				this.rest.usuario.get( this.usuario.id )
				.subscribe((responses)=>
				{
					this.usuario= responses;
				});
			}
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

		// this.is_loading = true;

		// this.rest.agregarUsuario( this.usuario ).subscribe((usuario)=>
		// {
		// 	this.is_loading = false;
		// 	this.router.navigate(['/usuarios']);
		// }, error=> this.showError(error) );

		// this.is_loading = true;

		if( this.usuario.id	)
		{
			this.rest.usuario.update( this.usuario ).subscribe((usuario)=>{
				this.is_loading = false;
				this.router.navigate(['/usuarios']);
			},(error)=>this.showError(error));
		}
		else
		{
			console.log("test",this.usuario);
			this.rest.usuario.create( this.usuario ).subscribe((usuario)=>{
				this.is_loading = false;
			
				this.router.navigate(['/usuarios']);
			},(error)=>this.showError(error));
		}
	}

	uploadImage(evt)
	{
		if (evt.target.files.length)
		{
			this.rest.uploadImage(evt.target.files[0], false).subscribe((imageData) => {
				this.usuario.id_imagen = imageData.id;
			}, error => this.showError(error));
		}
	}


}
