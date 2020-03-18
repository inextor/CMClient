import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component'
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Organizacion } from 'src/app/models/Modelos';

@Component({
  selector: 'app-agregar-organizacion',
  templateUrl: './agregar-organizacion.component.html',
  styleUrls: ['./agregar-organizacion.component.css']
})
export class AgregarOrganizacionComponent extends BaseComponent implements OnInit {


  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }
  organizacion: Organizacion = {};

  ngOnInit() {

    // let usuario = this.rest.getUsuarioSesion();
    // this.rest.organizacion.get(usuario.id_organizacion).subscribe((response)=>{
    //   this.organizacion = response;
    //   console.log("organizacion", this.organizacion)})

    this.route.paramMap.subscribe(params => {
      let id = params.get('id') == null ? null : parseInt(params.get('id'));
      console.log("losparams",params);
      let usuario = this.rest.getUsuarioSesion();
      if (id != null) {
        this.rest.organizacion.get(id).subscribe(response => {
          this.organizacion = response;
          console.log("estaeslaorganizacion", this.organizacion);
        })
      }
    });
  }


  guardar() {
    // this.is_loading = true;
    // console.log("este es el guardar", this.organizacion);
    // this.rest.organizacion.update(this.organizacion).subscribe((response) => {
    //   this.is_loading = false;
    //   localStorage.setItem('organizacion', JSON.stringify(response));
    //   this.router.navigate(['/agregar-organizacion']);
    // }, (error) => this.showError(error));

    this.is_loading = true;

		if( this.organizacion.id  )
		{
			//this.rest.actualizarCentroMedico( this.organizacion ).subscribe((organizacion)=>{
			this.rest.organizacion.update( this.organizacion ).subscribe((organizacion)=>{
				this.is_loading = false;
				this.router.navigate(['/organizaciones']);

			},(error)=>this.showError(error));
		}
		else
		{
			//this.rest.agregarCentroMedico( this.organizacion ).subscribe((organizacion)=>{
			this.rest.organizacion.create( this.organizacion ).subscribe((organizacion)=>{
				this.is_loading = false;
				this.router.navigate(['/organizaciones']);
			},(error)=>this.showError(error));
		}


  }
}
