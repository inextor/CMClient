import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router"
import { Proveedor } from '../../models/Modelos';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
  is_loading:boolean  = false;

	proveedor:Proveedor = {
		nombre: ''
	};

  constructor(private rest:RestService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.proveedor = {
			id: null,
			nombre:''
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.proveedor.get( id ).subscribe((proveedor)=>
				{
					this.is_loading = false;
					this.proveedor = proveedor;
				});
			}
		});
	}

  guardar()
	{
		this.is_loading = true;

		if( this.proveedor.id  )
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.proveedor.update( this.proveedor ).subscribe((proveedor)=>{
				this.is_loading = false;
				this.router.navigate(['/proveedores']);
			}, (error) => {
				this.showError(this.rest.getErrorMessage(error));
				this.is_loading = false;
			});
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.proveedor.create( this.proveedor ).subscribe((proveedor)=>{
				this.is_loading = false;
				this.router.navigate(['/proveedores']);
			}, (error) => {
				this.showError(this.rest.getErrorMessage(error));
				this.is_loading = false;
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
