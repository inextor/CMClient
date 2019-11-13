import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { Servicio,Tipo_Precio,Centro_Medico,Precio_Servicio } from '../../models/Modelos';
import { Servicio_Recurso } from '../../models/Respuestas';


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

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			let user = this.rest.getUsuarioSesion();
			this.servicio_recurso.servicio.id_organizacion = user.id_organizacion;

			this.is_loading = true;
			if( id )
			{
				forkJoin([
					this.rest.tipo_precio.getAll({}),
					this.rest.centro_medico.getAll({id_organizacion: user.id_organizacion}),
					this.rest.precio_servicio.getAll({},{ id_servicio: id }),
					this.rest.servicio_recurso.get( id )
				])
				.subscribe((valores)=>
				{
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
				forkJoin([
					this.rest.tipo_precio.getAll({}),
					this.rest.centro_medico.getAll({id_organizacion: user.id_organizacion}),
					this.rest.precio_servicio.getAll({ id_servicio: id })
				])
				.subscribe((valores)=>
				{
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
		this.precio_servicios = valores[2].datos;

		if( valores.length ==  4 )
			this.servicio_recurso= valores[3];

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

		this.servicio_recurso= valores.length == 4  ? valores[3] : {
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


		this.rest.servicio_recurso.update( this.servicio_recurso ).subscribe((asdf)=>
		{
			this.servicio_recurso = asdf;

			let nprecios:Precio_Servicio[] = [];

			for(let i in this.precios )
			{
				for(let j in this.precios[i])
				{
					if( this.precios[i][j].precio )
					{
						nprecios.push( this.precios[i][j] );
					}
				}
			}

			this.rest.precio_servicio.batchUpdate( nprecios ).subscribe((result)=>
			{
				//this.success_message = 'Hell Yeah';
			}
			,(error)=>
			{
				this.showError( error );
			});
		}
		,(error)=>
		{
			this.showError( error );
		});
	}
}
