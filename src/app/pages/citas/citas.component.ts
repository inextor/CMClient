import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor,Paciente } from '../../models/Modelos';
import { SearchCitaResponse,SearchCitaRequest } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { Cita } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent extends BaseComponent implements OnInit {

	cita:Cita = {};
	info_citas:SearchCitaResponse[] = [];
	orderBy = 'Fecha';
	orderDirection='ASC';
	tipo_busqueda = 'nombre';
	paciente:Paciente = {};
	doctor:Doctor = {};

	crequest:SearchCitaRequest = {

	};


	ngOnInit() {

		let d = new Date();
		d.setHours( d.getHours() - 3 );
		let z = (i)=> i<10 ? '0'+i : i;


		this.route.paramMap.subscribe( params =>
		{

			let id_paciente	= params.get('id_paciente') ==null ? null : parseInt(params.get('id_paciente') );

			if( id_paciente )
			{
				console.log("PACIENTE FOOOOO No paso NADA");
				this.tipo_busqueda = 'fecha'
				this.crequest.id_paciente = id_paciente;
				//this.rest.getPaciente( id_paciente ).subscribe(paciente=> this.paciente = paciente);
				this.rest.paciente.get( id_paciente ).subscribe(paciente=> this.paciente = paciente);
			}

			let id_doctor  = params.get('id_doctor') == null ? null : parseInt(params.get('id_doctor') );

			if( id_doctor )
			{
				this.tipo_busqueda = 'fecha'
				this.crequest.id_doctor = id_doctor;
				//this.rest.getDoctor( id_doctor ).subscribe(doctor=> this.doctor = doctor);
				this.rest.doctor.get( id_doctor ).subscribe(doctor=> this.doctor = doctor);
			}

			if( !this.crequest.id_paciente && !this.crequest.id_doctor )
			{
			  let fecha_inicio:string = ''+d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())+' '+z(d.getHours())+':'+z(d.getMinutes())+':00';
			  this.crequest.fecha_inicio = fecha_inicio;
			}

			console.log("crequest",this.crequest );

			this.search('');
			//this.rest.searchCitas( this.crequest ).subscribe( respuesta => {
			//	console.log( respuesta.datos );
			//	this.info_citas = respuesta.datos;
			//	this.is_loading = false;
			//},
			//()=>
			//{
			//	this.is_loading = false;
			//});
		});
	}

	changeSearch( evt )
	{
		console.log("FOOOOO make a search", evt);
		this.search( evt.target.value );
	}

	ordenar(item)
	{
		if( this.orderBy === item )
		{
			this.orderDirection == 'ASC' ? 'DESC' : 'ASC';
		}
		else
		{
			this.orderBy = item;
			this.orderDirection = 'ASC';
		}
	}

	search(nombre)
	{
		if( nombre.trim() )
			this.crequest.nombre = nombre.trim();
		else
			this.crequest.nombre = '';

		//this.rest.searchCitas( this.crequest ).subscribe((respuesta)=>
		//Esperando que funcione la siguiente linea
		this.rest.searchCita.getAll( this.crequest ).subscribe((respuesta)=>
		{
			this.info_citas = respuesta.datos;
			this.is_loading = false;
		},
		()=>
		{
			this.is_loading = false;
		}
		);
	}

	confirmarDoctor(id_cita:number)
	{
		this.alertController.create({
			header: 'Alerta',
			subHeader: 'Confirmar doctor',
			message: 'El doctor ha confirmado la cita?',
			buttons: [
				{
					text: 'Cancelar',
					role:'cancel',
					handler:(result)=>
					{
						console.log("Cancelar");
					}
				},
				{
					text: 'Ok',
					handler: (result)=>
					{
						//this.rest.updateCita({
						this.rest.cita.update({
							id: id_cita
							,confirmado_por_doctor: 'SI'
						}).subscribe((cita)=>
						{
							let index = this.info_citas.findIndex(i=> i.cita.id == id_cita );
							if( index >= 0 )
								this.info_citas[ index ].cita = cita;
						});
						console.log("OK");
					}
				}
			]
		}).then((alert)=>
		{
			alert.present().then((result)=>
			{
				console.log( result );
			},
			(error)=>{
				console.log('Ocurrio un error',error);
			});
		});
	}

	confirmarPaciente(id_cita:number)
	{
		let alert = this.alertController.create({
			header: 'Alerta',
			subHeader: 'Confirmar paciente',
			message: 'El paciente ha confirmado la cita?',
			buttons: [
				{
					text: 'Cancelar',
					role:'cancel',
					handler:(result)=>
					{
						console.log("Cancelar");
					}
				},
				{
					text: 'Ok',
					handler: (result)=>
					{
						console.log("OK");
						//this.rest.updateCita({
						this.rest.cita.update({
							id: id_cita
							,confirmado_por_paciente : 'SI'
						}).subscribe((cita)=>
						{
							let index = this.info_citas.findIndex(i=> i.cita.id ==  id_cita );
							if( index >= 0 )
								this.info_citas[ index ].cita = cita;
						});

					}
				}
			]
		}).then((alert)=>
		{
			alert.present().catch((error)=>{
				console.log('Ocurrio un error',error);
			});
		});
	}

	cancelar(id_cita:number)
	{
		this.alertController.create({
			header: 'Alerta',
			subHeader: 'Cancelar la cita',
			message: 'Esta seguro que desea cancelar la cita?',
			buttons: [
				{
					text: 'No',
					role:'cancel',
					handler:(result)=>
					{
						console.log("Cancelar");
					}
				},
				{
					text: 'Si',
					handler: (result)=>
					{
						//this.rest.updateCita({
						this.rest.cita.update({
							id: id_cita
							,estatus: 'CANCELADA'
						}).subscribe((cita)=>
						{
							console.log( id_cita );
							let index = this.info_citas.findIndex(i=> i.cita.id ==  id_cita );
							if( index >= 0 )
								this.info_citas[ index ].cita = cita;
						});

					}
				}
			]
		}).then((alert)=>
		{
			alert.present().then((result)=>
			{
				console.log( result );
			},
			(error)=>{
				console.log('Ocurrio un error',error);
			});
		});
	}

	activar(id_cita:number)
	{
		this.alertController.create({
			header: 'Alerta',
			subHeader: 'Activar la cita',
			message: 'Esta seguro que desea activar la cita?',
			buttons: [
				{
					text: 'Cancelar',
					role:'cancel',
					handler:(result)=>
					{
						console.log("Cancelar");
					}
				},
				{
					text: 'Ok',
					handler: (result)=>
					{
						console.log("OK");

						//this.rest.updateCita({
						this.rest.cita.update({
							id: id_cita
							,estatus: 'ACTIVA'
						}).subscribe((cita)=>
						{
							let index = this.info_citas.findIndex(i=> i.cita.id ==  id_cita );
							if( index >= 0 )
								this.info_citas[ index ].cita = cita;
						});
					}
				}
			]

		}).then((alert)=>
		{
			alert.present().then((result)=>
			{
				console.log( result );
			},
			(error)=>{
				console.log('Ocurrio un error',error);
			});
		});
	}


}
