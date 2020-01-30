import { Component, OnInit,Input,Output,SimpleChanges } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Doctor,Usuario,Tipo_Gasto } from '../../models/Modelos';
import { Router,ActivatedRoute,Params, ParamMap} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { forkJoin,of } from 'rxjs';
import { mergeMap,catchError } from 'rxjs/operators';
import { SearchObject, SearchCitaResponse } from '../../models/Respuestas';
import { Cita } from 'src/app/models/Modelos';
import { CitaInfo } from 'src/app/models/Respuestas';


interface Doctor_Info
{
	doctor: Doctor;
	citaInfo: CitaInfo[];
	intervals:	DateInterval[];
}

interface Citas_Por_Hora
{
	[key:number]:Citas_Por_Dia
}

interface Citas_Por_Dia
{
	[key:number]:Cita[];
}

interface Citas_Por_Doctor
{
	[key:number]:Citas_Por_Hora;
}

interface DateArray
{
	citas:Cita[];
}

interface DateInterval
{
	start:Date;
	end:Date;
	dates:CitaInfo[][];
}


@Component({
	selector: 'app-view-citas-doctores',
	templateUrl: './view-citas-doctores.component.html',
	styleUrls: ['./view-citas-doctores.component.css']
})

export class ViewCitasDoctoresComponent implements OnInit {
	public is_loading:boolean	= false;
	info_citas: SearchCitaResponse[] = [];
	@Input() startDate = new Date();
	titleDates:string[] = ['','','','','','',''];
	titleDatesStart:string[] = ['','','','','','',''];
	dateArray:Date[]=[null,null,null,null,null,null,null];
	indexDay:number[] = [0,1,2,3,4,5,6];
	doctores_info:Doctor_Info[] = [];
	intervals:DateInterval[];
	//
	showOptionDoctor: boolean = false;
	showOptionPaciente: boolean = false;
	showConfirmCancelar: boolean = false;
	showConfirmActivar: boolean = false;
	showConfirmDoctor: boolean = false;
	showConfirmPaciente: boolean = false;
	show_modal:boolean	= false;


	cita:Cita = {
		inicio: null
	}

	cita_fecha:Date = null;
	constructor(public rest: RestService)
	{

	}

	ngOnInit()
	{
		this.initDates();
		this.loadCitas();
	}

	ngOnChanges(properties:SimpleChanges)
	{

		if( properties['startDate'] )
		{
			this.loadCitas();
		}
	}

	loadCitas()
	{
		let startDate = new Date();
		startDate.setHours( 0 );
		startDate.setMinutes( 0 );
		startDate.setSeconds( 0 );
		startDate.setMilliseconds( 0 );

		let endDate = new Date();
		endDate.setTime( startDate.getTime() );
		endDate.setDate( startDate.getDate()+6 );

		let endSearch = new Date();
		endSearch.setTime( startDate.getTime() );
		endSearch.setDate( startDate.getDate()+8 );

		let id_centro_medico = 1; //XXX

		forkJoin([
			this.rest.citaInfo.search({
				eq: { id_centro_medico : id_centro_medico }
				,ge: { inicio: this.rest.getMysqlStringFromLocaDate( startDate ) }
				,le: { inicio: this.rest.getMysqlStringFromLocaDate( endSearch ) }
			})
			,this.rest.horarios_centro_medico.get( id_centro_medico )
		])
		.subscribe((responses)=>
		{
			// console.log("doctores", responses[1].doctores);
			this.doctores_info = responses[1].doctores.map(horario_doctor=>
			{
				let doctor		= horario_doctor.doctor;
			
				let citasInfo	= responses[0].datos.filter(citaInfo=>citaInfo.cita.id_doctor == doctor.id);

				// let startDate		= new Date();
				let startDate = new Date();
				// console.log("citasinfo",citasInfo);
		
				startDate.setHours( 0 );
				startDate.setMinutes( 0 );
				startDate.setSeconds( 0 );
				startDate.setMilliseconds( 0 );
				

				let endDate = new Date();
				endDate.setTime( startDate.getTime() );

				let minHour = 24;
				let maxHour = 0;
				let minMinutes = 60;
				let maxMinutes = 0;

				horario_doctor.horario.forEach((hd)=>
				{
					let tokensStart	= hd.hora_inicio.split(':');
					let tokensEnd	= hd.hora_final.split(':');

					let hourStart		= parseInt( tokensStart[0],10 );
					let minutesStart	= parseInt( tokensStart[1], 10 );

					let hourEnd			= parseInt( tokensEnd[0],10);
					let minutesEnd			= parseInt( tokensEnd[1],10);


					minHour		= Math.min( hourStart, minHour );
					maxHour		= Math.max( hourEnd, maxHour );
					minMinutes	= Math.max( minMinutes, minutesStart );
					maxMinutes	= Math.max( maxMinutes, minutesEnd );
				});
				console.log("imprimiendo el horario doctor",horario_doctor);
				startDate.setHours( minHour );
				startDate.setMinutes( minMinutes );

				endDate.setHours( maxHour );
				endDate.setMinutes( maxMinutes );

				console.log('HERE M*****ers');
				let intervals = this.getIntervalFromCitas( citasInfo, startDate, endDate, 40);
			
				this.addCitasToIntervals( citasInfo, intervals);

				return {
					doctor		: doctor
					,citaInfo	: citasInfo
					,intervals	: intervals
				};
			});
			console.log("doctoresinfo", this.doctores_info );
			
		});
	
	}

