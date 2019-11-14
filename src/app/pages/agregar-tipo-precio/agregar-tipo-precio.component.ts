import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router";
import { Tipo_Precio, Usuario } from '../../models/Modelos';

@Component({
  selector: 'app-agregar-tipo-precio',
  templateUrl: './agregar-tipo-precio.component.html',
  styleUrls: ['./agregar-tipo-precio.component.css']
})
export class AgregarTipoPrecioComponent implements OnInit {
  is_loading:boolean	= false;
  currentUser:Usuario;
  tipoPrecio:Tipo_Precio = {
		nombre: '',
		id_organizacion: null,
  };

  constructor(private rest:RestService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
	this.currentUser = this.rest.getUsuarioSesion();
    this.tipoPrecio = {
			id: null,
			nombre:'',
			id_organizacion:this.currentUser.id_organizacion,
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.tipo_precio.get( id ).subscribe((tipoPrecio)=>
				{
					this.is_loading = false;
					this.tipoPrecio = tipoPrecio;
				}, (error) => {
					this.showError(error);
					this.is_loading = false;
				});
			}
		});
  }
  agregar()
	{
		this.is_loading = true;

		if( this.tipoPrecio.id	)
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      			this.rest.tipo_precio.update( this.tipoPrecio ).subscribe((tipoPrecio)=>{
				this.is_loading = false;
				this.router.navigate(['/tipo-precios/0']);
			});
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
				this.rest.tipo_precio.create( this.tipoPrecio ).subscribe((tipoPrecio)=>{
				this.is_loading = false;
				this.router.navigate(['/tipo-precios/0']);
			});
		}
	}

	async showError(message: string) {

		/*
		const alert = await this.alertController.create({
			header: 'Error',
			//subHeader: 'Subtitle',
			message: message,
			buttons: ['OK']
		});

		await alert.present();
		this.is_loading = false;
		*/
	}

}
