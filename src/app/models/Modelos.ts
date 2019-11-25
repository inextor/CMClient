
export interface Articulo{
  id?:number;
  codigo?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Bitacora{
  id?:number;
  titulo?:string;
  descripcion?:string;
  fecha?:Date;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Centro_Medico{
  id?:number;
  id_organizacion?:number;
  nombre?:string;
  id_imagen?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Cita{
  id?:number;
  id_paciente?:number;
  estatus?:string;
  id_doctor?:number;
  id_centro_medico?:number;
  inicio?:string;
  fin?:string;
  fecha_inicio_utc?:Date;
  nota?:string;
  confirmado_por_doctor?:string;
  confirmado_por_paciente?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Comision_Por_Servios{
  id?:number;
  id_servicio?:number;
  id_doctor?:number;
  comision_doctor?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Comisiones_Doctor{
  id?:number;
  id_doctor?:number;
  id_venta?:number;
  id_comision_por_servicios?:number;
  cantidad?:number;
  status?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

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
};

export interface Consulta{
  id?:number;
  id_paciente?:number;
  id_doctor?:number;
  motivo_consulta?:string;
  diagnostico?:string;
  tratamiento?:string;
  medicamento?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Consultorio{
  id?:number;
  id_centro_medico?:number;
  nombre?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Consultorio_Doctor{
  id?:number;
  id_consultorio?:number;
  id_medico?:number;
  start?:number;
  end?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Detalle_Requisicion{
  id?:number;
  id_requisicion?:number;
  id_articulo?:number;
  cantidad?:number;
  costo?:number;
  nota?:string;
  recibido?:number;
  merma?:number;
  extraviados?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Detalle_Venta{
  id?:number;
  id_venta?:number;
  id_servicio?:number;
  precio?:number;
  cantidad?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Doctor{
  id?:number;
  id_especialidad?:number;
  telefono?:string;
  nombre?:string;
  especialidad?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Documento_Histora_Clinica{
  id?:number;
  id_historia_clinica?:number;
  type?:number;
  notes?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Especialidad{
  id?:number;
  nombre?:string;
  abreviacion?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Especialidad_Pregunta{
  id?:number;
  id_pregunta_historia_clinica?:number;
  id_especialidad?:number;
  grupo?:string;
  orden?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Expediente{
  id?:number;
  name?:string;
  type?:string;
  size?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Factura{
  FacturaID?:number;
  NoFactura?:string;
  Serie?:string;
  Folio?:number;
  Monto?:number;
  ClienteID?:number;
  Fecha?:string;
  Status?:number;
  Cancelar?:number;
  FechaFac?:string;
  FormaPago?:string;
  Moneda?:number;
  TipoCambio?:number;
  id_centro_medico?:number;
  id_usuario_doctor?:number;
  FolioFiscal?:string;
  UsoCFDI?:string;
  MetodoPago?:string;
  CondicionPago?:string;
  GeneracionFactura?:number;
  RecuperarPDF?:number;
  NotaFactura?:string;
  MensajeError?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

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

};

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

};

export interface Ingreso{
  id?:number;
  id_doctor?:number;
  id_paciente?:number;
  monto?:number;
}

export interface Gasto_Doctor{
  id?:number;
  id_usuario_doctor?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Historia_Clinica{
  id?:number;
  id_paciente?:number;
  id_organizacion?:number;
  motivo_consulta?:string;
  nota?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Historia_Horario{
  id?:number;
  id_doctor?:number;
  id_centro_medico?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

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

};

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

};

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

};

export interface Imagen_Usuario{
  id?:number;
  id_imagen?:number;
  id_usaurio?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Inventario{
  id?:number;
  id_centro_medico?:number;
  id_servicio?:number;
  cantidad?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Notificacion{
  id?:number;
  id_usuario?:number;
  mensaje?:number;
  id_cita?:number;
  tiempo_creacion?:Date;
};

export interface Organizacion{
  id?:number;
  nombre?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Paciente{
  id?:number;
  id_usuario?:number;
  id_imagen?:number;
  nombre?:string;
  nombre_tutor?:string;
  apellidos?:string;
  fecha_nacimiento?:string;
  sexo?:string;
  telefono_casa?:string;
  telefono_celular?:string;
  telefono_casa_tutor?: string;
  telefono_trabajo_tutor?:string;
  telefono_celular_tutor?: string;
  correo_electronico_tutor?: string;
  domicilio?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Pago{
  id?:number;
  id_venta?:number;
  tipo_pago?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Poliza{
  id?:number;
  id_paciente?:number;
  id_organizacion?:number;
  descricion?:string;
  estado?:string;
  nombre_mes_pago?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Precio_Servicio{
  id?:number;
  id_tipo_precio?:number;
  id_servicio?:number;
  id_centro_medico?:number;
  precio?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Pregunta_Historia_Clinica{
  id?:number;
  pregunta?:string;
  tipo_pregunta?:string;
  id_pregunta_historia_medica_depende_de?:number;
  es_pregunta_binaria?:string;
  posibles_valores?:string;
  depende_del_genero?:string;
  tiempo_creacion?:Date;

};

export interface Proveedor{
  id?:number;
  id_organizacion?:number;
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

};

export interface Recepcionista_Doctor{
  id?:number;
  id_usuario_recepcion?:number;
  id_doctor?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Recurso{
  id?:number;
  id_servicio_primario?:number;
  id_servicio_secundario?:number;
  cantidad?:number;
  estatus?:string;
  fecha_creacion?:Date;


};

export interface Requisicion{
  id?:number;
  id_centro_medico?:number;
  id_usuario_solicito?:number;
  id_usuario_recibio?:number;
  id_proveedor?:number;
  nota?:string;
  flete?:number;
  importacion?:number;
  total_articulos?:number;
  pedimento?:string;
  estatus?:string;
  total?:number;
  tiempo_creacion?:Date;
  tiempo_entrega?:Date;
  tiempo_actualizacion?:Date;
};

export interface Respuesta_Historia_Clinica{
  id?:number;
  id_pregunta_historia_clinica?:number;
  id_paciente?:number;
  id_doctor?:number;
  respuesta_binaria?:string;
  respuesta?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Servicio{
  id?:number;
  id_organizacion?:number;
  id_imagen?:number;
  codigo?:string;
  tipo?:string;
  nombre?:string;
  prestado_por?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;


};

export interface Sesion{
  id?:string;
  id_usuario?:number;
  estatus?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Tipo_Gasto{
  id?:number;
  id_organizacion?:number;
  nombre?:string;
  tiempo_creacion?:Date;


};

export interface Tipo_Precio{
  id?:number;
  nombre?:string;
  id_organizacion?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;

};

export interface Usuario{
  id?:number;
  usuario?:string;
  id_organizacion?:number;
  id_imagen?:number;
  tipo?:string;
  id_device_notification?:string;
  contrasena?:string;
  telefono?:string;
  correo_electronico?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Usuario_Centro_Medico{
  id?:number;
  id_usuario?:number;
  id_centro_medico?:number;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};

export interface Venta{
  id?:number;
  id_usuario_cliente?:number;
  facturado?:string;
  cliente?:string;
  subtotal?:number;
  iva?:number;
  total?:number;
  cambio?:number;
  cupon?:number;
  efectivo_desc?:number;
  dolares_desc?:number;
  tipo_cambio?:number;
  id_usuario_recepcionista?:number;
  cupon_desc?:number;
  sucursal?:number;
  fecha?:string;
  redondeo?:number;
  nombre?:string;
  estatus?:string;
  pendiente?:number;
  comprobante?:string;
  promocion_desc?:number;
  tipo_cliente?:number;
  folio?:number;
  UUID?:string;
  porcentaje_desc?:number;
  fecha_facturacion?:string;
  tiempo_creacion?:Date;
  tiempo_actualizacion?:Date;
};
