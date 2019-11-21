
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Respuesta } from '../models/Respuestas';
import { SearchObject } from '../models/Respuestas';

export class SearchRest<U,T>{
	private urlBase:string;
	private http:HttpClient;

	constructor(urlBase:string,http:HttpClient)
	{
		this.urlBase = urlBase;
		this.http = http;
	}

	private getSessionHeaders():HttpHeaders
	{
		if( localStorage.getItem('session_token') == null )
		{
			console.log("THer is no session token");
			return new HttpHeaders();
		}

		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('session_token'));
		return headers;
	}

	get(id:string):Observable<T>
	{
		let params = new HttpParams();
		params = params.append('id',''+id);
		return this.http.get<T>(`${this.urlBase}`,{params,headers:this.getSessionHeaders(),withCredentials:true});
	}

	getAll(search:U,extraParams:Object={}):Observable<Respuesta<T>>
	{
		let params = new HttpParams();

		for( let i in extraParams )
		{
			params = params.set(i,extraParams[''+i]);
		}

		for( let i in search)
		{
			if( search[i ] )
				params = params.set(i,''+search[i]);
		}
		return this.http.get<Respuesta<T>>(`${this.urlBase}`,{params,headers:this.getSessionHeaders(),withCredentials:true});
	}

	search(searchObj:SearchObject<U>):Observable<Respuesta<T>>
	{
		let params = new HttpParams();

		for(let i in searchObj.eq )
			if( searchObj.eq[i] )
				params = params.set(i+'=',''+searchObj.eq[i] );

		for(let i in searchObj.gt )
			if( searchObj.gt[i] )
				params = params.set(i+'>',''+searchObj.gt[i] );

		for(let i in searchObj.lt )
			if( searchObj.lt[i] )
				params = params.set(i+'<',''+searchObj.lt[i] );

		for(let i in searchObj.ge )
			if( searchObj.ge[i] )
				params = params.set(i+'>~',''+searchObj.ge[i] );

		for(let i in searchObj.le )
			if( searchObj.le[i] )
				params = params.set(i+'<~',''+searchObj.le[i] );

		for(let i in searchObj.lk )
			if( searchObj.lk[i] )
				params = params.set(i+'~~',''+searchObj.lk[i] );

		if( searchObj.ids && searchObj.ids.length > 0 )
			params = params.set( 'ids', searchObj.ids.join(',') );

		if( searchObj.idss && searchObj.idss.length > 0 )
			params = params.set( 'ids', searchObj.ids.join(',') );

		if( searchObj.pagina )
		{
			params = params.set( 'pagina', ''+searchObj.pagina );
		}

		if( searchObj.limite )
		{
			params = params.set( 'limite', ''+searchObj.limite );
		}

		return this.http.get<Respuesta<T>>(`${this.urlBase}`,{params,headers:this.getSessionHeaders(),withCredentials:true});
	}
}