	initDates()
	{
		let dateNames:string[] = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']
		let currentDay = new Date();
		currentDay.setTime( this.startDate.getTime() );

		this.titleDates.forEach((i,index)=>
		{
			this.titleDates[ index ] = dateNames[ currentDay.getDay() ]+' '+currentDay.getDate();
			this.indexDay[ currentDay.getDay() ] = index;
			let datex=new Date();
			datex.setTime(currentDay.getTime());
			this.dateArray[index]=datex;

			//currenDay++
			currentDay.setDate( currentDay.getDate()+1 );
		});
		// console.log( this.indexDay );
	}


	getIntervalFromCitas(citas:CitaInfo[],start:Date, end:Date, minutes_increment:number):DateInterval[]
	{
		// console.log("End musst be",end );
		let dates:Date[] = [];
		let today = new Date();
		today.setSeconds( 0 );
		today.setMilliseconds( 0 );
		// console.log("citas antes de foreach",citas);
		citas.forEach((i)=>
		{
			let date = this.rest.getLocalDateFromMysqlString( i.cita.inicio );
			date.setSeconds( 0 );
			date.setMilliseconds( 0 );

			today.setMinutes( date.getMinutes() );
			today.setHours( date.getHours() );
			// 
			let nd = new Date();
			nd.setTime( today.getTime() );
			dates.push( nd );
			// console.log("push citas",citas);
		});
		console.log("dates",dates);
		let counter = new Date();
		counter.setTime( start.getTime() );
		counter.setMilliseconds( 0 );
		counter.setSeconds( 0 );

		let realEnd = new Date();
		realEnd.setTime( end.getTime() );
		realEnd.setMinutes( realEnd.getMinutes()+minutes_increment );

		// console.log('Realend', realEnd );

		while( counter < realEnd )
		{
			let d:Date = new Date();
			d.setTime( counter.getTime() );
			
			dates.push( d );
			counter.setMinutes( counter.getMinutes()+minutes_increment );
			// console.log('Counter', counter );
		}

		//Remove Duplicates
		dates.sort();
		let lastGoodIndex = null;
		let toRemove:number[] = []

		dates.forEach((i,index)=>
		{
			if( lastGoodIndex == null )
			{
				lastGoodIndex = index;
				return;
			}

			if( i.getHours() == dates[lastGoodIndex].getHours() && i.getMinutes() == dates[lastGoodIndex].getMinutes() )
			{
				toRemove.push( index )
			}
			else
			{
				lastGoodIndex = index;
			}
		});

		console.log('Dates are', dates );

		toRemove.sort()

		while( toRemove.length )
		{
			let index = toRemove.pop();
			dates.splice( index, 1 );
		}

		let intervals:DateInterval[] = [];

		for( let i=0;i<dates.length-1;i++)
		{
			intervals.push({start: dates[i], end: dates[i+1], dates:
				[
					[]
					,[]
					,[]
					,[]
					,[]
					,[]
					,[]
				]
			});
		}
		return intervals;
	}

	addCitasToIntervals(citas:CitaInfo[],intervals:DateInterval[])
	{
		if( intervals.length  == 0 )
			return;
			// console.log("intervals",intervals);
			// console.log("citasinfo",citas);
		citas.forEach((i)=>
		{
			let d = this.rest.getLocalDateFromMysqlString( i.cita.inicio );
			let day = d.getDay();

			d.setSeconds( 0 );
			d.setMilliseconds( 0 );
			d.setDate( intervals[0].start.getDate() );
			d.setMonth( intervals[0].start.getMonth() );
			console.log("cita",d);
			for(let j=0;j<intervals.length;j++)
			{
				// console.log("entroal for",intervals[j].start, intervals[j].end);
				console.log("intervalo",intervals[j]);
				console.log("la d",d);
				if( d>=intervals[j].start && d < intervals[j].end  )
				{
					console.log("entroakis");
					intervals[j].dates[ this.indexDay[ day  ] ].push( i );
					return;
				}
			}
			console.error('No se agrego la cita',i);
		});
	}


