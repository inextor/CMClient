import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { Servicio,Tipo_Precio,Centro_Medico,Precio_Servicio } from '../../models/Modelos';
import { Servicio_Recurso } from '../../models/Respuestas';
import { from } from 'rxjs';
import { Location } from	'@angular/common';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router"
import { Title } from '@angular/platform-browser';


@Component({
	selector: 'app-agregar-servicio',
	templateUrl: './agregar-servicio.component.html',
	styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent extends BaseComponent implements OnInit {

 	servicio_recurso:Servicio_Recurso= {
		servicio:{
			'id': null,
			'nombre': '',
			'codigo': '',
			'prestado_por': 'centro_medico'
		},
		recursos : []
	};

	tipo_precios:Tipo_Precio[] = [];
	precio_servicios:Precio_Servicio[] = [];
	centros_medicos:Centro_Medico[] = [];
	precios	= {};
	id:number = null;

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			this.id = params.get('id') ==null ? null : parseInt(params.get('id') );
			let user = this.rest.getUsuarioSesion();
			this.servicio_recurso.servicio.id_organizacion = user.id_organizacion;

			this.is_loading = true;

			if( this.id )
			{
				forkJoin([
					this.rest.tipo_precio.getAll({}),
					this.rest.centro_medico.getAll({id_organizacion: user.id_organizacion}),
					this.rest.precio_servicio.getAll({},{ id_servicio: this.id }),
					this.rest.servicio_recurso.get( this.id )
				])
				.subscribe((valores)=>
				{
					this.is_loading = false;
					this.initValores( valores );
				}
				,(error)=>
				{
					this.is_loading = false;
					this.showError( error );
				});
			}
			else
			{
					//this.rest.precio_servicio.getAll({ id_servicio: this.id })
				forkJoin([
					this.rest.tipo_precio.getAll({}),
					this.rest.centro_medico.getAll({id_organizacion: user.id_organizacion})
				])
				.subscribe((valores)=>
				{
				this.is_loading = false;

					this.initValores( valores );
				},
				(error)=>
				{
					this.is_loading = false;
					this.showError( error );
				});
			}
		});
	}


	initValores(valores)
	{
		console.log( valores );
		this.tipo_precios = valores[0].datos;
		this.centros_medicos = valores[1].datos;

		if( valores.length ==	4 )
		{
			this.precio_servicios = valores[2].datos;
			this.servicio_recurso = valores[3];
		}
		else
		{
			this.precio_servicios = [];
		}

		this.centros_medicos.forEach( i=> this.precios[i.id] = {});

		this.centros_medicos.forEach((centro_medico)=>
		{
			this.tipo_precios.forEach((tipo_precio)=>
			{
				let some = this.precio_servicios.find(p => p.id_centro_medico == centro_medico.id && p.id_tipo_precio == tipo_precio.id );
				if( !some )
				{
					this.precios[ centro_medico.id ][ tipo_precio.id ] = {
						id_centro_medico	: centro_medico.id
						,id_tipo_precio		: tipo_precio.id
						,id_servicio		: this.servicio_recurso.servicio.id

					};
				}
				else
				{
					console.log('some',some);
					this.precios[ centro_medico.id ][ tipo_precio.id ] = some;
				}
			});
		});

		console.log( 'precios',this.precios );

		this.servicio_recurso= valores.length == 4	? valores[3] : {
			servicio:{
				'id': null,
				'nombre': '',
				'codigo': '',
				'prestado_por': 'centro_medico'
			},
			recursos : []
		};
		this.is_loading = false;
	}

	guardar()
	{
	this.is_loading = true;

		if( this.servicio_recurso.servicio.id )
		{
			this.rest.servicio_recurso.update( this.servicio_recurso ).subscribe((asdf)=>
			{
				this.servicio_recurso = asdf;
				this.updatePrecios(); this.is_loading = false;

			}
			,(error)=>
			{
			this.is_loading = false;

				this.showError( error );
			});
		}
		else
		{
			this.rest.servicio_recurso.create( this.servicio_recurso ).subscribe((asdf)=>
			{
				this.servicio_recurso = asdf;
				this.updatePrecios(); this.is_loading = false;

			},
			(error)=>{
				this.showError(error); this.is_loading = false;

			})

		}
	}
	updatePrecios()
	{

		let nprecios:Precio_Servicio[] = [];

		console.log("precios",this.precios );
		for(let i in this.precios )
		{
			for(let j in this.precios[i])
			{
				this.precios[i][j].id_servicio = this.servicio_recurso.servicio.id;
				if( this.precios[i][j].precio )
				{
					nprecios.push( this.precios[i][j] );
				}
			}
		}
		this.is_loading = true;

		this.rest.precio_servicio.batchUpdate( nprecios ).subscribe((result)=>
		{
			//this.success_message = 'Hell Yeah';
			this.router.navigate(['/servicios']); this.is_loading = false;

		}
		,(error)=>
		{
		this.is_loading = false;

			this.showError( error );
		});
	}
}
