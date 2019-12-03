import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject,forkJoin, fromEvent} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { LoginResponse,AgregarUsuarioResponse,SearchCitaRequest,SearchCitaResponse,Respuesta,ServicioResponseItem,Servicio_Recurso, ErrorMensaje} from '../models/Respuestas';
import { Pregunta_Historia_Clinica,Especialidad_Pregunta, Bitacora, Consulta, Especialidad, Historia_Horario, Respuesta_Historia_Clinica, Sesion, Ingreso } from '../models/Modelos';
import { PreguntasHistoriaClinicaResponse } from '../models/Respuestas';
import { SesionInfo,Especialidad_Pregunta_Accion } from '../models/Respuestas';
import { Tipo_Gasto } from '../models/Modelos';
import {ObjRest} from './ObjRest';
import {SearchRest} from './SearchRest';
import {SearchGastoCentroMedico,SearchGastoCentroMedicoResponse} from '../models/Respuestas';
import {RespuestaPreguntaHistoriaClinica } from '../models/Respuestas';
import {   Centro_Medico, Cita,
Comision_Por_Servios, Comisiones_Doctor, Configuracion, Consultorio, Consultorio_Doctor,
Detalle_Venta, Detalle_Requisicion, Doctor, Expediente, Factura, Fondo_Caja, Gasto_Centro_Medico, Gasto_Doctor,
 Horario_Doctor, Imagen, Inventario,  Notificacion, Organizacion,
Paciente, Pago, Poliza, Precio_Servicio, Recepcionista_Doctor, Servicio, Tipo_Precio,
	Usuario, Venta, Proveedor, Requisicion} from	'../models/Modelos';


@Injectable({
	providedIn: 'root'
})

export class RestService {
	public currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;

	public errorBehaviorSubject: BehaviorSubject<ErrorMensaje>;
	public errorObservable:Observable<ErrorMensaje>;
	public keyUpObserver:Observable<KeyboardEvent>;


	urlBase:string = '';

	public bitacora:ObjRest<Bitacora>;
	public centro_medico:ObjRest<Centro_Medico>;
	public proveedor:ObjRest<Proveedor>;
	public cita:ObjRest<Cita>;
	public comision_por_servios:ObjRest<Comision_Por_Servios>;
	public comisiones_doctor:ObjRest<Comisiones_Doctor>;
	public configuracion:ObjRest<Configuracion>;
	public consultorio:ObjRest<Consultorio>;
	public consultorio_doctor:ObjRest<Consultorio_Doctor>;
	public detalle_venta:ObjRest<Detalle_Venta>;
	public doctor:ObjRest<Doctor>;
	public especialidad:ObjRest<Especialidad>;
	public expediente:ObjRest<Expediente>;
	public factura:ObjRest<Factura>;
	public fondo_caja:ObjRest<Fondo_Caja>;
	public gasto_centro_medico:ObjRest<Gasto_Centro_Medico>;
	public gasto_doctor:ObjRest<Gasto_Doctor>;
	public historia_horario:ObjRest<Historia_Horario>;
	public horario_doctor:ObjRest<Horario_Doctor>;
	public imagen:ObjRest<Imagen>;
	public inventario:ObjRest<Inventario>;
	public notificacion:ObjRest<Notificacion>;
	public organizacion:ObjRest<Organizacion>;
	public paciente:ObjRest<Paciente>;
	public pago:ObjRest<Pago>;
	public poliza:ObjRest<Poliza>;
	public precio_servicio:ObjRest<Precio_Servicio>;
	public pregunta_historia_clinica:ObjRest<Pregunta_Historia_Clinica>;
	public recepcionista_doctor:ObjRest<Recepcionista_Doctor>;
	public respuesta_historia_clinica:ObjRest<Respuesta_Historia_Clinica>;
	public servicio:ObjRest<Servicio>;
	public sesion:ObjRest<Sesion>;
	public tipo_gasto:ObjRest<Tipo_Gasto>;
	public tipo_precio:ObjRest<Tipo_Precio>;
	public usuario:ObjRest<Usuario>;
	public searchCita:SearchRest<SearchCitaRequest,SearchCitaResponse>;
	public especialidad_pregunta:ObjRest<Especialidad_Pregunta>;
	public searchGastoCentroMedico:SearchRest<Gasto_Centro_Medico,SearchGastoCentroMedicoResponse>;
	public searchServicio:SearchRest<Servicio,ServicioResponseItem>;
	public servicio_recurso:ObjRest<Servicio_Recurso>;
	public consulta:ObjRest<Consulta>;
	public ingreso:ObjRest<Ingreso>;
	public detalle_requisicion:ObjRest<Detalle_Requisicion>;


