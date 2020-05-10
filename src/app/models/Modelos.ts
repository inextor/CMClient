
export interface Bitacora{
	id?:number;
	titulo?:string;
	descripcion?:string;
	fecha?:Date;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Centro_Medico{
	id?:number;
	id_organizacion?:number;
	nombre?:string;
	telefono?:string;
	rfc?:string;
	ciudad?:string;
	estado?:string;
	codigo_postal?:number;
	direccion?:string;
	id_imagen?:number;
	id_imagen_ticket?:number;
	saludo_ticket?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
	iva?:number;
	tipo_cambio_dolares?:number;

}

export interface Cita{
	id?:number;
	id_paciente?:number;
	id_servicio?:number;
	id_doctor?:number;
	id_centro_medico?:number;
	estatus?:string;
	inicio?:string;
	fin?:string;
	fecha_inicio_utc?:Date;
	nota?:string;
	confirmado_por_doctor?:string;
	confirmado_por_paciente?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Comision_Por_Servios{
	id?:number;
	id_servicio?:number;
	id_doctor?:number;
	comision_doctor?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Comisiones_Doctor{
	id?:number;
	id_doctor?:number;
	id_venta?:number;
	id_comision_por_servicios?:number;
	cantidad?:number;
	status?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Configuracion{
	id_centro_medico?:number;
	confirmar_dia_anterior?:number;
	dias_por_confirmar_antes_de_cita?:number;
	es_necesaria_confirmacion_dias_antes?:string;
	es_necesaria_confirmacion_dia_antes?:number;
	dias_para_confirmar_doctor?:number;
	tipo_cobro_poliza?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}

export interface Consulta{
	id?:number;
	id_paciente?:number;
	id_doctor?:number;
	id_cita?:number;
	id_venta?:number;
	id_centro_medico?:number;
	motivo_consulta?:string;
	diagnostico?:string;
	tratamiento?:string;
	medicamento?:string;
	analisis?:string;
	subjetivo?:string;
	inicio_consulta?:string;
	fin_consulta?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Consultorio{
	id?:number;
	id_centro_medico?:number;
	nombre?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Consultorio_Doctor{
	id?:number;
	id_consultorio?:number;
	id_medico?:number;
	start?:number;
	end?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Detalle_Distribucion{
	id?:number;
	id_distribucion?:number;
	id_servicio?:number;
	cantidad?:number;
	id_requisicion?:number;
	recibido?:number;
	merma?:number;
	extraviado?:number;
	nota?:string;
	cantidad_enviada?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Detalle_Requisicion{
	id?:number;
	id_requisicion?:number;
	id_servicio?:number;
	id_categoria_merma?:number;
	estatus?:string;
	cantidad?:number;
	precio?:number;
	subtotal?:number;
	iva?:number;
	total?:number;
	costo?:number;
	nota?:string;
	recibido?:number;
	merma?:number;
	existente_inventario?:number;
	tiempo_caducidad?:Date;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Detalle_Venta{
	id?:number;
	id_venta?:number;
	id_servicio?:number;
	cantidad?:number;
	precio?:number;
	valor_unitario?:number;
	subtotal?:number;
	iva?:number;
	total?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Distribucion{
	id?:number;
	id_centro_medico_solicitante?:number;
	id_usuario_recibio?:number;
	id_usuario_envio?:number;
	id_centro_medico_distribuidor?:number;
	id_requisicion?:number;
	estatus?:string;
	guia?:string;
	paqueteria?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Doctor{
	id?:number;
	id_especialidad?:number;
	id_centro_medico?:number;
	id_imagen?:number;
	color_calendario?:string;
	duracion_consulta?:number;
	telefono?:string;
	nombre?:string;
	especialidad?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Doctor_Servicio{
	id?:number;
	id_doctor?:number;
	id_servicio?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Documento_Histora_Clinica{
	id?:number;
	id_historia_clinica?:number;
	type?:number;
	notes?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Especialidad{
	id?:number;
	nombre?:string;
	abreviacion?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Especialidad_Pregunta{
	id?:number;
	id_pregunta_historia_clinica?:number;
	id_especialidad?:number;
	grupo?:string;
	orden?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;


}

export interface Expediente{
	id?:number;
	name?:string;
	type?:string;
	size?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Factura{
	id?:number;
	noFactura?:string;
	serie?:string;
	folio?:number;
	monto?:number;
	id_cliente?:number;
	fecha?:string;
	status?:number;
	cancelar?:number;
	fechaFac?:string;
	formaPago?:string;
	moneda?:number;
	tipoCambio?:number;
	id_centro_medico?:number;
	id_usuario_doctor?:number;
	folioFiscal?:string;
	usoCFDI?:string;
	metodoPago?:string;
	condicionPago?:string;
	generacionFactura?:number;
	recuperarPDF?:number;
	pdf_path?:string;
	xml_path?:string;
	notaFactura?:string;
	mensajeError?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Fondo_Caja{
	id?:number;
	id_usuario?:number;
	pesos?:number;
	dolares?:number;
	estatus?:number;
	fecha?:string;
	hora?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Gasto_Centro_Medico{
	id?:number;
	id_tipo_gasto?:number;
	id_usuario?:number;
	id_centro_medico?:number;
	descripcion?:string;
	id_proveedor?:number;
	monto?:number;
	referencia?:string;
	fecha?:string;
	metodo_pago?:string;
	pdf?:string;
	xml?:string;
	tipo?:number;
	colaborador?:number;
	foto?:string;
	desde?:string;
	estatus?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Gasto_Doctor{
	id?:number;
	id_usuario_doctor?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Historia_Clinica{
	id?:number;
	id_paciente?:number;
	id_organizacion?:number;
	motivo_consulta?:string;
	nota?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Historia_Horario{
	id?:number;
	id_doctor?:number;
	id_centro_medico?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Historial_Inventario{
	id?:number;
	id_servicio?:number;
	id_centro_medico?:number;
	id_usuario?:number;
	tipo_movimiento?:string;
	cantidad_anterior?:number;
	cantidad_movimiento?:number;
	cantidad_actual?:number;
	id_contenido?:number;
	tiempo_creacion?:string;

}

export interface Horario_Doctor{
	id?:number;
	id_historia_horario?:number;
	id_centro_medico?:number;
	hora_inicio?:string;
	hora_final?:string;
	dia_semana?:number;
	fecha_inicio?:Date;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Imagen{
	id?:number;
	uploader_user_id?:number;
	es_privada?:number;
	filename?:string;
	original_filename?:string;
	content_type?:string;
	size?:number;
	width?:number;
	height?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Imagen_Usuario{
	id?:number;
	id_imagen?:number;
	id_usaurio?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Ingreso{
	id?:number;
	id_usuario?:number;
	id_centro_medico?:number;
	nota?:string;
	monto?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Inventario{
	id?:number;
	id_centro_medico?:number;
	id_servicio?:number;
	nombre?:string;
	cantidad?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Lote_Inventario{
	id?:number;
	id_inventario?:number;
	id_centro_medico?:number;
	id_servicio?:number;
	recibido?:number;
	existente?:number;
	fecha_caducidad?:Date;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Notificacion{
	id?:number;
	id_usuario?:number;
	mensaje?:number;
	id_cita?:number;
	tiempo_creacion?:Date;
}

export interface Notificaciones{
	id?:number;
	id_usuario?:number;
	id_imagen?:number;
	path_data?:string;
	mensaje?:string;
	path?:string;
	status?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Organizacion{
	id?:number;
	id_imagen_default_ticket?:number;
	id_imagen_default_login?:number;
	id_imagen_default_logo?:number;
	id_imagen_default_proveedor?:number;
	id_imagen_default_servicio?:number;
	id_imagen_default_usuario?:number;
	id_imagen_default_sucursal?:number;
	nombre?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Paciente{
	id?:number;
	id_usuario?:number;
	id_organizacion?:number;
	id_imagen?:number;
	familiar?:number;
	nombre?:string;
	apellidos?:string;
	fecha_nacimiento?:string;
	sexo?:string;
	telefono?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
	nombre_tutor?:string;
	telefono_tutor?:string;
	correo_electronico_tutor?:string;
	domicilio?:string;
}

export interface Pago{
	id?:number;
	id_venta?:number;
	efectivo?:number;
	dolares?:number;
	tarjeta?:number;
	cheque?:number;
	deposito?:number;
	tipo_cambio_dolares?:number;
	iva?:number;
	subtotal?:number;
	total?:number;
	total_a_pagar?:number;
	cambio?:number;
	cambio_en_dolares?:number;
	tipo_tarjeta?:string;
	terminacion_tarjeta?:string;
	tipo_pago?:string;
	referencia_deposito?:string;
	referencia_cheque?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Poliza{
	id?:number;
	id_paciente?:number;
	id_organizacion?:number;
	id_tipo_poliza?:number;
	id_servicio?:number;
	descricion?:string;
	estado?:string;
	nombre_mes_pago?:string;
	fecha_inicio?:Date;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Precio_Servicio{
	id?:number;
	id_tipo_precio?:number;
	id_servicio?:number;
	id_centro_medico?:number;
	precio?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Pregunta_Historia_Clinica{
	id?:number;
	pregunta?:string;
	tipo_pregunta?:string;
	id_pregunta_historia_medica_depende_de?:number;
	es_pregunta_binaria?:string;
	posibles_valores?:string;
	depende_del_genero?:string;
	tiempo_creacion?:Date;

}

export interface Proveedor{
	id?:number;
	id_organizacion?:number;
	id_imagen?:number;
	nombre?:string;
	direccion?:string;
	telefono?:string;
	contacto?:string;
	rfc?:string;
	cuenta_bancaria?:string;
	dias_credito?:number;
	nota?:string;
	usuario_creo?:string;
	estatus?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Recepcionista_Doctor{
	id?:number;
	id_usuario_recepcion?:number;
	id_doctor?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Recurso{
	id?:number;
	id_servicio_primario?:number;
	id_servicio_secundario?:number;
	cantidad?:number;
	estatus?:string;
	fecha_creacion?:Date;


}

export interface Requisicion{
	id?:number;
	id_centro_medico?:number;
	id_usuario_solicito?:number;
	id_usuario_recibio?:number;
	id_proveedor?:number;
	id_centro_medico_distribuidor?:number;
	nota?:string;
	flete?:number;
	importacion?:number;
	total_articulos?:number;
	pedimento?:string;
	rastreo?:string;
	estatus?:string;
	subtotal?:number;
	total?:number;
	tiempo_creacion?:Date;
	tiempo_entrega?:Date;
	tiempo_actualizacion?:Date;

}

export interface Respuesta_Historia_Clinica{
	id?:number;
	id_pregunta_historia_clinica?:number;
	id_paciente?:number;
	id_doctor?:number;
	respuesta_binaria?:string;
	respuesta?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Servicio{
	id?:number;
	id_organizacion?:number;
	id_centro_medico?:number;
	id_unidad_medida?:number;
	id_imagen?:number;
	codigo?:string;
	precio_referencia?:number;
	cantidad_minima?:number;
	tipo?:string;
	nombre?:string;
	prestado_por?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;


}

export interface Sesion{
	id?:string;
	id_usuario?:number;
	estatus?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Sucursal_Doctor{
	id?:number;
	nombre?:string;
	id_doctor?:number;
	id_centro_medico?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Tipo_Gasto{
	id?:number;
	id_organizacion?:number;
	id_centro_medico?:number;
	nombre?:string;
	tiempo_creacion?:Date;


}

export interface Tipo_Precio{
	id?:number;
	nombre?:string;
	id_organizacion?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;

}

export interface Unidad_Medida{
	id?:number;
	codigo?:string;
	nombre?:string;
	tipo?:string;
}

export interface Usuario{
	id?:number;
	usuario?:string;
	nombre?:string;
	id_centro_medico?:number;
	id_organizacion?:number;
	id_imagen?:number;
	tipo?:string;
	id_tipo_precio?:number;
	id_device_notification?:string;
	contrasena?:string;
	telefono?:string;
	correo_electronico?:string;
	factura_rfc?:string;
	factura_razon_social?:string;
	factura_codigo_postal?:string;
	factura_correo_electronico?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;


}

export interface Usuario_Centro_Medico{
	id?:number;
	id_usuario?:number;
	id_centro_medico?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;


}

export interface Venta{
	id?:number;
	id_usuario_cliente?:number;
	facturado?:string;
	cliente?:string;
	subtotal?:number;
	iva?:number;
	porcentaje_iva?:number;
	total?:number;
	cambio?:number;
	efectivo_desc?:number;
	dolares_desc?:number;
	tipo_cambio?:number;
	id_usuario_atendio?:number;
	cupon_desc?:number;
	id_centro_medico?:number;
	fecha?:string;
	redondeo?:number;
	nombre?:string;
	estatus?:string;
	activa?:string;
	pendiente?:number;
	comprobante?:string;
	promocion_desc?:number;
	id_tipo_precio?:number;
	folio?:number;
	UUID?:string;
	porcentaje_desc?:number;
	fecha_facturacion?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
	factura_rfc?:string;
	factura_razon_social?:string;
	factura_codigo_postal?:string;
	factura_correo_electronico?:string;
	factura_uso_cfdi?:string;
	factura_forma_pago?:string;
	facturada?:string;
}

export interface Categoria_Merma{
	id?:number;
	nombre?:string;
	descripcion?:string;
}

export interface Tipo_Poliza{
	id?:number;
	id_centro_medico?:number;
	id_tipo_precio?:number;
	nombre?:string;
	precio?:number;
	meses?:number;
	cantidad_personas?:number;
}

export interface Servicio_Poliza{
	id?:number;
	id_tipo_poliza?:number;
	id_servicio?:number;
	limite_uso_servicio?:number;
}

export interface Pago_Poliza{
	id?:number;
	id_poliza?:number;
	id_organizacion?:number;
	id_usuario?:number;
	id_venta?:number;
	cantidad?:number;
	fecha_cobro?:Date;
	estado?:string;
}

export interface Facturar{
	id?:number;
}