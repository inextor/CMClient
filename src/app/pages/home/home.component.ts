import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,Especialidad,Centro_Medico} from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { HeaderComponent } from "../../components/header/header.component";



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

	ngOnInit() {
	}

	onSeleccionarCentroMedico(centro_medico:Centro_Medico)
	{
		localStorage.setItem('id_centro_medico', ''+centro_medico.id );
	}
}
