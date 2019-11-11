import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Respuesta } from '../models/Respuestas';

export class ObjRest<T>{
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

	get(id:number):Observable<T>
	{
		let params = new HttpParams();
		params = params.set('id',''+id);
		return this.http.get<T>(`${this.urlBase}`,{params,headers:this.getSessionHeaders(),withCredentials:true});
	}

	getAll(search:T,extraParams:any={}):Observable<Respuesta<T>>
	{
		let params = new HttpParams();

		for(let i in extraParams )
		{
			params = params.set(i,''+extraParams[i]);
		}

		for(let i in search)
		{
			if( search[i ] )
				params = params.set(i,''+search[i]);
		}
		return this.http.get<Respuesta<T>>(`${this.urlBase}`,{params,headers:this.getSessionHeaders(),withCredentials:true});
	}

	create(obj:T):Observable<T>
	{
		return this.http.post<T>(`${this.urlBase}`,obj,{headers:this.getSessionHeaders(),withCredentials:true});
	}

	update(obj:T):Observable<T>
	{
		return this.http.put<T>(`${this.urlBase}`,obj,{headers:this.getSessionHeaders(),withCredentials:true});
	}

	batchUpdate(obj:T[]):Observable<T[]>
	{
		return this.http.put<T[]>(`${this.urlBase}`,obj,{headers:this.getSessionHeaders(),withCredentials:true});
	}

	delete(obj:T):Observable<T>
	{
		let params = new HttpParams();

		for(let i in obj)
		{
			params = params.set(i,''+obj[i]);
		}

		return this.http.delete<T>(`${this.urlBase}`,{params,headers:this.getSessionHeaders(),withCredentials:true});
	}
}
