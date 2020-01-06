import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ConfigurarHorarioComponent } from './pages/configurar-horario/configurar-horario.component';
import { VerDoctorComponent } from './pages/ver-doctor/ver-doctor.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AgregarServicioComponent } from './pages/agregar-servicio/agregar-servicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AgregarDoctorComponent } from './pages/agregar-doctor/agregar-doctor.component';
import { AgregarOrganizacionComponent } from './pages/agregar-organizacion/agregar-organizacion.component';
import { AgregarCentroMedicoComponent } from './pages/agregar-centro-medico/agregar-centro-medico.component';
import { DoctoresComponent } from './pages/doctores/doctores.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { CentrosMedicosComponent } from './pages/centros-medicos/centros-medicos.component';
import { EditarPreciosComponent } from './pages/editar-precios/editar-precios.component';
import { ConfigurarPreguntasComponent } from './pages/configurar-preguntas/configurar-preguntas.component';
import { LlenarHistoriaClinicaComponent } from './pages/llenar-historia-clinica/llenar-historia-clinica.component';
import { EditarDoctorComponent } from './pages/editar-doctor/editar-doctor.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { AgregarTipoGastoComponent } from './pages/agregar-tipo-gasto/agregar-tipo-gasto.component';
import { BaseComponent } from './pages/base/base.component';
import { AgregarFamiliarComponent } from './pages/agregar-familiar/agregar-familiar.component';
import { AgregarGastoComponent } from './pages/agregar-gasto/agregar-gasto.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { AgregarConsultaComponent } from './pages/agregar-consulta/agregar-consulta.component';
import { AgregarPreguntaComponent } from './pages/agregar-pregunta/agregar-pregunta.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { RequisicionesComponent } from './pages/requisiciones/requisiciones.component';
import { AgregarProveedorComponent } from './pages/agregar-proveedor/agregar-proveedor.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';
import { AgregarEspecialidadComponent } from './pages/agregar-especialidad/agregar-especialidad.component';
import { AgregarTipoPrecioComponent } from './pages/agregar-tipo-precio/agregar-tipo-precio.component';
import { TipoPreciosComponent } from './pages/tipo-precios/tipo-precios.component';
import { CitasComponent } from './pages/citas/citas.component';
import { CitaComponent } from "./pages/cita/cita.component";
import { AuthGuard } from "./../app/classes/";
import { HorarioDoctorComponent } from './pages/horario-doctor/horario-doctor.component';
import { AgregarPacienteComponent } from './pages/agregar-paciente/agregar-paciente.component';
import { AgregarRecepcionistaComponent } from './pages/agregar-recepcionista/agregar-recepcionista.component';
import { VerConsultasComponent } from './pages/ver-consultas/ver-consultas.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { FamiliaresComponent } from './pages/familiares/familiares.component';
import { CitasPacienteComponent } from './pages/citas-paciente/citas-paciente.component';
import { AgregarRequisicionComponent } from './pages/agregar-requisicion/agregar-requisicion.component';
import { PuntoVentaComponent } from './pages/punto-venta/punto-venta.component';
import { TicketAbonoComponent } from './components/ticket-abono/ticket-abono.component';
import { TicketVentaComponent } from './components/ticket-venta/ticket-venta.component';
import { ShellComponent } from './components/shell/shell.component';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ImprimirTicketComponent} from './pages/imprimir-ticket/imprimir-ticket.component';
import {ClientesComponent} from './pages/clientes/clientes.component';

