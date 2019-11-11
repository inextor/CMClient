import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Doctor,Paciente } from '../../models/Modelos';
import { SearchCitaResponse } from '../../models/Respuestas';
import {Router,ActivatedRoute} from "@angular/router"
import { Cita } from '../../models/Modelos';
@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {

  constructor(
		private rest:RestService,
		private router:Router,
		private route:ActivatedRoute,
	) { }

	cita:Cita = {};
	info_citas:SearchCitaResponse[] = [];
	orderBy = 'Fecha';
	orderDirection='ASC';

	ngOnInit() {
		let d = new Date();
		d.setHours( d.getHours() - 3 );
		let z = (i)=> i<10 ? '0'+i : i;

		//this.rest.searchCitas({fecha_inicio: d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())+' '+z(d.getHours())+':'+z(d.getMinutes())+':00'}).subscribe((respuesta)=>
		this.rest.searchCita.getAll({fecha_inicio: d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())+' '+z(d.getHours())+':'+z(d.getMinutes())+':00'}).subscribe((respuesta)=>
		{
			console.log( respuesta.datos );
			this.info_citas = respuesta.datos;
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
		//this.rest.searchCitas({ nombre }).subscribe((respuesta)=>
		this.rest.searchCita.getAll({ nombre }).subscribe((respuesta)=>
		{
			this.info_citas = respuesta.datos;
		});
	}

	confirmarDoctor(id_cita:number)
	{
		/*
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
							let index = this.info_citas.findIndex(i=> i.cita.id ==  id_cita );
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
		*/
	}

	confirmarPaciente(id_cita:number)
	{
		/*
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
		*/
	}

	cancelar(id_cita:number)
	{
		/*
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
		*/
	}

	activar(id_cita:number)
	{
		/*
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
		*/
	}

}
