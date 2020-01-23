import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base/base.component'
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { Organizacion } from 'src/app/models/Modelos';

@Component({
  selector: 'app-agregar-organizacion',
  templateUrl: './agregar-organizacion.component.html',
  styleUrls: ['./agregar-organizacion.component.css']
})
export class AgregarOrganizacionComponent extends BaseComponent implements OnInit {


	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}
  organizacion:Organizacion={};
  
  ngOnInit() {
    
    let usuario = this.rest.getUsuarioSesion();
    this.rest.organizacion.get(usuario.id_organizacion).subscribe((response)=>{
      this.organizacion = response;
      console.log("organizacion", this.organizacion)})

      this.route.paramMap.subscribe( params =>
        {
          let c = this.rest.getCompanyFromSession();
          this.organizacion.id = c.id;
    
          this.rest.organizacion.get( c.id ).subscribe((organizacion)=>
          {
            this.is_loading = false;
            this.organizacion= organizacion;
          },(error)=>
          {
            this.is_loading = false;
            this.showError( error );
          });
    
    
        });
  }

  uploadImage(evt)
	{
		if (evt.target.files.length)
		{
			this.rest.uploadImage(evt.target.files[0], false).subscribe((imageData) => {
				this.organizacion.id_imagen_default_logo = imageData.id;
			}, error => this.showError(error));
		}
	}
}
