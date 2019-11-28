import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularDateHttpInterceptor } from './services/AngularDateHttpInterceptor'
import { FormsModule } from '@angular/forms';
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
import { FamiliaresComponent } from './pages/familiares/familiares.component';
import { CitasPacienteComponent } from './pages/citas-paciente/citas-paciente.component';
import { AgregarRequisicionComponent } from './pages/agregar-requisicion/agregar-requisicion.component';


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
    FamiliaresComponent,
    CitasPacienteComponent,
    AgregarRequisicionComponent,
  ],
  imports: [
    AccessModule,
    BrowserModule,
    AppRoutingModule,
   HttpClientModule,
	  FullCalendarModule,
    FormsModule,
    BrowserAnimationsModule,
	  FormsModule

  ],
  providers: [
	  { provide: HTTP_INTERCEPTORS, useClass: AngularDateHttpInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
