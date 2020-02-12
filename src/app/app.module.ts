import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularDateHttpInterceptor } from './services/AngularDateHttpInterceptor'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AccessModule } from './modules/access/access.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { AgregarCentroMedicoComponent } from './pages/agregar-centro-medico/agregar-centro-medico.component';
import { AgregarDoctorComponent } from './pages/agregar-doctor/agregar-doctor.component';
import { AgregarEspecialidadComponent } from './pages/agregar-especialidad/agregar-especialidad.component';
import { AgregarFamiliarComponent } from './pages/agregar-familiar/agregar-familiar.component';
import { AgregarGastoComponent } from './pages/agregar-gasto/agregar-gasto.component';
import { AgregarOrganizacionComponent } from './pages/agregar-organizacion/agregar-organizacion.component';
import { AgregarPreguntaComponent } from './pages/agregar-pregunta/agregar-pregunta.component';
import { AgregarProveedorComponent } from './pages/agregar-proveedor/agregar-proveedor.component';
import { AgregarServicioComponent } from './pages/agregar-servicio/agregar-servicio.component';
import { AgregarTipoGastoComponent } from './pages/agregar-tipo-gasto/agregar-tipo-gasto.component';
import { AgregarTipoPrecioComponent } from './pages/agregar-tipo-precio/agregar-tipo-precio.component';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { BaseComponent } from './pages/base/base.component';
import { CentrosMedicosComponent } from './pages/centros-medicos/centros-medicos.component';
import { CitaComponent } from './pages/cita/cita.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ConfigurarHorarioComponent } from './pages/configurar-horario/configurar-horario.component';
import { ConfigurarPreguntasComponent } from './pages/configurar-preguntas/configurar-preguntas.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { DoctoresComponent } from './pages/doctores/doctores.component';
import { EditarDoctorComponent } from './pages/editar-doctor/editar-doctor.component';
import { EditarPreciosComponent } from './pages/editar-precios/editar-precios.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { HelpersComponent } from './pages/helpers/helpers.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LlenarHistoriaClinicaComponent } from './pages/llenar-historia-clinica/llenar-historia-clinica.component';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { RequisicionesComponent } from './pages/requisiciones/requisiciones.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { TipoPreciosComponent } from './pages/tipo-precios/tipo-precios.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { VerDoctorComponent } from './pages/ver-doctor/ver-doctor.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './components/menu/menu.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { SeleccionarCentroMedicoComponent } from './components/seleccionar-centro-medico/seleccionar-centro-medico.component';
import { SeleccionarCentroMedicoHomeComponent } from './components/seleccionar-centro-medico-home/seleccionar-centro-medico-home.component';
import { SeleccionarDoctorComponent } from './components/seleccionar-doctor/seleccionar-doctor.component';
import { SeleccionarPacienteComponent } from './components/seleccionar-paciente/seleccionar-paciente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AgendarCitaInnerComponent } from './pages/agendar-cita-inner/agendar-cita-inner.component';
import { HorarioDoctorComponent } from './pages/horario-doctor/horario-doctor.component';
import { AgregarRecepcionistaComponent } from './pages/agregar-recepcionista/agregar-recepcionista.component';
import { ModalComponent } from './components/modal/modal.component';
import { AgregarPacienteComponent } from './pages/agregar-paciente/agregar-paciente.component';
import { HistoriaMedicaComponent } from './pages/historia-medica/historia-medica.component';
import { ToastErrorComponent } from './components/toast-error/toast-error.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { AgregarConsultaComponent } from './pages/agregar-consulta/agregar-consulta.component';
import { VerConsultasComponent } from './pages/ver-consultas/ver-consultas.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import {IngresoComponent} from './components/ingreso/ingreso.component';
import { PuntoVentaComponent } from './pages/punto-venta/punto-venta.component'
import { FamiliaresComponent } from './pages/familiares/familiares.component';
import { CitasPacienteComponent } from './pages/citas-paciente/citas-paciente.component';
import { AgregarRequisicionComponent } from './pages/agregar-requisicion/agregar-requisicion.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VentasUsuarioComponent } from './pages/ventas-usuario/ventas-usuario.component';
import { TicketAbonoComponent } from './components/ticket-abono/ticket-abono.component';
import { TicketVentaComponent } from './components/ticket-venta/ticket-venta.component';
import { ShellComponent } from './components/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ImprimirTicketComponent } from './pages/imprimir-ticket/imprimir-ticket.component';
import { SeleccionarDoctorCitaComponent } from './components/seleccionar-doctor-cita/seleccionar-doctor-cita.component';
import { ControlCitasComponent } from './pages/control-citas/control-citas.component';
import { CalendarioAgendarCitaComponent } from './components/calendario-agendar-cita/calendario-agendar-cita.component';
import { CalendarioCitasDoctorComponent } from 'src/app/pages/calendario-citas-doctor/calendario-citas-doctor.component';
import { PuntoVentaConsultaComponent } from './components/punto-venta-consulta/punto-venta-consulta.component';
import { AgendarCitaPacienteComponent } from './pages/agendar-cita-paciente/agendar-cita-paciente.component';
import { DistribucionComponent } from './pages/distribucion/distribucion.component';
import { AgregarDistribucionComponent } from './pages/agregar-distribucion/agregar-distribucion.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { RestService } from './services/rest.service';
import { CalendarioDoctoresComponent } from './pages/calendario-doctores/calendario-doctores.component';
import { ViewCitasDoctoresComponent } from './components/view-citas-doctores/view-citas-doctores.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PushNotificationsComponent } from './components/push-notifications/push-notifications.component';

