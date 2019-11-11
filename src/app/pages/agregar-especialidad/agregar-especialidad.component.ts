import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute} from "@angular/router";
import { Especialidad } from '../../models/Modelos';

@Component({
	selector: 'app-agregar-especialidad',
	templateUrl: './agregar-especialidad.page.html',
	styleUrls: ['./agregar-especialidad.page.scss'],
})
export class AgregarEspecialidadPage implements OnInit {
	is_loading:boolean	= false;

	especialidad:Especialidad = {
		nombre: '',
		abreviacion: ''
	};
	constructor(private rest:RestService,public alertController: AlertController,private router:Router,private route:ActivatedRoute) { }

	ngOnInit() {
		this.especialidad = {
			id: null,
			nombre:'',
			abreviacion:''
		};

		this.route.paramMap.subscribe( params =>
		{
			let id = params.get('id') ==null ? null : parseInt(params.get('id') );
			if( id != null )
			{
				this.is_loading = true;
				//this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
				this.rest.especialidad.get( id ).subscribe((especialidad)=>
				{
					this.is_loading = false;
					this.especialidad = especialidad;
				});
			}
		});
	}

	agregar()
	{
		this.is_loading = true;

		if( this.especialidad.id	)
		{
			//this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.especialidad.update( this.especialidad ).subscribe((especialidad)=>{
				this.is_loading = false;
				this.router.navigate(['/especialidades']);
			});
		}
		else
		{
			//this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
			this.rest.especialidad.create( this.especialidad ).subscribe((especialidad)=>{
				this.is_loading = false;
				this.router.navigate(['/especialidades']);
			});
		}
	}
}
