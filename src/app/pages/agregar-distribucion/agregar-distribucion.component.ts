import { Component, OnInit } from '@angular/core';
import { RestService,RequisicionInfo,Detalle_Requisicion_Info } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin,of } from 'rxjs';

import {DistribucionInfo,Respuesta} from '../../models/Respuestas';
import {Centro_Medico,Detalle_Distribucion,Servicio} from '../../models/Modelos';
import {Usuario} from '../../models/Modelos';
import { flatMap } from 'rxjs/operators';

interface ServicioById {
	[key:number]:Servicio;
};


interface DetallesReqById{
	[key:number] : Detalle_Requisicion_Info;
}

@Component({
  selector: 'app-agregar-distribucion',
  templateUrl: './agregar-distribucion.component.html',
  styleUrls: ['./agregar-distribucion.component.css']
})

export class AgregarDistribucionComponent extends BaseComponent implements OnInit {

	distribucionInfo:DistribucionInfo= null;
	centro_medico_list:Centro_Medico[] = [];
	usuario_list:Usuario[]	= [];
	detalles_distribucion:Detalle_Distribucion[] = [];
	requisicionInfo:RequisicionInfo = null;

	search_servicios: Servicio[]	= [];
	busqueda: string				= '';
	todos_servicios: []				= [];
	servicios_by_id:ServicioById	= {};

	detalles_requisicion_by_service:DetallesReqById	 = {};

	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			this.distribucionInfo = {
				distribucion : {
					id_centro_medico_distribuidor: null
				}
				,detalles: []
			};

			let id = params.has('id') ? parseInt( params.get('id' ) ) : null;
			let id_requisicion =  params.has('id_requisicion') ? parseInt( params.get('id_requisicion') ) : null;

			if( id )
			{
				let usuario = this.rest.getUsuarioSesion();
				forkJoin([
					this.rest.distribucionInfo.get(id)
					,this.rest.usuario.search({ eq:{ id_organizacion: usuario.id_organizacion } ,csv:{ tipo:['DOCTOR','RECEPCIONISTA','ASISTENTE','ADMIN'] } })
					,this.rest.centro_medico.search({ eq:{ id_organizacion: usuario.id_organizacion } })
				])
				.pipe(
					flatMap((responses)=>
					{
						this.distribucionInfo 	= responses[0];
						this.usuario_list		= responses[1].datos;
						this.centro_medico_list = responses[2].datos;

						return this.distribucionInfo.distribucion.id_requisicion  == null
							? of( null )
							: this.rest.requisicionInfo.get( this.distribucionInfo.distribucion.id_requisicion );
					})
				).subscribe((response)=>
				{
					if( response !== null )
					{
						this.requisicionInfo	= response;
						this.distribucionInfo.distribucion.id_requisicion = response.requisicion.id;
						this.updateRequicionValues();
						this.distribucionInfo.distribucion.id_centro_medico_solicitante = this.requisicionInfo.requisicion.id_centro_medico;
						console.log('Req Info', this.requisicionInfo );
					}
				});
			}
			else if( id_requisicion )
			{
				let usuario = this.rest.getUsuarioSesion();
				//Maybe New
				forkJoin([
					this.rest.distribucionInfo.search({ eq: { id_requisicion : id_requisicion }})
					,this.rest.usuario.search({ eq:{ id_organizacion: usuario.id_organizacion } ,csv:{ tipo:['DOCTOR','RECEPCIONISTA','ASISTENTE','ADMIN'] } })
					,this.rest.centro_medico.search({ eq:{ id_organizacion: usuario.id_organizacion } })
					,this.rest.requisicionInfo.get( id_requisicion )
				])
				.subscribe((responses)=>
				{
					if( responses[0].datos.length )
						this.distribucionInfo = responses[0].datos[0];

					this.usuario_list		= responses[1].datos;
					this.centro_medico_list = responses[2].datos;
					this.requisicionInfo	= responses[3];
					this.updateRequicionValues();
					this.distribucionInfo.distribucion.id_requisicion = this.requisicionInfo.requisicion.id;
					this.distribucionInfo.distribucion.id_centro_medico_solicitante = this.requisicionInfo.requisicion.id_centro_medico;
				});
			}
			else //New
			{

				let usuario = this.rest.getUsuarioSesion();
				forkJoin([
					this.rest.usuario.search({ eq:{ id_organizacion: usuario.id_organizacion } ,csv:{ tipo:['DOCTOR','RECEPCIONISTA','ASISTENTE','ADMIN'] } })
					,this.rest.centro_medico.search({ eq:{ id_organizacion: usuario.id_organizacion } })
				])
				.subscribe((responses)=>
				{
					this.usuario_list		= responses[0].datos;
					this.centro_medico_list = responses[1].datos;
					this.requisicionInfo	= null;
				})
			}
		});
	}

	updateRequicionValues()
	{
		if( this.requisicionInfo == null )
			return;

		this.requisicionInfo.detalles.forEach((i)=>
		{
			this.detalles_requisicion_by_service[ i.servicio.id ] = i;
			this.agregarServicio( i.servicio, i.detalle_requisicion.cantidad );
		});
	}

	save()
	{
		this.is_loading = true;

		if( this.distribucionInfo.distribucion.id )
		{
			this.rest.distribucionInfo.update( this.distribucionInfo ).subscribe((distribucionInfo)=>{
				this.is_loading = false;
				this.router.navigate(['/distribucion']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.distribucionInfo.create( this.distribucionInfo ).subscribe((distribucionInfo)=>{
				this.is_loading = false;
				this.router.navigate(['/distribucion']);
			},(error)=>this.showError(error));
		}
	}

	aumentar(detalle_distribucion:Detalle_Distribucion)
	{
		detalle_distribucion.cantidad++;
	}


	agregarServicio(servicio: Servicio, qty)
	{
		console.log('Adding service', servicio );

		if( !( servicio.id in this.servicios_by_id ) )
			this.servicios_by_id[ servicio.id ] = servicio;

		let s = this.distribucionInfo.detalles.find(i => i.id_servicio == servicio.id);
		if (s) {
			this.busqueda = '';
			//this.aumentar(s);
			s.cantidad = qty;
			return;
		}

		this.distribucionInfo.detalles.push
		({
			id_servicio	: servicio.id, cantidad	: 1,
		});

		this.busqueda			= '';
		this.search_servicios	= [];
	}

	buscar(evt: any)
	{
		let usuario = this.rest.getUsuarioSesion();

		let x = this.rest.servicio.search({
			lk: { nombre: evt.target.value },
			eq:{tipo:'PRODUCTO_FISICO', id_organizacion: usuario.id_organizacion }
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}
}