export function init_app(rest: RestService) {
  return () =>
{
  return rest.getOrganizacionInfo().catch((error)=>
  {
    console.log('Load from storage');
    let company = localStorage.getItem('organizacion');
    if( !company )
      throw 'Company not found';
    return Promise.resolve( JSON.parse( company ) );
  });
};
}

@NgModule({
  declarations: [
    AppComponent,
    AgendarCitaComponent,
    AgregarCentroMedicoComponent,
    AgregarDoctorComponent,
    AgregarEspecialidadComponent,
    AgregarFamiliarComponent,
    AgregarGastoComponent,
    AgregarOrganizacionComponent,
    AgregarPreguntaComponent,
    AgregarProveedorComponent,
    AgregarServicioComponent,
    AgregarTipoGastoComponent,
    AgregarTipoPrecioComponent,
    AgregarUsuarioComponent,
    BaseComponent,
	CalendarioCitasDoctorComponent,
    CentrosMedicosComponent,
    CitaComponent,
    CitasComponent,
    ConfigurarHorarioComponent,
    ConfigurarPreguntasComponent,
    ConsultaComponent,
    ConsultasComponent,
    DoctorComponent,
    DoctoresComponent,
    EditarDoctorComponent,
    EditarPreciosComponent,
    EspecialidadesComponent,
    GastosComponent,
    HelpersComponent,
    InventarioComponent,
    LlenarHistoriaClinicaComponent,
    LoginComponent,
    PacientesComponent,
    ProveedoresComponent,
    RequisicionesComponent,
    ServiciosComponent,
    TipoPreciosComponent,
    UsuariosComponent,
    VentasComponent,
    VerDoctorComponent,
    LoadingComponent,
    MenuComponent,
    PaginacionComponent,
    SeleccionarCentroMedicoComponent,
    SeleccionarCentroMedicoHomeComponent,
    SeleccionarDoctorComponent,
    SeleccionarPacienteComponent,
    HeaderComponent,
    HomeComponent,
    AgendarCitaInnerComponent,
    HorarioDoctorComponent,
    AgregarRecepcionistaComponent,
    ModalComponent,
    AgregarPacienteComponent,
    HistoriaMedicaComponent,
    ToastErrorComponent,
    IngresoComponent,
    IngresosComponent,
    AgregarConsultaComponent,
    VerConsultasComponent,
    DateTimeComponent,
    PuntoVentaComponent,
    FamiliaresComponent,
    CitasPacienteComponent,
    AgregarRequisicionComponent,
    ClientesComponent,
    VentasUsuarioComponent,
    TicketAbonoComponent,
    TicketVentaComponent,
    ShellComponent,
    DashboardComponent,
    ImprimirTicketComponent,
    SeleccionarDoctorCitaComponent,
    ControlCitasComponent,
    CalendarioAgendarCitaComponent,
    PuntoVentaConsultaComponent,
    AgendarCitaPacienteComponent,
    DistribucionComponent,
    AgregarDistribucionComponent,
    ImageUploaderComponent,
    CalendarioDoctoresComponent,
    ViewCitasDoctoresComponent,
    ReportesComponent,
    NotificationsComponent,
    PushNotificationsComponent,


  ],
  imports: [
    AccessModule,
    BrowserModule,
    AppRoutingModule,
   HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
	  FullCalendarModule,
    CommonModule,
    BrowserAnimationsModule,
	  FormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AngularDateHttpInterceptor, multi: true }
    // ,{ provide: APP_INITIALIZER, useFactory: init_app, deps: [RestService], multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
