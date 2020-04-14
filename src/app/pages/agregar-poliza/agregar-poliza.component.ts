import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router"
import { Centro_Medico, Poliza, Usuario, Tipo_Poliza, Paciente } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from    '@angular/common';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-agregar-poliza',
  templateUrl: './agregar-poliza.component.html',
  styleUrls: ['./agregar-poliza.component.css']
})
export class AgregarPolizaComponent extends BaseComponent implements OnInit {
  is_loading:boolean  = false;

	poliza:Poliza = {
    id:null,
    id_paciente:null,
    id_tipo_poliza:null,
    nombre_mes_pago:'',
	};

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	//BUSQUEDA CLIENTES	
	clientes: Usuario[]			= [];
	search_clientes: Usuario[]	= [];
	busquedaCliente: string				= '';
	familiares:Paciente[]=[];
	//FIN
	//TIPOS DE POLIZA
	tipos_poliza: Tipo_Poliza[]= [];
	ngOnInit()
	{
		this.poliza = {
			id: null,
			id_tipo_poliza:null
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.poliza.get( id ).subscribe((poliza)=>
				{
					this.is_loading = false;
					this.poliza = poliza;
				});
			}else{
				forkJoin([
					this.rest.tipo_poliza.getAll({}),
				])
				.subscribe((response)=>
				{
					this.is_loading = false;
					this.tipos_poliza = response[0].datos;
					// this.initValores( valores );
				}
				,(error)=>
				{
					this.is_loading = false;
					this.showError( error );
				});
			}

		},(error)=>this.showError(error));
	}

	//buscar clientes
	buscarCliente(evt: any)
	{
		let x = this.rest.usuario.search({
			lk: { nombre: evt.target.value },
			eq:{tipo:'PACIENTE'}
		}).subscribe((response) => {
			this.search_clientes = response.datos;
			x.unsubscribe();
		});
	}

	agregarCliente(cliente){
		// if( !( servicio.id in this.servicios_by_id ) )
		// 	this.servicios_by_id[ servicio.id ] = servicio;
		this.poliza.id_paciente = cliente.id_paciente;

		this.busquedaCliente			= cliente.nombre;
		this.search_clientes	= [];

		this.rest.paciente.getAll({ id_usuario: cliente.id }).subscribe((familiares)=>{
			this.is_loading = false;
			this.familiares = familiares.datos;
			console.log('los familiares',this.familiares);
		},(error)=>this.showError(error));

	}

	guardar()
	{
		this.is_loading = true;

		if( this.poliza.id  )
		{
			//this.rest.actualizarCentroMedico( this.poliza ).subscribe((poliza)=>{
			this.rest.poliza.update( this.poliza ).subscribe((poliza)=>{
				this.is_loading = false;
				this.router.navigate(['/polizas']);

			},(error)=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.poliza ).subscribe((poliza)=>{
			this.rest.poliza.create( this.poliza ).subscribe((poliza)=>{
				this.is_loading = false;
				this.router.navigate(['/polizas']);
			},(error)=>this.showError(error));
		}
	}


}
