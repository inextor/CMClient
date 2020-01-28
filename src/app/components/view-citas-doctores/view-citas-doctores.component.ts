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
import { SearchObject } from '../../models/Respuestas';
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

	@Input() startDate = new Date();
	titleDates:string[] = ['','','','','','',''];
	indexDay:number[] = [0,1,2,3,4,5,6];
	doctores_info:Doctor_Info[] = [];
	intervals:DateInterval[];

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
			this.rest.citaInfo.search
			({
				eq: { id_centro_medico : id_centro_medico }
				,ge: { inicio: this.rest.getMysqlStringFromLocaDate( startDate ) }
				,le: { inicio: this.rest.getMysqlStringFromLocaDate( endSearch ) }
			})
			,this.rest.horarios_centro_medico.get( id_centro_medico )
		])
		.subscribe((responses)=>
		{
			console.log("doctores", responses[1].doctores);
			this.doctores_info = responses[1].doctores.map(horario_doctor=>
			{
				let doctor		= horario_doctor.doctor;
				
				let citasInfo	= responses[0].datos.filter(citaInfo=>citaInfo.cita.id_doctor = doctor.id)

				let startDate		= new Date();

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

			
		});
		// console.log("doctoresinfo", this.doctores_info );
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
			currentDay.setDate( currentDay.getDate()+1 );
		});
		console.log( this.indexDay );
	}


	getIntervalFromCitas(citas:CitaInfo[],start:Date, end:Date, minutes_increment:number):DateInterval[]
	{
		console.log("End musst be",end );
		let dates:Date[] = [];
		let today = new Date();
		today.setSeconds( 0 );
		today.setMilliseconds( 0 );
		console.log("citas antes de foreach",citas);
		citas.forEach((i)=>
		{
			let date = this.rest.getLocalDateFromMysqlString( i.cita.inicio );
			date.setSeconds( 0 );
			date.setMilliseconds( 0 );

			today.setMinutes( date.getMinutes() );
			today.setHours( date.getHours() );

			let nd = new Date();
			nd.setTime( today.getTime() );
			dates.push( nd );
			console.log("push citas",citas);
		});

		let counter = new Date();
		counter.setTime( start.getTime() );
		counter.setMilliseconds( 0 );
		counter.setSeconds( 0 );

		let realEnd = new Date();
		realEnd.setTime( end.getTime() );
		realEnd.setMinutes( realEnd.getMinutes()+minutes_increment );

		console.log('Realend', realEnd );

		while( counter < realEnd )
		{
			let d:Date = new Date();
			d.setTime( counter.getTime() );
			dates.push( d );
			counter.setMinutes( counter.getMinutes()+minutes_increment );
			console.log('Counter', counter );
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

		citas.forEach((i)=>
		{
			let d = this.rest.getLocalDateFromMysqlString( i.cita.inicio );
			let day = d.getDay();

			d.setSeconds( 0 );
			d.setMilliseconds( 0 );

			d.setDate( intervals[0].start.getDate() );
			d.setMonth( intervals[0].start.getMonth() );
			// console.log("cita",d);
			for(let j=0;j<intervals.length;j++)
			{
				// console.log("entroal for",intervals[j].start, intervals[j].end);
				if( d >= intervals[j].start && d<intervals[j].end )
				{
					intervals[j].dates[ this.indexDay[ day  ] ].push( i );
					return;
				}
			}
			// console.error('No se agrego la cita',i);
		});
	}
}
