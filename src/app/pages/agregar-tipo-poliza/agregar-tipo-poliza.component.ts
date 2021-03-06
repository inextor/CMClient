import { Component, OnInit } from '@angular/core';
import { RestService, Servicio_Poliza_Info } from '../../services/rest.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Especialidad, Tipo_Poliza, Servicio, Tipo_Precio } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { compareByFieldSpec } from '@fullcalendar/core';

interface ServicioById {
	[key:number]:Servicio;
};

@Component({
  selector: 'app-agregar-tipo-poliza',
  templateUrl: './agregar-tipo-poliza.component.html',
  styleUrls: ['./agregar-tipo-poliza.component.css']
})
export class AgregarTipoPolizaComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	is_loading:boolean	= false;
	// servicios y busqueda
	servicios: Servicio[]			= [];
	search_servicios: Servicio[] 	= [];
	busquedaServicio: string		= '';
	servicios_by_id:ServicioById	= {};
	// Detalles Servicios Poliza
	servicios_tipo_poliza:Servicio_Poliza_Info[] = [];
	tipo_poliza:Tipo_Poliza = {
		nombre: '',
		id_centro_medico:null,
		id_tipo_precio:null,
    precio:null,
    meses:null,
    cantidad_personas:null
	};
	tipos_precio: Tipo_Precio[]=[];

	ngOnInit() {
	

		this.route.paramMap.subscribe( params =>
		{

			let centro_medico = this.rest.getCurrentCentroMedico();
			this.tipo_poliza = {
			id: null,
			id_centro_medico: centro_medico.id,
			id_tipo_precio: null,
			  nombre:'',
			  precio:null,
			  meses:null,
			  cantidad_personas:null,
			};
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				forkJoin([
						this.rest.tipo_poliza.get( id ),
						this.rest.tipo_precio.getAll({})
					]).subscribe((response)=>{

						this.tipo_poliza = response[0];
						this.tipos_precio = response[1].datos;
						// this.tipo_poliza.id_tipo_precio = this.tipos_precio[0].id;
						console.log('tiposppressssio',this.tipo_poliza);
						this.is_loading = false;
				
					},(error)=>
					{
						this.showError( error );
						this.is_loading = false ;
					}
				);
			}else{
				this.is_loading = true;
				forkJoin([
						this.rest.tipo_precio.getAll({})
					]).subscribe((response)=>{
						this.tipos_precio = response[0].datos;
						this.tipo_poliza.id_tipo_precio = this.tipos_precio[0].id;
						console.log('tiposppressssio',response[0]);
						this.is_loading = false;
					},(error)=>
					{
						this.showError( error );
						this.is_loading = false ;
					}
				);
			}
		});
	}

	// buscar servicios
	buscarServicios(evt: any)
	{
		let x = this.rest.servicio.search({
			lk: { nombre: evt.target.value },
			eq:{tipo:'SERVICIO'}
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}
	//agregar servicio a la lista
	AgregarServicio(servicio){
		if( !( servicio.id in this.servicios_by_id ) )
			this.servicios_by_id[ servicio.id ] = servicio;

		let s = this.servicios_tipo_poliza.find(i => i.servicio.id == servicio.id );
		if (s) {
			this.busquedaServicio = '';
			this.aumentarLimite(s);
			return;
		}
		// let servicioTipoPoliza = this.servicios.find(i=> i.id == servicio.id_servicio);
		this.servicios_tipo_poliza.push
		({
			servicio: servicio
			,servicio_poliza:{id_servicio: servicio.id, limite_uso_servicio : 1 }
		});
		
		this.busquedaServicio	= '';
		this.search_servicios	= [];
	}
	
	aumentarLimite(tipo_servicio)
	{
		tipo_servicio.limite_uso_servicio++;
	}

	agregar()
	{
		this.is_loading = true;
		
		if( this.tipo_poliza.id)
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.tipoPolizaInfo.update( {tipo_poliza:this.tipo_poliza,servicios_poliza:this.servicios_tipo_poliza }).subscribe((tipo_poliza)=>{
				this.is_loading = false;
				this.router.navigate(['/tipo-polizas']);
			},error=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.tipoPolizaInfo.create( {tipo_poliza:this.tipo_poliza,servicios_poliza:this.servicios_tipo_poliza} ).subscribe((tipo_poliza)=>{
				this.is_loading = false;
				this.router.navigate(['/tipo-polizas']);
			},error=>this.showError(error));
		
		}
	}
}
