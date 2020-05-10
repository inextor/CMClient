import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { Centro_Medico } from 'src/app/models/Modelos';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private rest: RestService, public router: Router ) {}
  showCentros:boolean = false;
  showConfig:boolean = false;
  show_logout: boolean = false;
  show_seleccionar_centro_medico:boolean = false;
  @Input() show:boolean;

  ngOnInit() {}

  showLogoutModal() {
    this.show_logout=true;
  }

  

  logout() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    this.show_logout=false
    // localStorage.removeItem('usuario');
    // localStorage.removeItem('session_token');
    // localStorage.removeItem('id_organizacion');
    this.rest.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  seleccionar_clinica(){
    this.show_seleccionar_centro_medico = true;
  }

  closed(){
    this.show_seleccionar_centro_medico = false;
  }

	onSeleccionarCentroMedico(centro_medico: Centro_Medico) {
		localStorage.setItem("centro_medico", JSON.stringify(centro_medico));
		// this.clinica= this.rest.getCurrentCentroMedico();
		this.show_seleccionar_centro_medico = false;
	}
}
