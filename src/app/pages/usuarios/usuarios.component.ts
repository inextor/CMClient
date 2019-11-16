import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente, Doctor, Centro_Medico, Usuario } from 'src/app/models/Modelos';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent extends BaseComponent implements OnInit {

	usuarios: Usuario[]= [];
	// info_pacientes: SearchPacienteResponse[] = [];
	tipo_busqueda = 'nombre';
	orderBy = 'Fecha';
	orderDirection = 'ASC';
	doctor: Doctor = {};
	//Sacarlo de la session del recepcionista
	centro_medico: Centro_Medico = { id: 1 };
	// crequest: SearchPacienteRequest = {};
	usuario: Usuario = {};

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{

			let usuario = this.rest.getUsuarioSesion();
			this.is_loading = true;

			if (usuario.tipo == "ADMIN") {
				this.rest.usuario.get(usuario.id).subscribe(usuario => this.usuario = usuario);
			}


			this.rest.usuario.getAll({}, { id_organizacion: usuario.id_organizacion }).subscribe((respuesta) => {
				this.usuarios = respuesta.datos;
				console.log('USuairo',this.usuarios)
				this.is_loading = false;
			}, (error) => {
				console.log('error',error)
				this.showError(this.rest.getErrorMessage(error));
				this.is_loading = false;
			});
		});
	}
}
