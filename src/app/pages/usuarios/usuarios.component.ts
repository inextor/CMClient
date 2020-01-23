import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente, Doctor, Centro_Medico, Usuario } from 'src/app/models/Modelos';
import { Location } from '@angular/common';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';
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
	usuario_search:SearchObject<Usuario>;
	busquedaAvanzada:boolean = false;
	//inicializa la busqueda para limpiar los forms de busqueda cada que se selecciona busqueda Avanzada
	clearBusqueda(){
		this.usuario_search = {
			eq: {id_organizacion: this.rest.getUsuarioSesion().id_organizacion},
			gt: {},
			ge: {},
			le: {},
			lt: {},
			lk: {tipo: null},
			csv: {tipo: ['ADMIN','RECEPCIONISTA','ASISTENTE']},
		};
		this.search();
	}
	ngOnInit()
	{
		this.titleService.setTitle('Usuarios');
		this.route.queryParams.subscribe( params =>
		{
			this.usuario_search = {
				eq: {id_organizacion: this.rest.getUsuarioSesion().id_organizacion},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {tipo: null},
				csv: {tipo: ['ADMIN','RECEPCIONISTA','ASISTENTE']},
			};
			let usuario = this.rest.getUsuarioSesion();
			this.usuario_search.lk.usuario	= "lk.usuario" in params ?params["lk.usuario"]:null;
			this.usuario_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.usuario_search.lk.correo_electronico	= "lk.correo_electronico" in params ?params["lk.correo_electronico"]:null;
			this.usuario_search.lk.telefono	= "lk.telefono" in params ?params["lk.telefono"]:null;
			this.usuario_search.lk.tipo	= "lk.tipo" in params ?params["lk.tipo"]:null;
			this.usuario_search.limite			= this.pageSize;
			this.usuario_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			this.is_loading = true;

			if (usuario.tipo == "ADMIN") {
				this.rest.usuario.get(usuario.id).subscribe(usuario => this.usuario = usuario);
			}

			this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina']);
			this.rest.usuario.search(this.usuario_search).subscribe((respuesta) => {
			this.usuarios = respuesta.datos;
			this.setPages( this.usuario_search.pagina, respuesta.total );
			this.is_loading = false;
			}, (error) => {
				console.log('error',error)
				this.showError(error);
				this.is_loading = false;
			});
		});
	}

	search()
	{
		this.is_loading = true;
		this.usuario_search.pagina= 0;
		// this.usuario_search.lk.usuario	= this.usuario_search.lk.usuario;
		// this.usuario_search.lk.nombre	= this.usuario_search.lk.nombre;
		// this.usuario_search.lk.correo_electronico	= this.usuario_search.lk.correo_electronico;
		// this.usuario_search.lk.telefono	= this.usuario_search.lk.telefono;
		// this.usuario_search.lk.tipo	= this.usuario_search.lk.tipo;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.usuario_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.usuario_search[i])
                    search[i+'.'+j] = this.usuario_search[i][j];
            }
        }
		console.log( search );
		this.router.navigate(['usuarios'],{queryParams: search});
	}
}
