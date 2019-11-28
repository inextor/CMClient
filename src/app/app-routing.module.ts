import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ConfigurarHorarioComponent } from './pages/configurar-horario/configurar-horario.component';
import { VerDoctorComponent } from './pages/ver-doctor/ver-doctor.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
//import { PacienteComponent} from './pages/paciente/paciente.component';
//import { AgregarCitaComponent} from './pages/agregar-cita/agregar-cita.component';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AgregarServicioComponent } from './pages/agregar-servicio/agregar-servicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AgregarDoctorComponent } from './pages/agregar-doctor/agregar-doctor.component';
import { AgregarOrganizacionComponent } from './pages/agregar-organizacion/agregar-organizacion.component';
//import { AgregarPacienteComponent	  } from './pages/agregar-paciente/agregar-paciente.component';
import { AgregarCentroMedicoComponent } from './pages/agregar-centro-medico/agregar-centro-medico.component';
import { DoctoresComponent } from './pages/doctores/doctores.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { CentrosMedicosComponent } from './pages/centros-medicos/centros-medicos.component';
import { EditarPreciosComponent } from './pages/editar-precios/editar-precios.component';
// import { ModalPageComponent			} from './pages/ver-doctor/modal-page/modal-page.component';
import { ConfigurarPreguntasComponent } from './pages/configurar-preguntas/configurar-preguntas.component';
import { LlenarHistoriaClinicaComponent } from './pages/llenar-historia-clinica/llenar-historia-clinica.component';
import { MisCitasComponent } from './pages/mis-citas/mis-citas.component';
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
//import { AgregarPrecioComponent		} from './pages/agregar-precio/agregar-precio.component';
import { TipoPreciosComponent } from './pages/tipo-precios/tipo-precios.component';
import { CitasComponent } from './pages/citas/citas.component';
import { CitaComponent } from "./pages/cita/cita.component";
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from "./../app/classes/";
import { RoleGuard } from "./../app/classes/";

