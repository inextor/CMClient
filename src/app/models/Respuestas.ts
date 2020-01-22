/////
//
import {
	Centro_Medico
	,Cita ,Distribucion,Detalle_Distribucion, Doctor ,Especialidad_Pregunta ,Inventario ,Paciente
	,Precio_Servicio,Pregunta_Historia_Clinica ,Recurso ,Respuesta_Historia_Clinica
	,Servicio ,Sesion ,Tipo_Precio ,Usuario } from './Modelos';

import { Gasto_Centro_Medico,Tipo_Gasto } from './Modelos';


export interface Respuesta<T>{
	total:number;
	datos:T[];
}

export interface CsvArray{
	 [key: string]: any[];
}

/*
 * From perl operators except lk = LIKE
 * Several comparison operators impose string contexts upon their operands.
 * These are string equality (eq),
 * string inequality (ne),
 * greater than (gt),
 * less than (lt),
 * greater than or equal to (ge),
 * less than or equal to (le),
 */

export interface SearchObject<T>
{
	pagina?:number;
	limite?:number;

	eq?:T; //Equals to
	gt?:T; //Great than
	lt?:T; //Less than
	ge?:T; //Great or equal than
	le?:T; //less or equal than
	lk?:T; //like
	start?:T;
	csv?:CsvArray;
}



export interface DistribucionInfo
{
	distribucion:Distribucion;
	detalles:Detalle_Distribucion[];
}

export interface Recurso_Response{
	servicio: Servicio;
	recurso: Recurso;
};

export interface Servicio_Recurso{
	servicio: Servicio;
	recursos: Recurso_Response[];
};

export interface Especialidad_Pregunta_Accion extends Especialidad_Pregunta
{
	accion:string;
}

export interface SearchGastoCentroMedico extends  Gasto_Centro_Medico{
	fecha_inicio:string;
	fecha_fin:string;
}

export interface SearchGastoCentroMedicoResponse{
	centro_medico:Centro_Medico;
	tipo_gasto:Tipo_Gasto;
	usuario:Usuario;
	gasto_centro_medico:Gasto_Centro_Medico;
}

export interface ServicioPrecioCentroMedicoResponse
{
	centro_medico:Centro_Medico;
	usuario:Usuario;
	tipos_gasto:Tipo_Gasto;
	gasto_centro_medico: Gasto_Centro_Medico;
}

export interface PreguntaRespuesta
{
	pregunta: Pregunta_Historia_Clinica;
	respuesta: Respuesta_Historia_Clinica;
}
export interface HistoriaClinicaResponse
{
	doctor:Doctor;
	paciente:Paciente;
	preguntas_respuestas:PreguntaRespuesta[];
}

export interface SearchCitaRequest extends Cita{
	nombre?:string;
	fecha_inicio?:string;
}

export interface SearchPacienteRequest extends Paciente{
	nombre?:string;
	telefono?:string;
}


export interface SesionInfo{
	usuario:Usuario;
	sesion:Sesion;
	doctor?:Doctor;
	pacientes?:Paciente[];
}

export interface LoginResponse{
	usuario:Usuario;
	sesion:Sesion;
	doctor?:Doctor
};

export interface AgregarUsuarioResponse{
	Usuario:Usuario;
	paciente?:Paciente;
	doctor?:Doctor;
}

export interface SearchCitaResponse{
	cita:Cita;
	doctor:Doctor;
	paciente:Paciente;
}

export interface SearchPacienteResponse{
	cita:Cita;
	doctor:Doctor;
	paciente:Paciente;
}
export interface ErrorMensaje{
	mensaje:string;
	tipo:string;
}



export interface ServicioCentroMedicoResponse
{
	centro_medico:Centro_Medico;
	precios:ServicioPrecioCentroMedicoResponse;
}


export interface ServicioPrecioCentroMedicoResponse
{
	tipo_precio : Tipo_Precio;
	precio_servicio: Precio_Servicio;
}

export interface ServicioResponseItem
{
	servicio:Servicio;
	centro_medico:ServicioCentroMedicoResponse[];
}

export interface PreguntasHistoriaClinicaResponse
{
	pregunta_historia_clinica:Pregunta_Historia_Clinica;
	especialidad_pregunta:Especialidad_Pregunta;
}

export interface RespuestaPreguntaHistoriaClinica
{
	pregunta:Pregunta_Historia_Clinica;
	respuesta:Respuesta_Historia_Clinica;

}

export interface CitaInfoRespons
{
	doctor?:Doctor;
	cita:Cita;
	usuario:Usuario;
	centro_medico:Centro_Medico;
}

export enum Roles {
  Admin = 'ADMIN',
  doctor = 'DOCTOR',
  paciente = 'PACIENTE'
}

