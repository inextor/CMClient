import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor, Paciente } from '../../models/Modelos';
import { SearchCitaResponse, SearchCitaRequest } from '../../models/Respuestas';
import { Router, ActivatedRoute } from "@angular/router"
import { Cita, Centro_Medico } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { SearchObject } from '../../models/Respuestas';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-citas-paciente',
  templateUrl: './citas-paciente.component.html',
  styleUrls: ['./citas-paciente.component.css']
})
export class CitasPacienteComponent extends BaseComponent implements OnInit {
  cita: Cita = {};
  info_citas: SearchCitaResponse[] = [];
  citas_paciente: SearchCitaResponse[]=[];
  orderBy = 'Fecha';
  orderDirection = 'ASC';
  tipo_busqueda = 'nombre';
  paciente: Paciente = {};
  doctor: Doctor = {};
  citas: Cita[] = [];
  centros_medicos: Centro_Medico[] = [];


  currentInfoCita: SearchCitaResponse = null;

  showConfirmDoctor: boolean = false;
  showConfirmPaciente: boolean = false;
  showConfirmCancelar: boolean = false;
  showConfirmActivar: boolean = false;

  show: boolean=false;
  id_paciente: number = null;
  nombre: string;

  cita_search: SearchObject<Cita> = {

  };
  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }
  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
    let d = new Date();
    d.setHours(d.getHours() - 3);
    let z = (i) => i < 10 ? '0' + i : i;

    // this.route.paramMap.subscribe( params =>{
    //   let id = params.get('id') ==null ? null : parseInt(params.get('id') );
    //   if(id==null){
    //     let currentUser = this.rest.getUsuarioSesion();
    //     this.rest.paciente.getAll({id_usuario: currentUser.id}).subscribe(params=>{
    //       this.familiares = params.datos
    //     })
    //   }else{
    //     this.is_loading = true;
      
    //     this.rest.paciente.getAll({ id_usuario: id}).subscribe(params => {
    //       this.familiares = params.datos
    //     }
    //   );
    //   }
     
    // });
    
    this.route.queryParams.subscribe(params => {

      //this.route.paramMap.subscribe( params =>
      //{
      this.cita_search = {
        eq: {},
        ge: {},
        le: {}
      };

      console.log("Nueva pagina");

      console.log("Parametros", params);

      this.titleService.setTitle('Citas');

      let currentDate = new Date();

      let fecha_inicio = '' + currentDate.getFullYear() + '-' + z(currentDate.getMonth() + 1) + '-' + z(currentDate.getDate()) + ' ' + z(currentDate.getHours()) + ':' + z(currentDate.getMinutes()) + ':00';

      this.cita_search.ge.inicio = 'inicio' in params ? params.inicio : fecha_inicio;
      this.cita_search.le.inicio = 'fin' in params ? params.fin : null;
      this.cita_search.eq.id_paciente = 'id_paciente' in params ? params.id_paciente : null;
      this.cita_search.eq.id_doctor = 'id_doctor' in params ? params.id_doctor : null;
      this.cita_search.eq.id_centro_medico = 'id_centro_medico' in params ? params.id_centro_medico : null;
      this.cita_search.eq.estatus = 'estatus' in params ? params.estatus : null;

      this.cita_search.eq.confirmado_por_doctor = 'confirmado_por_doctor' in params ? params.confirmado_por_doctor : null;
      this.cita_search.eq.confirmado_por_paciente = 'confirmado_por_paciente' in params ? params.confirmado_por_paciente : null;

      this.cita_search.pagina = 'pagina' in params ? parseInt(params.pagina) : 0;
      this.nombre = 'nombre' in params ? params.nombre : '';
      console.log('Search', this.cita_search);

      let rjoinObj: any = {};
      let fjarray = [];
  

      this.is_loading = true;
      console.log(this.nombre)
      let usuario= this.rest.getUsuarioSesion();
         let index = 0;
        forkJoin([
          this.cita_search.eq.id_paciente ? this.rest.paciente.get(this.cita_search.eq.id_paciente) : of(null)
          , this.cita_search.eq.id_doctor ? this.rest.doctor.get(this.cita_search.eq.id_doctor) : of(null)
          , this.rest.centro_medico.getAll({ id_organizacion: usuario.id_organizacion })
          , this.rest.searchCita.search(this.cita_search, { nombre: this.nombre })
        ]).subscribe((result) => {
          this.paciente = result[0];
          this.doctor = result[1];
          this.centros_medicos = result[2].datos;
          this.info_citas = result[3].datos;
          console.log('infositas',this.info_citas);
          //Ḧacer la busqueda de las citas del paciente de una mejor manera <--------
          this.info_citas.forEach(i=>{
   
           if(this.info_citas[index].paciente.id_usuario == usuario.id && this.info_citas[index].cita.estatus !== "CANCELADA" ){
            this.citas_paciente.push(this.info_citas[index]);
            console.log('citaspaciente', this.citas_paciente);
            // console.log('id_usuario',usuario.id);
            // console.log('index',index);
            // console.log('citas_paciente',this.citas_paciente);
           }
           index+=1;
          })
          this.setPages(this.cita_search.pagina,this.citas_paciente.length);
        }, error => {
          console.log(error);
          this.showError(error);
        });
    });
    this.rest.paciente.getAll({id_usuario : usuario.id},{familiar:0 }).subscribe((response)=>{
      let paciente = response.datos;
      console.log('id_pacienteasdasdagggggg', paciente);
      this.id_paciente = paciente[0].id;
    })
  }

  dateInicioChange(value: string) {
    this.cita_search.ge.inicio = value;
  }

  dateFinChange(value: string) {
    this.cita_search.le.inicio = value;
  }

  getPathFromSearchObj() {
  }

  onSeleccionarDoctor(doctor: Doctor) {
    console.log('guardar el id de doctor y mandarlo a agendar cita')
		// localStorage.setItem("centro_medico", JSON.stringify(centro_medico));
		// this.show_seleccionar_centro_medico = false;
  }
  showSeleccionarDoctorCita() {
    let usuario = this.rest.getUsuarioSesion();
    this.show = true;
    console.log('id_paciente',this.id_paciente);
  }
  

  buscar() {
    this.is_loading = true;
    this.cita_search.pagina = 0;
    console.log('Buscando', this.getParams());
    this.router.navigate(['/citas'], { queryParams: this.getParams() });


    //this.rest.searchCita.search(this.cita_search,{nombre:this.nombre}).subscribe((citaResponse)=>
    //{
    //	this.setPages( this.cita_search.pagina, citaResponse.total );
    //	this.setPages( this.cita_search.pagina, citaResponse.total );
    //	this.info_citas = citaResponse.datos;
    //},error=>this.showError( error ));
  }

  changeSearch(evt) {
    console.log("FOOOOO make a search", evt);
    this.search(evt.target.value);
  }

  ordenar(item) {
    if (this.orderBy === item) {
      this.orderDirection == 'ASC' ? 'DESC' : 'ASC';
    }
    else {
      this.orderBy = item;
      this.orderDirection = 'ASC';
    }
  }


  search(nombre) {

    this.router.navigate(['/citas/', this.getParams()]);
    //if( nombre.trim() )
    //	this.crequest.nombre = nombre.trim();
    //else
    //	this.crequest.nombre = '';

    //this.rest.searchCitas( this.crequest ).subscribe((respuesta)=>
    //Esperando que funcione la siguiente linea
    //this.rest.searchCita.getAll( this.crequest ).subscribe((respuesta)=>
    //{
    //	this.is_loading = false;
    //	this.info_citas = respuesta.datos;
    //}, this.showError );
  }

  confirmarDoctor(infoCita: SearchCitaResponse) {
    this.rest.cita.update({
      id: infoCita.cita.id
      , confirmado_por_doctor: 'SI'
    }).subscribe((cita) => {
      this.is_loading = false;
      this.showConfirmDoctor = false;
      let index = this.citas_paciente.findIndex(i => i.cita.id == infoCita.cita.id);
      if (index >= 0)
        this.citas_paciente[index].cita = cita;
    },
      (error) => {
        this.showConfirmDoctor = false;
        this.is_loading = false;
        this.showError(error);
      });
  }

  confirmarPaciente(infoCita: SearchCitaResponse) {
    this.is_loading = true;
    this.rest.cita.update({
      id: infoCita.cita.id
      , confirmado_por_paciente: 'SI'
    }).subscribe((cita) => {
      this.is_loading = false;
      this.showConfirmPaciente = false;
      let index = this.citas_paciente.findIndex(i => i.cita.id == infoCita.cita.id);
      if (index >= 0)
        this.citas_paciente[index].cita = cita;
    }, (error) => {
      this.is_loading = false;
      this.showConfirmPaciente = false;
      this.showError(error);
    });
  }

  cancelar(infoCita: SearchCitaResponse) {
    this.rest.cita.update({
      id: infoCita.cita.id
      , estatus: 'CANCELADA'
    }).subscribe((cita) => {
      console.log(infoCita);
      this.showConfirmCancelar = false;
      this.is_loading = false;
      let index = this.citas_paciente.findIndex(i => i.cita.id == infoCita.cita.id);
      if (index >= 0)
        this.citas_paciente[index].cita = cita;
        console.log("citaspasiente",this.citas_paciente[index].cita = cita);
    },
      (error) => {
        this.is_loading = false;
        this.showConfirmCancelar = false;
        this.showError(error)
      });
  }

  getParams() {
    return {
      'inicio': this.cita_search.ge.inicio,
      'fin': this.cita_search.le.inicio,
      'id_paciente': this.cita_search.eq.id_paciente,
      'id_doctor': this.cita_search.eq.id_doctor,
      'pagina': this.cita_search.pagina,
      'id_centro_medico': this.cita_search.eq.id_centro_medico,
      'confirmado_por_doctor': this.cita_search.eq.confirmado_por_doctor,
      'confirmado_por_paciente': this.cita_search.eq.confirmado_por_paciente,
      'nombre': this.nombre,
      'estatus': this.cita_search.eq.estatus
    };
  }

  activar(infoCita: SearchCitaResponse) {
    this.rest.cita.update({
      id: infoCita.cita.id
      , estatus: 'ACTIVA'
    }).subscribe((cita) => {
      this.showConfirmActivar = false;
      let index = this.citas_paciente.findIndex(i => i.cita.id == infoCita.cita.id);
      this.is_loading = false;
      if (index >= 0)
        this.citas_paciente[index].cita = cita;
    }
      , (error) => {
        this.is_loading = false;
        this.showConfirmActivar = false;
        this.showError(error);
      });
  }
}
