import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject,forkJoin, fromEvent,of} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError,flatMap } from 'rxjs/operators';
import { LoginResponse,AgregarUsuarioResponse,SearchCitaRequest,SearchCitaResponse,Respuesta,ServicioResponseItem,Servicio_Recurso, ErrorMensaje} from '../models/Respuestas';
import { Pregunta_Historia_Clinica,Especialidad_Pregunta, Bitacora, Consulta, Especialidad, Historia_Horario, Respuesta_Historia_Clinica, Sesion, Ingreso, Sucursal_Doctor } from '../models/Modelos';
import { PreguntasHistoriaClinicaResponse } from '../models/Respuestas';
import { SesionInfo,Especialidad_Pregunta_Accion } from '../models/Respuestas';
import { Tipo_Gasto } from '../models/Modelos';
import {ObjRest} from './ObjRest';
import {SearchRest} from './SearchRest';
import {SearchGastoCentroMedico,SearchGastoCentroMedicoResponse} from '../models/Respuestas';
import {RespuestaPreguntaHistoriaClinica } from '../models/Respuestas';
import {DistribucionInfo} from '../models/Respuestas';
import { CitaInfo,HorariosCentroMedico } from '../models/Respuestas';

import {	Centro_Medico, Cita,
	Comision_Por_Servios, Comisiones_Doctor, Configuracion, Consultorio, Consultorio_Doctor,
	Detalle_Venta, Distribucion, Detalle_Distribucion, Detalle_Requisicion, Doctor, Expediente,
	Factura, Fondo_Caja, Gasto_Centro_Medico, Gasto_Doctor, Horario_Doctor, Imagen, Inventario,
	Notificacion, Organizacion, Paciente, Pago, Poliza, Precio_Servicio, Recepcionista_Doctor,
	Servicio, Tipo_Precio, Usuario,Unidad_Medida, Venta, Proveedor, Requisicion, Doctor_Servicio,Categoria_Merma
	} from	'../models/Modelos';


export interface DetalleServicio {
	detalle_venta:Detalle_Venta;
	servicio:Servicio;
	precio_servicio?:Precio_Servicio;
}

export interface DatosVenta
{
	venta			: Venta;
	centro_medico	: Centro_Medico;
	detalles		: DetalleServicio[];
	cliente			?: Usuario;
	atendio			: Usuario;
	pagos			: Pago[];
	tipo_precio		: Tipo_Precio;
};

export interface Detalle_Requisicion_Info
{
	detalle_requisicion: Detalle_Requisicion;
	servicio?:Servicio;
}

