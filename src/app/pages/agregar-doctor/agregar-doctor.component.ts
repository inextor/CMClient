import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Doctor,Usuario } from '../../models/Modelos';
import { Router,ActivatedRoute} from "@angular/router"
import { BasePage } from '../base/base.component';



@Component({
	selector: 'app-agregar-doctor',
	templateUrl: './agregar-doctor.page.html',
	styleUrls: ['./agregar-doctor.page.scss'],
})
export class AgregarDoctorPage extends BasePage implements OnInit {


	doctor:Doctor = {
		'nombre':'',
		'especialidad':'',
		'telefono':''
	};

	usuario:Usuario = {
		'usuario':'',
		'contrasena':'',
		'tipo':'DOCTOR',
		'id_imagen': null
	};


	ngOnInit() {

		let usuario = this.rest.getUsuarioSesion();

		if( usuario !== null )
		{
			this.usuario.id_organizacion = usuario.id_organizacion;
		}
	}

	agregar()
	{
		this.rest.agregarUsuarioDoctor(this.usuario,this.doctor).subscribe((doctor)=>
		{
			this.router.navigate(['/home']);
		},
		(error)=>
		{
			this.showError( this.rest.getErrorMessage( error ) );
			this.is_loading = false;
		});
	}

	uploadImage(evt)
	{
		if( evt.target.files.length )
		{
			this.rest.uploadImage( evt.target.files[0], false ).subscribe((imageData)=>
			{
				this.usuario.id_imagen = imageData.id;
			});
		}
	}


}
