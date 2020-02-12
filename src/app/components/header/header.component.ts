import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Modelos';
import { ThrowStmt } from '@angular/compiler';
@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"]
})
export class HeaderComponent extends BaseComponent implements OnInit {
	@Input() pagina: string;
	showCentros =false;
	usuario: Usuario=null
	nombre:string=null
	isNavbarCollapsed=false;
	ngOnInit()
	{ 
		
		let usuario = this.rest.getUsuarioSesion();
		if( usuario )
		{
			this.nombre=usuario.nombre;
			if ( usuario.tipo == "RECEPCIONISTA" || usuario.tipo == "ADMIN" || usuario.tipo == "ASISTENTE" ){
				this.rest.usuario.get(usuario.id).subscribe(params=>{
					this.nombre=params.nombre
				});
			}
			else if(usuario.tipo == "DOCTOR"){
				this.rest.doctor.get(usuario.id).subscribe(params => {
					this.nombre = params.nombre
				});
			}
			// else if(usuario.tipo == "PACIENTE"){
			// 	this.rest.paciente.getAll({id_usuario:usuario.id}).subscribe(params =>{
			// 		if(params.total == 1){
			// 			this.nombre = params.datos[0].nombre
			// 		}
			// 	});
			// }
		}
	}
	closeMenu(){
		if(this.isNavbarCollapsed == true){
			this.isNavbarCollapsed = false;
		}
	}

	logout() {
		// remove user from local storage and set current user to null
		localStorage.clear();
		// localStorage.removeItem('usuario');
		// localStorage.removeItem('session_token');
		// localStorage.removeItem('id_organizacion');
		this.rest.currentUserSubject.next(null);
		this.router.navigate(['/login']);
	}
}