export interface RequisicionInfo
{
	requisicion	: Requisicion;
	detalles: Detalle_Requisicion_Info[];
}

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
	public unidad_medida:ObjRest<Unidad_Medida>;
	public searchCita:SearchRest<SearchCitaRequest,SearchCitaResponse>;
	public especialidad_pregunta:ObjRest<Especialidad_Pregunta>;
	public searchGastoCentroMedico:SearchRest<Gasto_Centro_Medico,SearchGastoCentroMedicoResponse>;
	public searchServicio:SearchRest<Servicio,ServicioResponseItem>;
	public servicio_recurso:ObjRest<Servicio_Recurso>;
	public consulta:ObjRest<Consulta>;
	public ingreso:ObjRest<Ingreso>;
	public detalle_requisicion:ObjRest<Detalle_Requisicion>;
	public requisicionInfo:ObjRest<RequisicionInfo>;
	public doctor_servicio:ObjRest<Doctor_Servicio>;
	public distribucionInfo:SearchRest<Distribucion,DistribucionInfo>;

	public citaInfo:SearchRest<Cita,CitaInfo>;
	public horarios_centro_medico:SearchRest<Centro_Medico,HorariosCentroMedico>;
	public sucursal_doctor:ObjRest<Sucursal_Doctor>;
	public categoria_merma:ObjRest<Categoria_Merma>;
	


	//End vars


	// usuario_centro_medico:ObjRest<Usuario_Centro_Medico>;
	venta:ObjRest<Venta>;
	public requisicion:ObjRest<Requisicion>;


	constructor(private http: HttpClient)
	{
		//Produccion por cambiarx`x
		this.urlBase = 'https://expediente.centromedico.life/Mehr/api';

		if( window.location.hostname.indexOf('127.0.0.1' ) == 0 )
			this.urlBase = 'https://expediente.centromedico.life/Mehr/';

		if( window.location.hostname.indexOf('localhost') == 0 )
			this.urlBase = 'http://127.0.0.1/CentroMedico/';

		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('usuario')));
		this.currentUser = this.currentUserSubject.asObservable();


		this.keyUpObserver = fromEvent<KeyboardEvent>( window.document.body, 'keyup' );

		this.errorBehaviorSubject = new BehaviorSubject<ErrorMensaje>(null);
		this.errorObservable = this.errorBehaviorSubject.asObservable();

		//this.doctor = new DoctorRest(http,this.urlBase);
		this.bitacora						= new ObjRest<Bitacora>						(`${this.urlBase}/bitacora.php`,http);
		this.centro_medico					= new ObjRest<Centro_Medico>				(`${this.urlBase}/centro_medico.php`,http);
		this.proveedor						= new ObjRest<Proveedor>					(`${this.urlBase}/proveedor.php`,http);
		this.cita							= new ObjRest<Cita>							(`${this.urlBase}/cita.php`,http);
		this.comision_por_servios			= new ObjRest<Comision_Por_Servios>			(`${this.urlBase}/comision_por_servios.php`,http);
		this.comisiones_doctor				= new ObjRest<Comisiones_Doctor>			(`${this.urlBase}/comisiones_doctor.php`,http);
		this.configuracion					= new ObjRest<Configuracion>				(`${this.urlBase}/configuracion.php`,http);
		this.consulta						= new ObjRest<Consulta>						(`${this.urlBase}/consulta.php`,http);
		this.consultorio					= new ObjRest<Consultorio>					(`${this.urlBase}/consultorio.php`,http);
		this.consultorio_doctor				= new ObjRest<Consultorio_Doctor>			(`${this.urlBase}/consultorio_doctor.php`,http);
		this.detalle_venta					= new ObjRest<Detalle_Venta>				(`${this.urlBase}/detalle_venta.php`,http);
		this.doctor							= new ObjRest<Doctor>						(`${this.urlBase}/doctor.php`,http);
		this.especialidad_pregunta			= new ObjRest<Especialidad_Pregunta>		(`${this.urlBase}/especialidad_pregunta.php`,http);
		this.expediente						= new ObjRest<Expediente>					(`${this.urlBase}/expediente.php`,http);
		this.factura						= new ObjRest<Factura>						(`${this.urlBase}/factura.php`,http);
		this.fondo_caja						= new ObjRest<Fondo_Caja>					(`${this.urlBase}/fondo_caja.php`,http);
		this.gasto_centro_medico			= new ObjRest<Gasto_Centro_Medico>			(`${this.urlBase}/gasto_centro_medico.php`,http);
		this.gasto_doctor					= new ObjRest<Gasto_Doctor>					(`${this.urlBase}/gasto_doctor.php`,http);
		this.historia_horario				= new ObjRest<Historia_Horario>				(`${this.urlBase}/historia_horario.php`,http);
		this.horario_doctor					= new ObjRest<Horario_Doctor>				(`${this.urlBase}/horario_doctor.php`,http);
		this.imagen							= new ObjRest<Imagen>						(`${this.urlBase}/imagen.php`,http);
		this.inventario						= new ObjRest<Inventario>					(`${this.urlBase}/inventario.php`,http);
		this.notificacion					= new ObjRest<Notificacion>					(`${this.urlBase}/notificacion.php`,http);
		this.organizacion					= new ObjRest<Organizacion>					(`${this.urlBase}/organizacion.php`,http);
		this.paciente						= new ObjRest<Paciente>						(`${this.urlBase}/paciente.php`,http);
		this.pago							= new ObjRest<Pago>							(`${this.urlBase}/pago.php`,http);
		this.poliza							= new ObjRest<Poliza>						(`${this.urlBase}/poliza.php`,http);
		this.precio_servicio				= new ObjRest<Precio_Servicio>				(`${this.urlBase}/precio_servicio.php`,http);
		this.pregunta_historia_clinica		= new ObjRest<Pregunta_Historia_Clinica>	(`${this.urlBase}/pregunta_historia_clinica.php`,http);
		this.recepcionista_doctor			= new ObjRest<Recepcionista_Doctor>			(`${this.urlBase}/recepcionista_doctor.php`,http);
		this.respuesta_historia_clinica		= new ObjRest<Respuesta_Historia_Clinica>	(`${this.urlBase}/respuesta_historia_clinica.php`,http);
		this.servicio						= new ObjRest<Servicio>						(`${this.urlBase}/servicio.php`,http); //NO SOPORTA POST
		this.servicio_recurso				= new ObjRest<Servicio_Recurso>				(`${this.urlBase}/servicio_recurso.php`,http); //PARA dar de alta el servicio

		//this.sesion						= new ObjRest<Sesion>							(`${this.urlBase}/sesion.php`,http);
		this.tipo_gasto						= new ObjRest<Tipo_Gasto>					(`${this.urlBase}/tipo_gasto.php`,http);
		this.tipo_precio					= new ObjRest<Tipo_Precio>					(`${this.urlBase}/tipo_precio.php`,http);
		this.usuario						= new ObjRest<Usuario>						(`${this.urlBase}/usuario.php`,http);
		// this.usuario_centro_medico		= new ObjRest<Usuario_Centro_Medico>		(`${this.urlBase}/usuario_centro_medico.php`,http);

		this.unidad_medida					= new ObjRest<Unidad_Medida>				(`${this.urlBase}/unidad_medida.php`,http);
		this.venta							= new ObjRest<Venta>						(`${this.urlBase}/venta.php`,http);
		this.searchCita						= new SearchRest<SearchCitaRequest,SearchCitaResponse>(`${this.urlBase}/searchCita.php`,http);
		this.especialidad_pregunta			= new ObjRest<Especialidad_Pregunta_Accion>	(`${this.urlBase}/especialidad_pregunta.php`,http);
		this.searchGastoCentroMedico		= new SearchRest<Gasto_Centro_Medico,SearchGastoCentroMedicoResponse>(`${this.urlBase}/searchGastosCentroMedico.php`,http);
		this.searchServicio					= new SearchRest<Servicio,ServicioResponseItem>(`${this.urlBase}/searchServicio.php`,http);
		this.especialidad					= new ObjRest<Especialidad>						(`${this.urlBase}/especialidad.php`,http);
		this.consulta						= new ObjRest<Consulta>							(`${this.urlBase}/consulta.php`,http);
		this.ingreso						= new ObjRest<Ingreso>							(`${this.urlBase}/ingreso.php`,http);
		this.requisicion					= new ObjRest<Requisicion>						(`${this.urlBase}/requisicion.php`,http);
		this.requisicionInfo				= new ObjRest<RequisicionInfo>					(`${this.urlBase}/requisicionInfo.php`,http);
		this.doctor_servicio				= new ObjRest<Doctor_Servicio>					(`${this.urlBase}/servicio_doctor.php`,http);
		this.distribucionInfo				= new SearchRest<Distribucion,DistribucionInfo>	(`${this.urlBase}/distribucionInfo.php`,http);
		this.citaInfo						= new SearchRest<Cita,CitaInfo>(`${this.urlBase}/citaInfo.php`,http);
		this.horarios_centro_medico			= new SearchRest<Centro_Medico,HorariosCentroMedico>(`${this.urlBase}/horarios_centro_medico.php`,http);
		this.sucursal_doctor				= new ObjRest<Sucursal_Doctor>(`${this.urlBase}/sucursal_doctor.php`,http);
		this.detalle_requisicion			= new ObjRest<Detalle_Requisicion>(`${this.urlBase}/detalle_requisicion.php`,http);
		this.categoria_merma			= new ObjRest<Categoria_Merma>(`${this.urlBase}/categoria_merma.php`,http);
	
	}

	getCurrentCentroMedico():Centro_Medico
	{
		let c_id = localStorage.getItem('centro_medico');
		if( c_id !== null && c_id !== undefined )
			return JSON.parse( c_id );

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
					this.currentUserSubject.next(response);	
				}
				return response;
			}));
		return result;
	}
	 
	statusMenu():boolean{
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
	getSessionHeaders():HttpHeaders
	{
		if( localStorage.getItem('session_token') == null )
		{
			console.log("THer is no session token");
			return new HttpHeaders();
		}

		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('session_token'));
		return headers;
	}

	isLoggedIn():boolean
	{
		let token = localStorage.getItem('session_token');
		if( token )
			return true;

		return false;
	}

	getUsuarioOrganizacion():Organizacion{
		let user_org = localStorage.getItem('id_organizacion')
		if( user_org == null)
			return null

		let user_data = this.transformJson(user_org);
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

	getLocalDateFromMysqlString(str:string):Date
	{
		let components = str.split(/-|:|\s/g);
		let d = new Date(parseInt( components[0] ), //Year
				parseInt(components[1])-1, //Month
				parseInt(components[2]), //Day
				parseInt(components[3]), //Hour
				parseInt(components[4])) //Minutes
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
						parseInt(components[4])
				);

		let d = new Date();
		d.setTime( utcTime );

		return d;
	}

	getMysqlStringFromLocaDate(d:Date):string
	{
		let zero = (a)=>
		{
			if( a<10 )
				return '0'+a;
			return a;
		};
		 let event_string = d.getFullYear()
								+'-'+zero(d.getMonth()+1)
								+'-'+zero(d.getDate())
								+' '+zero(d.getHours())
								+':'+zero(d.getMinutes())
								+':'+zero(d.getSeconds());

		return event_string;

	}

	getMysqlStringFromDate(d:Date):string
	{
		let zero = (a)=>
		{
			if( a<10 )
				return '0'+a;
			return a;
		};

		let event_string = d.getUTCFullYear()
								+'-'+zero(d.getUTCMonth()+1)
								+'-'+zero(d.getUTCDate())
								+' '+zero( d.getUTCHours() )
								+':'+zero( d.getUTCMinutes() )
								+':'+zero( d.getUTCSeconds() );

		return event_string;
	}

	getErrorMessage( error ):string
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
		return this.http.post<any>(`${this.urlBase}/usuario_paciente.php`,{usuario,doctor},{ headers: this.getSessionHeaders(),withCredentials:true});
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
		if(paciente.fecha_nacimiento){
			paciente.fecha_nacimiento = paciente.fecha_nacimiento.substring(0,10);
		}
		return this.http.post<any>(`${this.urlBase}/usuario_paciente.php`,{usuario,paciente},{ headers: this.getSessionHeaders(),withCredentials:true});
	}

	guardarHorarioDoctor(idDoctor:number, idCentroMedico:number, horarios:Horario_Doctor[]):Observable<any>
	{
		return this.http.post(`${this.urlBase}/horario_doctor.php`, { id_doctor: idDoctor, id_centro_medico: idCentroMedico, horarios },{ headers: this.getSessionHeaders()});
	}

	isMobile():boolean
	{
		window.navigator.userAgent
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
	}

	showError(error:ErrorMensaje)
	{
		this.errorBehaviorSubject.next( error);
	}

	getDetalleServicios(venta:Venta,servicios:Servicio[],detalles_venta:Detalle_Venta[],precios_servicios:Precio_Servicio[]):DetalleServicio[]
	{
		let servicios_by_id						= {};
		let precios_by_id_servicio 				= {};
		let detalleServicios:DetalleServicio[]	= [];

		servicios.forEach((i)=>{ servicios_by_id[ i.id ] = i;});

		precios_servicios.forEach((i)=>{
			if( !(i.id_servicio in precios_by_id_servicio) )
				precios_by_id_servicio[ i.id_servicio ] = [];

			precios_by_id_servicio[ i.id_servicio ].push( i );
		});

		detalles_venta.forEach((detalle_venta)=>
		{
			if( !( detalle_venta.id_servicio in servicios_by_id ) )
				console.error('No se encontro el servicio dentro detalle_venta');

			if( !( detalle_venta.id_servicio in precios_by_id_servicio ) )
				console.error('No se encontro el servicio dentro precio_servicios');

			let servicio		= servicios_by_id[ detalle_venta.id_servicio ];
			let precio_servicio	= precios_by_id_servicio[ detalle_venta.id_servicio ].find(i=>i.id_tipo_precio == venta.id_tipo_precio );
			//let precio_servicio	= precios_by_id_servicio[ detalle_venta.id_servicio ];

			if( !precio_servicio )
				console.error('No se encontro el servicio dentro precio_servicios buscand: id_servicio',servicio.id,precios_by_id_servicio[ servicio.id ]);

			detalleServicios.push
			({
				servicio
				,precio_servicio : precio_servicio //Elvis operator doesnt work  in js,ts ?-(
				,detalle_venta
			});
		});

		return detalleServicios;
	}

	getDatosVenta(id_venta:number):Observable<DatosVenta>
	{
		return forkJoin
		([
			this.venta.get( id_venta )
			,this.detalle_venta.search({ eq:{ id_venta: id_venta}, limite:10000})
			,this.pago.search({ eq:{ id_venta: id_venta}, limite: 10000})
		]).pipe
		(
			flatMap((responses)=>
			{
				let venta:Venta						= responses[0];
				let detalles_venta:Detalle_Venta[]	= responses[1].datos;
				let pagos:Pago[]					= responses[2].datos;
				let ids			= detalles_venta.map( dv=>dv.id_servicio );

				return forkJoin
				([
					of(venta)
					,of(detalles_venta)
					,of(pagos)
					,detalles_venta.length == 0 ? of({total:0, datos:[]}) : this.servicio.search({csv:{ 'id':ids }})
					,detalles_venta.length == 0 ? of({total:0, datos:[]}) : this.precio_servicio.search({csv:{'id_servicio': ids }, eq:{id_centro_medico: venta.id_centro_medico}, limite:10000})
					,this.centro_medico.get( venta.id_centro_medico )
					,this.usuario.get( venta.id_usuario_atendio )
					,venta.id_usuario_cliente ? this.usuario.get( venta.id_usuario_cliente ) : of( null )
					,this.tipo_precio.get( venta.id_tipo_precio )
				])
			})
			,flatMap((responses)=>
			{
				let venta:Venta							= responses[0];
				let detalles_venta:Detalle_Venta[]		= responses[1];
				let pagos:Pago[]						= responses[2];
				let servicios:Servicio[]				= responses[3].datos;
				let precios_servicios:Precio_Servicio[]	= responses[4].datos;
				let centro_medico:Centro_Medico			= responses[5];
				let atendio:Usuario						= responses[6];
				let cliente:Usuario						= responses[7];
				let tipo_precio							= responses[8];

				console.log('precios_servicios', precios_servicios );

				//getDetalleServicios(servicios:Servicio[],detalles_venta:Detalle_Venta[],precios_servicios:Precio_Servicio[]):DetalleServicio[]
				let detalles:DetalleServicio[] = this.getDetalleServicios(venta, servicios, detalles_venta, precios_servicios );

				let dato:DatosVenta = {
					venta
					,centro_medico
					,detalles
					,cliente
					,atendio
					,pagos
					,tipo_precio
				};

				return of( dato );
			})
		);
	}

	guardarDatosVenta(datosVenta:DatosVenta):Observable<DatosVenta>
	{
		let venta_subscription = datosVenta.venta.id ? this.venta.update( datosVenta.venta ) : this.venta.create( datosVenta.venta );
		return venta_subscription.pipe(
			flatMap((venta)=>
			{
				console.log("Result venta",venta);
				datosVenta.venta = venta;
				let detalles_venta = datosVenta.detalles.map(i=>
				{
					let detalle = i.detalle_venta;
					if( !detalle.id_venta )
						detalle.id_venta = venta.id;

					return detalle;
				});
				console.log("Saving detalles venta", detalles_venta );
				if( detalles_venta.length == 0 )
					return forkJoin([of([]),of(venta)]);

				return forkJoin([this.detalle_venta.batchUpdate(detalles_venta),of( venta )]);
			}),flatMap((responses)=>
			{
				console.log("Result of svaing detalles", responses );
				return this.getDatosVenta( responses[ 1 ].id );
			})
		);
	}

	getOrganizacionInfo():Promise<Organizacion>
	{
		return this.http.get<Organizacion>(`${this.urlBase}/Organizacion.php?domain=foo`)
        .pipe
		(
			map(response=>{
                localStorage.setItem("organizacion", JSON.stringify( response ) );
               return response;
			})
		).toPromise();
	}
	getCompanyFromSession():Usuario
	{
		let organizacion = localStorage.getItem('usuario');
		if( organizacion )
			return JSON.parse( organizacion );

		return null;
	}
}