const routes: Routes = [
	{ path: "", component: LoginComponent, pathMatch: "full" },
	{ path: "login", component: LoginComponent, pathMatch: "full" },
	{
		path: '', component: HomeComponent,
		children:
		[
			{ path: '', redirectTo: 'dashboard', pathMatch: "full"},
			{ path: 'dashboard', component:DashboardComponent },
			{ path: 'clientes', component:ClientesComponent},
			{ path: "horario-doctor/centro-medico/:id_centro_medico/Doctor/:id_doctor/Paciente/:id_paciente", component: HorarioDoctorComponent, pathMatch: "full" },
			{ path: 'configurar-horario/doctor/:id_doctor/centro-medico/:id_centro_medico', component: ConfigurarHorarioComponent, pathMatch: 'full' },
			{ path: "doctores/:id_doctor/centro-medico/:id_centro_medico/agendar-cita/:id_paciente", component: HorarioDoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agendar-cita", component: AgendarCitaComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "pacientes", component: PacientesComponent, pathMatch: "full" },
			{ path: "agregar-usuario", component: AgregarUsuarioComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-usuario/:id", component: AgregarUsuarioComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "servicios", component: ServiciosComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-producto", component: AgregarServicioComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-producto/:id", component: AgregarServicioComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "usuarios", component: UsuariosComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-doctor", component: AgregarDoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-organizacion", component: AgregarOrganizacionComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-centro-medico/:id", component: AgregarCentroMedicoComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-centro-medico", component: AgregarCentroMedicoComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "doctores/:pagina", component: DoctoresComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "doctores", component: DoctoresComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "doctor/:id_usuario", component: DoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "ver-doctor/:idDoctor", component:VerDoctorComponent, pathMatch:"full", canActivate:[AuthGuard] },
			{ path: "centros-medicos", component: CentrosMedicosComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-precios/:id", component: EditarPreciosComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "configurar-preguntas", component: ConfigurarPreguntasComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "configurar-especialidad/:idEspecialidad", component: ConfigurarPreguntasComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "historia-clinica/doctor/:idDoctor/paciente/:idPaciente", component: LlenarHistoriaClinicaComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "ver-consultas/doctor/:id_doctor/paciente/:id_paciente", component: VerConsultasComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-doctor/:id", component: AgregarDoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "gastos", component: GastosComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-tipo-gasto", component: AgregarPacienteComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-tipo-gasto/:id", component: AgregarTipoGastoComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "base", component: BaseComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-paciente/:id_paciente", component: AgregarPacienteComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-familiar/:id_usuario", component: AgregarFamiliarComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-familiar/:id", component: AgregarFamiliarComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-gasto", component: AgregarGastoComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "consultas", component: ConsultasComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-consulta/:id_paciente/:id_doctor", component: AgregarConsultaComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-pregunta", component: AgregarPreguntaComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-pregunta/:id", component: AgregarPreguntaComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "inventario", component: InventarioComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "requisiciones", component: RequisicionesComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-proveedor", component: AgregarProveedorComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "proveedores", component: ProveedoresComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-proveedor/:id", component: AgregarProveedorComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "especialidades", component: EspecialidadesComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-especialidad", component: AgregarEspecialidadComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-especialidad/:id", component: AgregarEspecialidadComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-tipo-precio", component: AgregarTipoPrecioComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-tipo-precio/:id", component: AgregarTipoPrecioComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "tipo-precios/:pagina", component: TipoPreciosComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-recepcionista", component: AgregarRecepcionistaComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-paciente", component: AgregarPacienteComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "editar-cliente/:id", component: AgregarPacienteComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "ingresos", component: IngresosComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "familiares/:id", component: FamiliaresComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "familiares", component: FamiliaresComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "citas-paciente", component: CitasPacienteComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "agregar-requisicion", component: AgregarRequisicionComponent, pathMatch: "full", canActivate: [AuthGuard] },
			{ path: "punto-venta", component: PuntoVentaComponent, pathMatch: "full", canActivate: [AuthGuard]},
			{ path: "punto-venta/:id", component: PuntoVentaComponent, pathMatch: "full", canActivate: [AuthGuard]},
			/*{ path: "ticket-abono", component: TicketAbonoComponent, pathMatch: "full", canActivate: [AuthGuard] },*/
			/*{ path: "ticket-venta", component: TicketVentaComponent, pathMatch: "full", canActivate: [AuthGuard]},*/
			{ path: "ticket-venta/:id", component: ImprimirTicketComponent, pathMatch: "full", canActivate: [AuthGuard]},
			{ path: "ticket-venta/:id/:imprimir", component: ImprimirTicketComponent, pathMatch: "full", canActivate: [AuthGuard]},
			{ path: "citas", component: CitasComponent, pathMatch: "full", canActivate: [AuthGuard]},
			{ path: "ventas", component: VentasComponent, pathMatch: "full", canActivate: [AuthGuard]},
		]
	},
];
// const routes: Routes = [


// ];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash:true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
