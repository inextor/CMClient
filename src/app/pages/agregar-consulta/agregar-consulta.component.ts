import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service'
import { Doctor, Cita, Usuario, Paciente, Centro_Medico, Consulta, Servicio, Proveedor, Requisicion, Detalle_Requisicion } from '../../models/Modelos';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ServiciosComponent } from '../servicios/servicios.component';
interface ServicioById {
	[key:number]:Servicio;
};
@Component({
  selector: 'app-agregar-consulta',
  templateUrl: './agregar-consulta.component.html',
  styleUrls: ['./agregar-consulta.component.css']
})

export class AgregarConsultaComponent extends BaseComponent implements OnInit {

  servicios: Servicio[]			= [];
	search_servicios: Servicio[]	= [];
	busqueda: string				= '';
	todos_servicios: []				= [];
	proveedores: Proveedor[]		= [];
  servicios_by_id:ServicioById	= {};
  paciente: Paciente = {};
  doctor: Doctor = {};
  consulta: Consulta = {};

  detalles_requisicion:Detalle_Requisicion[] = [];

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id') ? parseInt(params.get('id')) : null;
      let id_cita = params.get('id_cita') ? parseInt(params.get("id_cita")) :null;
      let id_doctor = params.get('id_doctor') ? parseInt(params.get("id_doctor")) :null;
      let id_paciente = params.get('id_paciente') ? parseInt(params.get("id_paciente")) :null;
      let id_servicio = params.get('id_servicio') ? parseInt(params.get("id_servicio")) :null;
      //agregando el servicio seleccionado por el paciente al crear la cita
      if(id_servicio){
        this.rest.servicio.get(id_servicio).subscribe((response)=>{
          console.log(response)
          this.agregarServicio(response);
        })
      }
      
      
      // 
      if (id) {
        this.consulta = {
          motivo_consulta: '',
          diagnostico: '',
          tratamiento: '',
          id_paciente: null,
          id_doctor: null,
        };

        this.is_loading = true;
        this.rest.consulta.get(id).subscribe((consulta) => {
          this.consulta = consulta;
          forkJoin([this.rest.paciente.get(consulta.id_paciente), this.rest.doctor.get(consulta.id_doctor)])
            .subscribe(results => {
              this.paciente = results[0];
              this.doctor = results[1];
            }, error => this.showError(error));
        }, error => this.showError(error));
      }
      else {
        let usuario = this.rest.getUsuarioSesion();
        let id_paciente = parseInt(params.get('id_paciente'));

        forkJoin([this.rest.paciente.get(id_paciente), this.rest.doctor.get(usuario.id)])
          .subscribe(results => {
            this.paciente = results[0];
            this.doctor = results[1];
          }, error => this.showError(error));


        this.consulta = {
          motivo_consulta: '',
          diagnostico: '',
          tratamiento: '',
          id_paciente: id_paciente,
          id_doctor: usuario.id,
        };
      }
    });
    // 
  }

  guardar() {
    this.is_loading = true;
    let observable = this.consulta.id ? this.rest.consulta.update(this.consulta) : this.rest.consulta.create(this.consulta);

    observable.subscribe
      (
        consulta => {
          this.consulta = consulta
          this.is_loading = false;
        }
        , error => this.showError(error)
      );
  }

	buscar(evt: any)
	{
		let x = this.rest.servicio.search({
			lk: { nombre: evt.target.value },
			eq:{tipo:'PRODUCTO_FISICO'}
		}).subscribe((response) => {
			this.search_servicios = response.datos;
			x.unsubscribe();
		});
	}

	agregarServicio(servicio: Servicio)
	{
		if( !( servicio.id in this.servicios_by_id ) )
			this.servicios_by_id[ servicio.id ] = servicio;

		let s = this.detalles_requisicion.find(i => i.id_servicio == servicio.id);
		if (s) {
			this.busqueda = '';
			this.aumentar(s);
			return;
		}

		this.detalles_requisicion.push
		({
			id_servicio	: servicio.id, cantidad	: 1,
		});


		this.busqueda			= '';
		this.search_servicios	= [];
	}

	aumentar(detalle_requisicion)
	{
		detalle_requisicion.cantidad++;
	}
// guardar la rekisision
	//  guardar() {
	// 	 this.is_loading = true;
	// 	 if (this.requisicion.id) {
	// 		 this.rest.requisicionInfo.update({
	// 			 requisicion: this.requisicion
	// 			 ,detalles_requisicion: this.detalles_requisicion
	// 		}).subscribe((requisicion) => {
	// 			 this.is_loading = false;
	// 			 this.router.navigate(['/requisiciones']);
	// 		 }, error => this.showError(error));
	// 	 }
	// 	 else {
	// 		 this.rest.requisicionInfo.create({
	// 			 requisicion: this.requisicion,
	// 			 detalles_requisicion: this.detalles_requisicion
	// 		 }).subscribe((requisicion) => {
	// 			 this.is_loading = false;
	// 			 this.router.navigate(['/requisiciones']);
	// 		 }, error => this.showError(error));
	// 	 }
	// }

}
