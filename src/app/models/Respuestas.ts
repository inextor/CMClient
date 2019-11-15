/////
//
import {Usuario,Sesion,Doctor,Paciente,Cita,Centro_Medico,Tipo_Precio,Servicio,Precio_Servicio,Recurso, Recepcionista} from './Modelos';
import {Especialidad_Pregunta,Pregunta_Historia_Clinica,Respuesta_Historia_Clinica} from './Modelos';
import { Gasto_Centro_Medico,Tipo_Gasto } from './Modelos';

export interface Respuesta<T>{
	total:number;
	datos:T[];
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
	recepecionista?:Recepcionista;
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

