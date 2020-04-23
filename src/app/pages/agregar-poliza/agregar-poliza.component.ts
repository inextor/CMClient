import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router"
import { Centro_Medico, Poliza, Usuario, Tipo_Poliza, Paciente, Servicio } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from    '@angular/common';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-agregar-poliza',
  templateUrl: './agregar-poliza.component.html',
  styleUrls: ['./agregar-poliza.component.css']
})
export class AgregarPolizaComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	//BUSQUEDA CLIENTES	
	clientes: Usuario[]			= [];
	search_clientes: Usuario[]	= [];
	busquedaCliente: string		= '';
	familiares:Paciente[]=[];
	//FIN
	//TIPOS DE POLIZA
	tipos_poliza: Tipo_Poliza[]= [];
	is_loading:boolean  = false;

	poliza:Poliza = {
    id:null,
    id_paciente:null,
	id_tipo_poliza:null,
	id_servicio:null,
    nombre_mes_pago:'',
	};

	detalle_poliza:Tipo_Poliza;
	familiares_poliza:Paciente[]=[]

	servicio_poliza_search:SearchObject<Servicio>;
	search_servicios_poliza: Servicio[]	= [];

	ngOnInit()
	{
		let centro_medico = this.rest.getCurrentCentroMedico();
		this.poliza = {
			id: null,
			id_tipo_poliza:null,
			id_paciente:null,
			id_servicio:null,
			id_organizacion: centro_medico.id_organizacion
		};

		this.servicio_poliza_search = {
			eq: {},
			gt: {},
			ge: {},
			le: {},
			lt: {},
			lk: {},
			csv: {},
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

	seleccionarTipoPoliza(){
		this.rest.tipo_poliza.get(this.poliza.id_tipo_poliza).subscribe((tipo_poliza)=>{
			this.detalle_poliza = tipo_poliza;
			console.log('detalle poliza',this.detalle_poliza);
			let x = this.rest.servicio.search({
				lk: { nombre: 'Pago Poliza '+tipo_poliza.nombre },
				eq:{tipo:'POLIZA'}
			}).subscribe((response) => {
				this.search_servicios_poliza = response.datos;
				console.log('test pagopoliza',this.search_servicios_poliza);
				this.poliza.id_servicio = this.search_servicios_poliza[0].id
				x.unsubscribe();
			});

		},(error)=>this.showError(error));
	}

	agregarCliente(cliente){
		// if( !( servicio.id in this.servicios_by_id ) )
		// 	this.servicios_by_id[ servicio.id ] = servicio;
		console.log("agregando el cliente paciente id",cliente);
		this.poliza.id_paciente = cliente.id;

		this.busquedaCliente			= cliente.nombre;
		this.search_clientes	= [];
		this.rest.paciente.getAll({ id_usuario: cliente.id, familiar: 1 }).subscribe((familiares)=>{
			this.is_loading = false;
			this.familiares = familiares.datos;
			console.log('los familiares',this.familiares);
		},(error)=>this.showError(error));
	}

	agregarFamiliar(familiar){
		let s = this.familiares_poliza.find(i => i.id == familiar.familiar.id );
		if (s) {
			console.log('s',s);
			this.showError("No puedes agregar al mismo familiar dos veces.")
			return;
		}
		if(this.familiares_poliza.length<=this.detalle_poliza.cantidad_personas){
			this.familiares_poliza.push
			({
				familiar
			});
		}else{
			this.showError("Se llego al limite de personas por poliza.")
		}
	
		console.log('imprimiento familiar',this.familiares_poliza);
	}

	guardar()
	{
		this.is_loading = true;

		if( this.poliza.id  )
		{
			//this.rest.actualizarCentroMedico( this.poliza ).subscribe((poliza)=>{
			this.rest.polizaInfo.update( {poliza:this.poliza,familiares_poliza:this.familiares_poliza } ).subscribe((poliza)=>{
				this.is_loading = false;
				this.router.navigate(['/polizas']);
			},(error)=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.poliza ).subscribe((poliza)=>{
			this.rest.polizaInfo.create( {poliza:this.poliza,familiares_poliza:this.familiares_poliza } ).subscribe((poliza)=>{
				this.is_loading = false;
				this.router.navigate(['/polizas']);
			},(error)=>this.showError(error));
		}
	}


}
