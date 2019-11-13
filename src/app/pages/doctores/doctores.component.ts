import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor,Paciente,Centro_Medico } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { SeleccionarCentroMedicoComponent } from '../../components/seleccionar-centro-medico/seleccionar-centro-medico.component';
import { SeleccionarPacienteComponent } from '../../components/seleccionar-paciente/seleccionar-paciente.component';
import { BaseComponent } from '../base/base.component';




@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent extends BaseComponent implements OnInit {
	currentUser: Usuario;
	show_seleccionar_paciente

	doctores:Doctor[] = [];
	is_loading:boolean = false;
	centro_medico = { id: 1 }; ///XXX sacarlo de la sesion del recepcionista
	selectedDoctor:Doctor = null;

	ngOnInit() {
		this.currentUser = this.rest.getUsuarioSesion();
		if(this.currentUser==null){
			this.rest.currentUser.subscribe( usuario => {
				this.currentUser = usuario;
			})
		}
		console.log(this.currentUser);
		/*this.route.paramMap.subscribe
		(
			params =>
			{
				let search = {
					nombre : params.get('nombre')!=null ? parseInt(params.get('user_id') ):null,
					: params.get('nombre'),
				}
			}
		); */


		this.is_loading = true;
		this.rest.doctor.getAll({})
		//this.rest.getDoctores()
		.subscribe( respuesta =>
		{
			this.is_loading = false;
			this.doctores = respuesta.datos;
		},
		(error)=>
		{
			this.showError( this.rest.getErrorMessage( error ) );
			this.is_loading = false;
		});
	}

	editarHorario(doctor:Doctor)
	{
		/*
		//XXX Centro Medico A MANO cambiar PLEASE

		this.rest.centro_medico.getAll({ id_organizacion: 1}).subscribe((response)=>
		//this.rest.getCentrosMedicosPorOrganizacion( 1 ).subscribe((response)=>
		{
			let centros = response.datos;

			if( centros.length == 0 )
			{
				console.log("ESTO NUNCA DEBIO SUCEDER: por favor reportarlo, no existen centros medicos");
			}
			else if( centros.length == 1 )
			{
				this.router.navigate(['doctores',doctor.id, 'configurar-horario',centros[0].id]);
			}
			else
			{
				this.modalController.create({
					component: SeleccionarCentroMedicoComponent,
					componentProps: {
						'centros' : centros
					},
				}).then((modal)=>
				{
					console.log("A modal?",modal);
					modal.onDidDismiss().then((d) => {
						//navigate
						let centro_medico = d.data;
						console.log("Centro Medico",centro_medico);
						this.router.navigate(['/doctores',doctor.id,'configurar-horario',centro_medico.id]);
					})

					modal.present().then((result)=>{
						console.log('Todo bien',result);
					},(error)=>
					{
						console.error( 'error',error );
					});
				});
			}
		});
		*/
	}

	seleccionarPacienteNuevaCitaCon(doctor)
	{
		this.selectedDoctor = doctor;
		this.show_seleccionar_paciente = true;
	}

	onSeleccionarPacienteNuevaCita(paciente:Paciente)
	{
		let cm_id = this.rest.getCurrentCentroMedico();
		if( cm_id )
			this.router.navigate(['/doctores',this.selectedDoctor.id,'centro-medico',cm_id,'agendar-cita',paciente.id]);
	}
}
