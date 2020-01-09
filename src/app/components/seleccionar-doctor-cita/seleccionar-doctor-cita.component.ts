import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Doctor, Centro_Medico, Especialidad, Paciente } from '../../models/Modelos';
import { RestService } from '../../services/rest.service';
import { forkJoin } from 'rxjs';
import {Router,ActivatedRoute} from "@angular/router"
import { SearchObject } from '../../models/Respuestas';
import { BaseComponent } from '../../pages/base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-seleccionar-doctor-cita',
  templateUrl: './seleccionar-doctor-cita.component.html',
  styleUrls: ['./seleccionar-doctor-cita.component.css']
})
export class SeleccionarDoctorCitaComponent extends BaseComponent implements OnInit{
 
  @Input() show:boolean = false;
  @Input() showCancel:boolean;
  @Input() id_paciente:number;
  @Output() selected = new EventEmitter<Doctor>();

  constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
  doctores:Doctor[]=[];
  centros_medicos:Centro_Medico[]=[];
  especialidades:Especialidad[]=[];
  pacientes: Paciente[]=[];
  paciente;
  doctor_search:SearchObject<Doctor>;
  last:string = '';
  show_especialidad:boolean = false;
  buscado:boolean = false;
  ngOnInit() {
    console.log('asdfasdffamiliaer',this.id_paciente);
    let usuario = this.rest.getUsuarioSesion();
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

    this.doctor_search.eq.id_centro_medico	= "eq.id_centro_medico" in params ?params["eq.id_centro_medico"]:'?';
    this.doctor_search.eq.id_especialidad	= "eq.id_especialidad" in params ?params["eq.id_especialidad"]:'?';
			this.doctor_search.limite			= this.pageSize;
			this.doctor_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			// this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
			this.is_loading = true;
    forkJoin([
      this.rest.centro_medico.getAll({id_organizacion: usuario.id_organizacion}),
      this.rest.especialidad.getAll({}),
    ])
    .subscribe(results=>
    {
      this.centros_medicos = results[0].datos;
      this.especialidades = results[1].datos;
    },error=>this.showError(error));
  });


    // this.rest.doctor.getAll({}).subscribe((respuesta)=>
		// {
		// 	this.doctores = respuesta.datos;
		// });
  }

  showEspecialidad(){
    if(this.doctor_search.eq.id_centro_medico){
      this.show_especialidad = true;
    }else{
      this.show_especialidad = false;
    }
   
  }
 closeModal(){
   console.log(this.show);
  this.show = false;
  this.show= null;

 }
  search()
	{
    console.log('searchsssss',this.id_paciente);
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
    this.buscado = true;
		this.rest.doctor.search(this.doctor_search)
    .subscribe(results=>
    {
      this.doctores = results.datos;
      
      console.log(this.doctores);
    });
	}



	onKeyPressed(evt)
	{
		let input = <HTMLInputElement>document.getElementById('searchCentroMedico');
		console.log( input.value );
		if( this.last === input.value.trim() )
			return;
			// ,{limit:10} dentro de search
		this.last = input.value.trim();
		this.rest.doctor.search({ lk:{nombre:this.last} }).subscribe((respuesta)=>
		{
			this.doctores = respuesta.datos;
		});
	}


	dismissModal()
	{
//		this.modalCtrl.dismiss(null);
	}
  seleccionarDoctorNuevaCita(doctor)
	{
    let usuario = this.rest.getUsuarioSesion();
		if( usuario.tipo == 'PACIENTE' )
		{
			this.router.navigate(['/doctores',doctor.id,'centro-medico',doctor.id_centro_medico,'agendar-cita',this.id_paciente]);
			return;
		}

	}

}