	//control para agendar cita

	dateClick(dateIntervalo:DateInterval,indice)
	{
		// console.log("citassss",citas);
		// this.cita_fecha = date;
		console.log("estoy imprimiendo el interval start",this.cita_fecha);

		let dateNow = this.dateArray[indice];
		console.log("citassssdatenow",dateNow);

		let dateCita = new Date();
		dateCita.setTime(dateNow.getTime());
		dateCita.setHours(dateIntervalo.start.getHours());
		dateCita.setMinutes(dateIntervalo.start.getMinutes());
		dateCita.setSeconds(0);
		dateCita.setMilliseconds(0);
		console.log("dacita",dateCita);
		// if( date < dateNow )
		// {
		// 	this.rest.showError({ mensaje: 'No se pueden agregar citas con fecha en el pasado', tipo:'alert-danger'});
		// 	return;
		// }

		// console.log("Click on ", date );
		// const calendarAPI = this.calendarComponent.getApi();

		//calendarAPI.addEvent({
		//	title: 'Cita'
		//	,id:'nueva_cita'
		//	,start: evt.date
		//	,editable: true
		//},'nueva_cita');
		//

		// let fecha = this.rest.getMysqlStringFromLocaDate( date );
		// this.cita.inicio = fecha.substring(0,20);

		console.log('Fecha inicio', this.cita.inicio );
		this.show_modal = true;
	}

	cancelarCita()
	{
		this.show_modal = false;
	}

	confirmarDoctor(infoCita: SearchCitaResponse)
{
	this.rest.cita.update({
		id: infoCita.cita.id
		, confirmado_por_doctor: 'SI'
	}).subscribe((cita) => {
		this.is_loading = false;
		this.showConfirmDoctor = false;
		let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
		if (index >= 0)
			this.info_citas[index].cita = cita;
	},
		(error) => {
			this.showConfirmDoctor = false;
			this.is_loading = false;
			this.showError(error);
		});
}

confirmarPaciente(infoCita: SearchCitaResponse)
{
	this.is_loading = true;
	this.rest.cita.update({
		id: infoCita.cita.id
		, confirmado_por_paciente: 'SI'
	}).subscribe((cita) => {
		this.is_loading = false;
		this.showConfirmPaciente = false;
		let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
		if (index >= 0)
			this.info_citas[index].cita = cita;
	}, (error) => {
		this.is_loading = false;
		this.showConfirmPaciente = false;
		this.showError(error);
	});
}

cancelar(infoCita: SearchCitaResponse)
{
	this.rest.cita.update({
		id: infoCita.cita.id
		, estatus: 'CANCELADA'
	}).subscribe((cita) => {
		console.log(infoCita);
		this.showConfirmCancelar = false;
		this.is_loading = false;
		let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
		if (index >= 0)
			this.info_citas[index].cita = cita;
	},
		(error) => {
			this.is_loading = false;
			this.showConfirmCancelar = false;
			this.showError(error)
		});
}

activar(infoCita: SearchCitaResponse) {
	this.rest.cita.update({
		id: infoCita.cita.id
		, estatus: 'ACTIVA'
	}).subscribe((cita) => {
		this.showConfirmActivar = false;
		let index = this.info_citas.findIndex(i => i.cita.id == infoCita.cita.id);
		this.is_loading = false;
		if (index >= 0)
			this.info_citas[index].cita = cita;
	}
		, (error) => {
			this.is_loading = false;
			this.showConfirmActivar = false;
			this.showError(error);
		});
}
	// aceptarCita()
	// {
	// 	let usuario = this.restService.getUsuarioSesion();
	// 	this.rest.cita.create({
	// 		id_centro_medico	: this.centro_medico.id
	// 		,id_doctor			: this.doctor.id
	// 		,id_paciente		: this.paciente.id
	// 		,inicio				: this.rest.getMysqlStringFromLocaDate( this.cita_fecha )
	// 		,fin					: this.cita.fecha + " " + this.cita.horaFin,
	// 		,nota				: this.cita.nota
	// 		,id_servicio 		: this.servicio ? this.servicio.id : null
	// 	})
	// 	.subscribe
	// 	(
	// 		response =>
	// 		{
	// 			this.citaAgendada.emit( response );
	// 			this.router.navigate(['/citas-paciente']);
	// 		}
	// 		,(error)=>
	// 		{
	// 			let str = this.rest.getErrorMessage( error );
	// 			this.rest.showError({ mensaje: this.rest.getErrorMessage( error ), tipo: 'alert-danger' });
	// 		}
	// 	);
	// }
}
