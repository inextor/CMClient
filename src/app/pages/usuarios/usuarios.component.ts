import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente, Doctor, Centro_Medico, Usuario } from 'src/app/models/Modelos';
import { Location } from '@angular/common';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { Title } from '@angular/platform-browser';
@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent extends BaseComponent implements OnInit {

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	  }
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
		this.titleService.setTitle('Usuarios');
		this.route.queryParams.subscribe( params =>
		{

			let usuario = this.rest.getUsuarioSesion();
			this.is_loading = true;

			if (usuario.tipo == "ADMIN") {
				this.rest.usuario.get(usuario.id).subscribe(usuario => this.usuario = usuario);
			}

			this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina']);
			this.rest.usuario.getAll({}, {pagina:this.currentPage, limite: this.pageSize, id_organizacion: usuario.id_organizacion }).subscribe((respuesta) => {
				this.usuarios = respuesta.datos;
				console.log('USuairo',this.usuarios)
				this.setPages( this.currentPage, respuesta.total );
				this.is_loading = false;
			}, (error) => {
				console.log('error',error)
				this.showError(error);
				this.is_loading = false;
			});
		});
	}
}