import { HorarioDoctorComponent } from './pages/horario-doctor/horario-doctor.component';
import { AgregarPacienteComponent } from './pages/agregar-paciente/agregar-paciente.component';
import { AgregarRecepcionistaComponent } from './pages/agregar-recepcionista/agregar-recepcionista.component';
import { VerConsultasComponent } from './pages/ver-consultas/ver-consultas.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { IngresosComponent} from './pages/ingresos/ingresos.component';
import {HomePacientesComponent} from './pages/home-pacientes/home-pacientes.component'
// import { access } from 'fs';
const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard] },

  { path: "horario-doctor/centro-medico/:id_centro_medico/Doctor/:id_doctor/Paciente/:id_paciente", component: HorarioDoctorComponent, pathMatch: "full" },
  { path: 'configurar-horario/doctor/:id_doctor/centro-medico/:id_centro_medico', component: ConfigurarHorarioComponent, pathMatch: 'full' },
  { path: "doctores/:id_doctor/centro-medico/:id_centro_medico/agendar-cita/:id_paciente", component: HorarioDoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "agendar-cita", component: AgendarCitaComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "ventas", component: VentasComponent, pathMatch: "full", canActivate: [AuthGuard] },

  { path: 'citas', component: CitasComponent, pathMatch: 'full' },
  /*
  { path: 'citas/doctor/:id_doctor', component: CitasComponent, pathMatch: 'full' },
  { path: 'citas/paciente/:id_paciente', component: CitasComponent, pathMatch: 'full' },
  */
  //{ path: 'citas/:id_doctor/:id_paciente/:fecha_inicio/:fecha_final

  //{ path: 'citas/paciente/:id_paciente', component: CitasComponent, pathMatch: 'full'},
  { path: "pacientes", component: PacientesComponent, pathMatch: "full" },
  //{ path: "paciente", component: PacienteComponent, pathMatch: "full" },
  //{ path: 'cita', component: CitaComponent, pathMatch: 'full'},
  { path: "agregar-usuario", component: AgregarUsuarioComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "editar-usuario/:id", component: AgregarUsuarioComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "servicios", component: ServiciosComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "agregar-producto", component: AgregarServicioComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "editar-producto/:id", component: AgregarServicioComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "usuarios", component: UsuariosComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, pathMatch: "full"},
  { path: "agregar-doctor", component: AgregarDoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "agregar-organizacion", component: AgregarOrganizacionComponent, pathMatch: "full", canActivate: [AuthGuard] },
  //{ path: 'editar-paciente/:id_paciente', component: AgregarPacienteComponent, pathMatch: 'full'},
  { path: "editar-centro-medico/:id", component: AgregarCentroMedicoComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "agregar-centro-medico", component: AgregarCentroMedicoComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "doctores/:pagina", component: DoctoresComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "doctores", component: DoctoresComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "doctor/:id_usuario", component: DoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "centros-medicos", component: CentrosMedicosComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "editar-precios/:id", component: EditarPreciosComponent, pathMatch: "full", canActivate: [AuthGuard] },
  //{ path: 'modal-page', component: ModalPageComponent, pathMatch: 'full'},
  { path: "configurar-preguntas", component: ConfigurarPreguntasComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "configurar-especialidad/:idEspecialidad", component: ConfigurarPreguntasComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "historia-clinica/doctor/:idDoctor/paciente/:idPaciente", component: LlenarHistoriaClinicaComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "ver-consultas/doctor/:id_doctor/paciente/:id_paciente", component: VerConsultasComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "mis-citas", component: MisCitasComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "editar-doctor/:id", component: AgregarDoctorComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "gastos", component: GastosComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "agregar-tipo-gasto", component: AgregarTipoGastoComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "editar-tipo-gasto/:id", component: AgregarTipoGastoComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "base", component: BaseComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "editar-paciente/:id_paciente", component: AgregarFamiliarComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "agregar-familiar/:id_usuario", component: AgregarFamiliarComponent, pathMatch: "full", canActivate: [AuthGuard] },
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
  { path: "home", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard]/*canActivate:[AuthGuard]*/ },
  { path: "ingresos", component: IngresosComponent, pathMatch: "full", canActivate: [AuthGuard]/*canActivate:[AuthGuard]*/ },
  
  { path: "home-pacientes", component: HomePacientesComponent, pathMatch: "full", canActivate: [AuthGuard]/*canActivate:[AuthGuard]*/ },

  /*
	{path: 'doctores/:idDoctor/ver-doctor',loadChildren:'./pages/ver-doctor/ver-doctor.module#VerDoctorPageModule'},
	{ path: 'invitado', redirectTo: '/doctores', pathMatch: 'full',canActivate:[AuthGuard] },
	{ path: '', redirectTo: '/home', pathMatch: 'full',canActivate:[AuthGuard] },
	{ path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListPageModule), canActivate:[AuthGuard] },
	/* { path: 'agregar-usuario', component: AgregarUsuarioPage, pathMatch: 'full' },
	 *
	{ path: 'doctores/:idDoctor/centro-medico/:idCentroMedico/agendar-cita/:idPaciente', loadChildren: './pages/agendar-cita/agendar-cita.module#AgendarCitaPageModule', canActivate:[AuthGuard] },
	{ path: 'agendar-cita', loadChildren: './pages/agendar-cita/agendar-cita.module#AgendarCitaPageModule', canActivate:[AuthGuard] },
	{ path: 'ventas', loadChildren: './pages/ventas/ventas.module#VentasPageModule',canActivate:[AuthGuard],data:{roles:[Roles.Admin]} },
	{ path: 'citas', loadChildren: './pages/citas/citas.module#CitasPageModule',canActivate:[AuthGuard] },
	{ path: 'citas/doctor/:id_doctor', loadChildren: './pages/citas/citas.module#CitasPageModule',canActivate:[AuthGuard]	,pathMatch:'full'},
	{ path: 'citas/paciente/:id_paciente', loadChildren: './pages/citas/citas.module#CitasPageModule',canActivate:[AuthGuard], pathMatch:'full' },
	{ path: 'pacientes', loadChildren: './pages/pacientes/pacientes.module#PacientesPageModule',canActivate:[AuthGuard] },
	{ path: 'paciente', loadChildren: './pages/paciente/paciente.module#PacientePageModule',canActivate:[AuthGuard] },
	{ path: 'cita', loadChildren: './pages/cita/cita.module#CitaPageModule' }, { path: 'agregar-cita', loadChildren: './pages/agregar-cita/agregar-cita.module#AgregarCitaPageModule',canActivate:[AuthGuard] },
	{ path: 'agregar-usuario', loadChildren: './pages/agregar-usuario/agregar-usuario.module#AgregarUsuarioPageModule',canActivate:[AuthGuard] },
	{ path: 'servicios', loadChildren: './pages/servicios/servicios.module#ServiciosPageModule',canActivate:[AuthGuard] },
	{ path: 'agregar-producto', loadChildren: './pages/agregar-servicio/agregar-servicio.module#AgregarServicioPageModule',canActivate:[AuthGuard] },
	{ path: 'editar-producto/:id', loadChildren: './pages/agregar-servicio/agregar-servicio.module#AgregarServicioPageModule',canActivate:[AuthGuard] },
	{ path: 'usuarios', loadChildren: './pages/usuarios/usuarios.module#UsuariosPageModule',canActivate:[AuthGuard] },
	{ path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
	{ path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
	{ path: 'agregar-doctor', loadChildren: './pages/agregar-doctor/agregar-doctor.module#AgregarDoctorPageModule',canActivate:[AuthGuard] },
	{ path: 'agregar-organizacion', loadChildren: './pages/agregar-organizacion/agregar-organizacion.module#AgregarOrganizacionPageModule',canActivate:[AuthGuard] },
	//{ path: 'editar-paciente/:id_paciente', loadChildren: './pages/agregar-paciente/agregar-paciente.module#AgregarPacientePageModule' },
	//{ path: 'agregar-paciente', loadChildren: './pages/agregar-paciente/agregar-paciente.module#AgregarPacientePageModule',canActivate:[AuthGuard] },
	{ path: 'editar-centro-medico/:id', loadChildren: './pages/agregar-centro-medico/agregar-centro-medico.module#AgregarCentroMedicoPageModule' },
	{ path: 'agregar-centro-medico', loadChildren: './pages/agregar-centro-medico/agregar-centro-medico.module#AgregarCentroMedicoPageModule',canActivate:[AuthGuard] },
	{ path: 'doctores', loadChildren: './pages/doctores/doctores.module#DoctoresPageModule' },
	{ path: 'doctor/:id_usuario', loadChildren: './pages/doctor/doctor.module#DoctorPageModule',canActivate:[AuthGuard] },
	{ path: 'centros-medicos', loadChildren: './pages/centros-medicos/centros-medicos.module#CentrosMedicosPageModule',canActivate:[AuthGuard] },
	{ path: 'editar-precios/:id', loadChildren: './pages/editar-precios/editar-precios.module#EditarPreciosPageModule',canActivate:[AuthGuard] },
	{ path: 'modal-page', loadChildren: './pages/ver-doctor/modal-page/modal-page.module#ModalPagePageModule' },
	{ path: 'configurar-preguntas', loadChildren: './pages/configurar-preguntas/configurar-preguntas.module#ConfigurarPreguntasPageModule' },
	{ path: 'configurar-especialidad/:idEspecialidad', loadChildren: './pages/configurar-preguntas/configurar-preguntas.module#ConfigurarPreguntasPageModule' },
	{ path: 'llenar-historia-clinica/doctor/:idDoctor/paciente/:idPaciente', loadChildren: './pages/llenar-historia-clinica/llenar-historia-clinica.module#LlenarHistoriaClinicaPageModule' },
	{ path: 'mis-citas', loadChildren: './pages/mis-citas/mis-citas.module#MisCitasPageModule' },
	{ path: 'editar-doctor/:id', loadChildren: './pages/editar-doctor/editar-doctor.module#EditarDoctorPageModule' },
	{ path: 'pagos', loadChildren: './pages/pagos/pagos.module#PagosPageModule' },
	{ path: 'gastos', loadChildren: './pages/gastos/gastos.module#GastosPageModule' },
	{ path: 'agregar-tipo-gasto', loadChildren: './pages/agregar-tipo-gasto/agregar-tipo-gasto.module#AgregarTipoGastoPageModule' },
	{ path: 'editar-tipo-gasto/:id', loadChildren: './pages/agregar-tipo-gasto/agregar-tipo-gasto.module#AgregarTipoGastoPageModule' },
	{ path: 'base', loadChildren: './pages/base/base.module#BasePageModule' },
	{ path: 'editar-paciente/:id_paciente', loadChildren: './pages/agregar-familiar/agregar-familiar.module#AgregarFamiliarPageModule' },
	{ path: 'agregar-familiar/:id_usuario', loadChildren: './pages/agregar-familiar/agregar-familiar.module#AgregarFamiliarPageModule' },
	{ path: 'agregar-gasto', loadChildren: './pages/agregar-gasto/agregar-gasto.module#AgregarGastoPageModule' },
	{ path: 'consultas', loadChildren: './pages/consultas/consultas.module#ConsultasPageModule' },
	{ path: 'consulta/:id_paciente/:id_doctor', loadChildren: './pages/consulta/consulta.module#ConsultaPageModule' },
	{ path: 'agregar-pregunta', loadChildren: './pages/agregar-pregunta/agregar-pregunta.module#AgregarPreguntaPageModule' },
	{ path: 'editar-pregunta/:id', loadChildren: './pages/agregar-pregunta/agregar-pregunta.module#AgregarPreguntaPageModule' },
	{ path: 'inventario', loadChildren: './pages/inventario/inventario.module#InventarioPageModule' },
	{ path: 'requisiciones', loadChildren: './pages/requisiciones/requisiciones.module#RequisicionesPageModule' },
	{ path: 'agregar-proveedor', loadChildren: './pages/agregar-proveedor/agregar-proveedor.module#AgregarProveedorPageModule' },
	{ path: 'proveedores', loadChildren: './pages/proveedores/proveedores.module#ProveedoresPageModule' },
	{ path: 'editar-proveedor/:id',	loadChildren:	'./pages/agregar-proveedor/agregar-proveedor.module#AgregarProveedorPageModule'},
	{ path: 'especialidades/:page', loadChildren: './pages/especialidades/especialidades.module#EspecialidadesPageModule' },
	{ path: 'agregar-especialidad', loadChildren: './pages/agregar-especialidad/agregar-especialidad.module#AgregarEspecialidadPageModule' },
	{ path: 'editar-especialidad/:id',  loadChildren:  './pages/agregar-especialidad/agregar-especialidad.module#AgregarEspecialidadPageModule'},
	{ path: 'agregar-tipo-precio', loadChildren: './pages/agregar-tipo-precio/agregar-tipo-precio.module#AgregarTipoPrecioPageModule' },
	{ path: 'agregar-precio', loadChildren: './pages/agregar-precio/agregar-precio.module#AgregarPrecioPageModule' },
	{ path: 'editar-tipo-precio/:id', loadChildren: './pages/agregar-tipo-precio/agregar-tipo-precio.module#AgregarTipoPrecioPageModule' },
	{ path: 'tipo-precios/:page', loadChildren: './pages/tipo-precios/tipo-precios.module#TipoPreciosPageModule' },
*/
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)], //Change from original
	imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
