import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Usuario, Doctor , Centro_Medico} from 'src/app/models/Modelos';
import { ThrowStmt } from '@angular/compiler';
@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"]
})
export class HeaderComponent extends BaseComponent implements OnInit {
	
	@Input() pagina: string;
	@Input() clinica;
	showCentros =false;
	usuario: Usuario=null
	nombre:string=null
	isNavbarCollapsed=false;
	show_seleccionar_centro_medico:boolean = false;
	centro_medico: Centro_Medico;
	@Input() show:boolean;
	ngOnInit()
	{ 
		
		 this.usuario = this.rest.getUsuarioSesion();
		this.clinica = this.rest.getCurrentCentroMedico();
		if( this.usuario )
		{
			this.nombre=this.usuario.nombre;
			if ( this.usuario.tipo == "RECEPCIONISTA" || this.usuario.tipo == "ADMIN" || this.usuario.tipo == "ASISTENTE" ){
				this.rest.usuario.get(this.usuario.id).subscribe(params=>{
					this.nombre=params.nombre
				});
			}
			else if(this.usuario.tipo == "DOCTOR"){
				this.rest.doctor.get(this.usuario.id).subscribe(params => {
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

	editarHorario()
	{
		// console.log("FOOO seleccionar horario", doctor );
		// this.selected_doctor = doctor;
		this.show_seleccionar_centro_medico = true;
	}

	onSeleccionarCentroMedico(centro_medico)
	{
		console.log('FOOOO seleccionar centro medico');
		this.router.navigate(['/configurar-horario','doctor',this.usuario.id, 'centro-medico',centro_medico.id_centro_medico]);
		this.show_seleccionar_centro_medico = false;
	}

	closeMenu(){
		if(this.isNavbarCollapsed == true){
			this.isNavbarCollapsed = false; 	
		}
	}

	// seleccionar_clinica(){
	// 	this.show_seleccionar_centro_medico = true;
	//   }
	  closed(){
		this.show_seleccionar_centro_medico = false;
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
