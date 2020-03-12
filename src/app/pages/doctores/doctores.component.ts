import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor,Paciente,Centro_Medico } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { SeleccionarCentroMedicoComponent } from '../../components/seleccionar-centro-medico/seleccionar-centro-medico.component';
import { SeleccionarPacienteComponent } from '../../components/seleccionar-paciente/seleccionar-paciente.component';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent extends BaseComponent implements OnInit {

	currentUser: Usuario;
	selected_doctor:Doctor = null;
	show_seleccionar_paciente:boolean = false;
	show_seleccionar_centro_medico:boolean = false;

	doctores:Doctor[] = [];
	is_loading:boolean = false;
	centro_medico = { id: 1 }; ///XXX sacarlo de la sesion del recepcionista
	selectedDoctor:Doctor = null;
	doctor_search:SearchObject<Doctor>;

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
	ngOnInit() {
		this.titleService.setTitle('Doctores');
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
		this.route.queryParams.subscribe( params =>
		{
			this.doctor_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};
			this.is_loading = true;
			this.doctor_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.doctor_search.limite			= this.pageSize;
			this.doctor_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;

			this.rest.doctor.search(this.doctor_search)
			//this.rest.getDoctores()
			.subscribe( respuesta =>
			{
				this.is_loading = false;
				this.doctores = respuesta.datos;
				this.setPages( this.doctor_search.pagina, respuesta.total );
			},error => this.showError );
		});
	}

	editarHorario(doctor:Doctor)
	{
		console.log("FOOO seleccionar horario", doctor );
		this.selected_doctor = doctor;
		this.show_seleccionar_centro_medico = true;
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

	onSeleccionarCentroMedico(centro_medico:Centro_Medico)
	{
		console.log('FOOOO seleccionar centro medico');
		this.router.navigate(['/configurar-horario','doctor',this.selected_doctor.id, 'centro-medico',centro_medico.id]);
	}

	seleccionarPacienteNuevaCitaCon(doctor)
	{
		this.selectedDoctor = doctor;
		this.show_seleccionar_paciente = true;
	}

	onSeleccionarPacienteNuevaCita(paciente:Paciente)
	{
		console.log('FOOOOO aqui llego');
		let centro_medico = this.rest.getCurrentCentroMedico();
		if( centro_medico ){
			this.router.navigate(['/doctores',this.selectedDoctor.id,'centro-medico',centro_medico.id,'agendar-cita',paciente.id]);
		}
	}

	search()
	{
		this.is_loading = true;
		this.doctor_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.doctor_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.doctor_search[i])
                    search[i+'.'+j] = this.doctor_search[i][j];
            }
        }
		console.log('search',this.doctor_search );
		console.log('Busqueda', search );
		this.router.navigate(['doctores'],{queryParams: search});
	}

}