	//End vars


	// usuario_centro_medico:ObjRest<Usuario_Centro_Medico>;
	venta:ObjRest<Venta>;
	public requisicion:ObjRest<Requisicion>;


	constructor(private http: HttpClient)
	{
		//Produccion por cambiarx`x
		this.urlBase = 'http://';

		if( window.location.hostname.indexOf('127.0.0.1' ) == 0 )
			this.urlBase = 'http://hospital.nextor.mx';

		if( window.location.hostname.indexOf('localhost') == 0 )
			this.urlBase = 'http://127.0.0.1/CentroMedico';

		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('usuario')));
		this.currentUser = this.currentUserSubject.asObservable();


		this.keyUpObserver = fromEvent<KeyboardEvent>( window.document.body, 'keyup' );

		this.errorBehaviorSubject = new BehaviorSubject<ErrorMensaje>(null);
		this.errorObservable = this.errorBehaviorSubject.asObservable();

		//this.doctor = new DoctorRest(http,this.urlBase);
		this.bitacora						= new ObjRest<Bitacora>                         (`${this.urlBase}/bitacora.php`,http);
		this.centro_medico					= new ObjRest<Centro_Medico>                    (`${this.urlBase}/centro_medico.php`,http);
		this.proveedor						= new ObjRest<Proveedor>                    	(`${this.urlBase}/proveedor.php`,http);
		this.cita							= new ObjRest<Cita>                             (`${this.urlBase}/cita.php`,http);
		this.comision_por_servios			= new ObjRest<Comision_Por_Servios>             (`${this.urlBase}/comision_por_servios.php`,http);
		this.comisiones_doctor				= new ObjRest<Comisiones_Doctor>                (`${this.urlBase}/comisiones_doctor.php`,http);
		this.configuracion					= new ObjRest<Configuracion>                    (`${this.urlBase}/configuracion.php`,http);
		this.consulta						= new ObjRest<Consulta>                         (`${this.urlBase}/consulta.php`,http);
		this.consultorio					= new ObjRest<Consultorio>                      (`${this.urlBase}/consultorio.php`,http);
		this.consultorio_doctor				= new ObjRest<Consultorio_Doctor>               (`${this.urlBase}/consultorio_doctor.php`,http);
		this.detalle_venta					= new ObjRest<Detalle_Venta>                    (`${this.urlBase}/detalle_venta.php`,http);
		this.doctor							= new ObjRest<Doctor>                           (`${this.urlBase}/doctor.php`,http);
		this.especialidad_pregunta			= new ObjRest<Especialidad_Pregunta>            (`${this.urlBase}/especialidad_pregunta.php`,http);
		this.expediente						= new ObjRest<Expediente>                       (`${this.urlBase}/expediente.php`,http);
		this.factura						= new ObjRest<Factura>                          (`${this.urlBase}/factura.php`,http);
		this.fondo_caja						= new ObjRest<Fondo_Caja>                       (`${this.urlBase}/fondo_caja.php`,http);
		this.gasto_centro_medico			= new ObjRest<Gasto_Centro_Medico>              (`${this.urlBase}/gasto_centro_medico.php`,http);
		this.gasto_doctor					= new ObjRest<Gasto_Doctor>                     (`${this.urlBase}/gasto_doctor.php`,http);
		this.historia_horario				= new ObjRest<Historia_Horario>                 (`${this.urlBase}/historia_horario.php`,http);
		this.horario_doctor					= new ObjRest<Horario_Doctor>                   (`${this.urlBase}/horario_doctor.php`,http);
		this.imagen							= new ObjRest<Imagen>                           (`${this.urlBase}/imagen.php`,http);
		this.inventario						= new ObjRest<Inventario>                       (`${this.urlBase}/inventario.php`,http);
		this.notificacion					= new ObjRest<Notificacion>                     (`${this.urlBase}/notificacion.php`,http);
		this.organizacion					= new ObjRest<Organizacion>                     (`${this.urlBase}/organizacion.php`,http);
		this.paciente						= new ObjRest<Paciente>                         (`${this.urlBase}/paciente.php`,http);
		this.pago							= new ObjRest<Pago>                             (`${this.urlBase}/pago.php`,http);
		this.poliza							= new ObjRest<Poliza>                           (`${this.urlBase}/poliza.php`,http);
		this.precio_servicio				= new ObjRest<Precio_Servicio>                  (`${this.urlBase}/precio_servicio.php`,http);
		this.pregunta_historia_clinica		= new ObjRest<Pregunta_Historia_Clinica>        (`${this.urlBase}/pregunta_historia_clinica.php`,http);
		this.recepcionista_doctor			= new ObjRest<Recepcionista_Doctor>             (`${this.urlBase}/recepcionista_doctor.php`,http);
		this.respuesta_historia_clinica		= new ObjRest<Respuesta_Historia_Clinica>       (`${this.urlBase}/respuesta_historia_clinica.php`,http);
		this.servicio						= new ObjRest<Servicio>                         (`${this.urlBase}/servicio.php`,http); //NO SOPORTA POST
		this.servicio_recurso				= new ObjRest<Servicio_Recurso>					(`${this.urlBase}/servicio_recurso.php`,http); //PARA dar de alta el servicio

		//this.sesion						= new ObjRest<Sesion>                           (`${this.urlBase}/sesion.php`,http);
		this.tipo_gasto						= new ObjRest<Tipo_Gasto>                       (`${this.urlBase}/tipo_gasto.php`,http);
		this.tipo_precio					= new ObjRest<Tipo_Precio>                      (`${this.urlBase}/tipo_precio.php`,http);
		this.usuario						= new ObjRest<Usuario>                          (`${this.urlBase}/usuario.php`,http);
		// this.usuario_centro_medico		= new ObjRest<Usuario_Centro_Medico>            (`${this.urlBase}/usuario_centro_medico.php`,http);
		this.venta							= new ObjRest<Venta>                            (`${this.urlBase}/venta.php`,http);
		this.searchCita						= new SearchRest<SearchCitaRequest,SearchCitaResponse>(`${this.urlBase}/searchCita.php`,http);
		this.especialidad_pregunta			= new ObjRest<Especialidad_Pregunta_Accion>                     (`${this.urlBase}/especialidad_pregunta.php`,http);
		this.searchGastoCentroMedico		= new SearchRest<Gasto_Centro_Medico,SearchGastoCentroMedicoResponse>(`${this.urlBase}/searchGastosCentroMedico.php`,http);
		this.searchServicio					= new SearchRest<Servicio,ServicioResponseItem>(`${this.urlBase}/searchServicio.php`,http);
		this.especialidad					= new ObjRest<Especialidad>						(`${this.urlBase}/especialidad.php`,http);
		this.consulta						= new ObjRest<Consulta>							(`${this.urlBase}/consulta.php`,http);
		this.ingreso						= new ObjRest<Ingreso>							(`${this.urlBase}/ingreso.php`,http);
		this.requisicion					= new ObjRest<Requisicion>						(`${this.urlBase}/requisicion.php`,http);
	}

	getCurrentCentroMedico()
	{
		let c_id = localStorage.getItem('id_centro_medico');
		if( c_id !== null && c_id !== undefined )
			return parseInt( c_id );

		return null;
	}

	logout() {
		// remove user from local storage and set current user to null
		localStorage.clear();
		// localStorage.removeItem('usuario');
		// localStorage.removeItem('session_token');
		// localStorage.removeItem('id_organizacion');
		this.currentUserSubject.next(null)
    }

	doLogin(usuario:string,contrasena:string):Observable<LoginResponse>
	{
		let result = this.http.post<any>( `${this.urlBase}/login.php`,{usuario,contrasena}, { withCredentials: true })
			.pipe( map(response=>{
				if(response && response.sesion.id) {
					localStorage.setItem("usuario", JSON.stringify( response ) );
					localStorage.setItem('session_token', response.sesion.id );
					this.currentUserSubject.next(response)
					// localStorage.setItem("usuario", JSON.stringify( usuario ) );
					// localStorage.setItem('session_token', response.sesion.id );
					// localStorage.setItem('id_organizacion', ''+response.usuario.id_organizacion );
					// this.currentUserSubject.next(usuario)
				}

				return response;
			}));

		return result;
	}

	activeMenu(){
		if(this.isLoggedIn){
			if(localStorage.getItem('activate_menu')!=null){
				if(localStorage.getItem('activate_menu')=='true'){
					localStorage.setItem('activate_menu', 'false')
				}else{
					localStorage.setItem('activate_menu', 'true')
				}
			}else{
				localStorage.setItem("activate_menu", 'true');
			}
		}
	}
	statusMenu(){
		if(this.isLoggedIn){
			if(localStorage.getItem("activate_menu")=='true'){
				return true
			}else{
				return false
			}
		}

	}

	uploadImage(file:File,es_privada:boolean=false):Observable<Imagen>
	{
		let fd = new FormData();
		fd.append('image',file, file.name);
		fd.append('is_privada', es_privada?'1':'0' );
		return this.http.post(`${this.urlBase}/imagen.php`,fd,{headers:this.getSessionHeaders(),withCredentials:true});
	}

	public get currentUserValue() {
        return this.currentUserSubject.value;
	}

	hasRoles(roles:string[]): boolean{
		for(const oneRole of roles){
			if(!this.currentUser ||!this.currentUserValue.tipo.includes(oneRole)){
				return false
			}
		}
		return true;
	}

	getOrganizacion()
	{
		return 1;
	}
	getSessionHeaders()
	{
		if( localStorage.getItem('session_token') == null )
		{
			console.log("THer is no session token");
			return new HttpHeaders();
		}

		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('session_token'));
		return headers;
	}

	isLoggedIn()
	{
		let token = localStorage.getItem('session_token');
		if( token )
			return true;

		return false;
	}

	getUsuarioOrganizacion(){
		let user_org = localStorage.getItem('id_organizacion')
		if( user_org == null)
			return null

		let user_data = this.transformJson(user_org);
	}

	getUsuarioCentroMedico(){
		let user_cm = localStorage.getItem('id_centro_medico')
		if( user_cm == null)
			return null

		let user_data = this.transformJson(user_cm);
	}

	getUsuarioSesion():Usuario
	{
		let user_str = localStorage.getItem('usuario');
		if( user_str == null )
			return null;

		let user_data = this.transformJson( user_str );

		return user_data.usuario;
	}

	transformJson(response)
	{
		return JSON.parse( response, (key,value)=>{
			if( typeof value === "string" )
			{
				if( /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test( value ) )
				{
					let components = value.split(/-|:|\s/g);

					let utcTime = Date.UTC(
						parseInt( components[0] ),
									parseInt( components[1] )-1,
									parseInt( components[2] ),
									parseInt( components[3] ),
									parseInt( components[5] )
								);
					let localTime = new Date();
					localTime.setTime( utcTime );
					return localTime;
				}
			}

			return value;
		});
	}

	getLocalDateFromMysqlString(str:string)
	{
		let components = str.split(/-|:|\s/g);
		let d = new Date(parseInt( components[0] ), //Year
				parseInt(components[1])-1, //Month
				parseInt(components[2]), //Day
				parseInt(components[3]), //Hour
				parseInt(components[5])) //Minutes
		return d;
	}

	getDateFromMysqlString(str:string):Date
	{
		let components = str.split(/-|:|\s/g);

				let utcTime = Date.UTC(
						parseInt(components[0]),
						parseInt(components[1])-1,
						parseInt(components[2]),
						parseInt(components[3]),
						parseInt(components[5])
				);

		let d = new Date();
		d.setTime( utcTime );

		return d;
	}

	getMysqlStringFromLocaDate(d:Date):string
	{
		 let event_string = d.getFullYear()
								+'-'+(d.getMonth()+1)
								+'-'+d.getDate()
								+' '+d.getHours()
								+':'+d.getMinutes()
								+':'+d.getSeconds();

		return event_string;

	}

	getMysqlStringFromDate(d:Date):string
	{
			let event_string = d.getUTCFullYear()
								+'-'+(d.getUTCMonth()+1)
								+'-'+d.getUTCDate()
								+' '+d.getUTCHours()
								+':'+d.getUTCMinutes()
								+':'+d.getUTCSeconds();

		return event_string;
	}

	getErrorMessage( error )
	{
		if( error == null || error === undefined)
			return 'Error desconocido';

		if( typeof( error.error ) === "string" )
			return error.error;

		console.log( error );

		if( 'error' in error &&  typeof(error.error) !== "string" && 'error' in error.error )
		{
			 return error.error.error;
		}
		else if( error instanceof HttpErrorResponse )
		{
			return error.statusText;
		}
	}

	getSesion():SesionInfo{
		const user_str = localStorage.getItem('usuario');
		if(user_str){
			return this.transformJson( user_str );
			//return JSON.parse(user_str);
		}
		return null;
	}

	agregarUsuarioDoctor(usuario:Usuario,doctor:Doctor):Observable<AgregarUsuarioResponse>
	{
		console.log( "HEADERS",this.getSessionHeaders() );
		return this.http.post<AgregarUsuarioResponse>(`${this.urlBase}/usuario.php`,{usuario,doctor},{ headers: this.getSessionHeaders(),withCredentials:true});
	}

	agregarUsuario(usuario:Usuario):Observable<AgregarUsuarioResponse>
	{
		console.log( "HEADERS",this.getSessionHeaders() );
		return this.http.post<AgregarUsuarioResponse>(`${this.urlBase}/usuario.php`,{usuario},{ headers: this.getSessionHeaders(),withCredentials:true});
	}

	getPreguntasEspecialidad(idEspecialidad:number):Observable<Respuesta<PreguntasHistoriaClinicaResponse>>
	{
		let params = new HttpParams();
		params = params.set('id',''+idEspecialidad);
		return this.http.get<Respuesta<PreguntasHistoriaClinicaResponse>>(`${this.urlBase}/getPreguntasParaEspecialidad.php`,{params,headers:this.getSessionHeaders()});
	}

	getPreguntasRespuestasHistoriaClinica(id_paciente:number,id_doctor:number,id_especialidad:number=null):Observable<Respuesta<RespuestaPreguntaHistoriaClinica>>
	{
		let params = new HttpParams();
		params = params.set('id_paciente',''+id_paciente );
		params = params.set('id_doctor',''+id_doctor);

		if( id_especialidad !== null )
		{
			params = params.set('id_especialidad',''+id_doctor);
		}

		return this.http.get<Respuesta<RespuestaPreguntaHistoriaClinica>>(`${this.urlBase}/respuestaHistoriaClinica.php`,{params,headers:this.getSessionHeaders()});
	}

	guardarRespuestasHistoriaClinica(respuestas:Respuesta_Historia_Clinica[]):Observable<RespuestaPreguntaHistoriaClinica[]>
	{
		return this.http.post<RespuestaPreguntaHistoriaClinica[]>(`${this.urlBase}/respuestaHistoriaClinica.php`,respuestas,{headers:this.getSessionHeaders()});
	}

	registrarUsuarioPaciente(usuario,paciente):Observable<any>
	{
		if(paciente.fecha_naciemiento){
			paciente.fecha_nacimiento = paciente.fecha_nacimiento.substring(0,10);
		}
		return this.http.post<any>(`${this.urlBase}/usuario.php`,{usuario,paciente},{ headers: this.getSessionHeaders(),withCredentials:true});
	}

	guardarHorarioDoctor(idDoctor:number, idCentroMedico:number, horarios:Horario_Doctor[]):Observable<any>
	{
		return this.http.post(`${this.urlBase}/horario_doctor.php`, { id_doctor: idDoctor, id_centro_medico: idCentroMedico, horarios },{ headers: this.getSessionHeaders()});
	}

	isMobile()
	{
		window.navigator.userAgent
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
	}

	showError(error:ErrorMensaje)
	{
		this.errorBehaviorSubject.next( error);
	}
}
