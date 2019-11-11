import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {Router,ActivatedRoute,ParamMap} from "@angular/router"
import { HttpErrorResponse } from '@angular/common/http';
import { Paciente,Usuario } from '../../models/Modelos';

@Component({
	selector: 'app-agregar-familiar',
	templateUrl: './agregar-familiar.component.html',
	styleUrls: ['./agregar-familiar.component.scss'],
})
export class AgregarFamiliarComponent implements OnInit {

	constructor(private rest:RestService,public alertController: AlertController,private router:Router,private route:ActivatedRoute) { }

	is_loading:boolean = false;

	usuario:Usuario = {
		usuario: 'Usuario '+Date.now(),
		tipo:'PACIENTE'
	}

	paciente:Paciente = {
		nombre:'',
		apellidos:'',
		fecha_nacimiento: '',
		telefono: ''
	};

	ngOnInit() {
		this.route.paramMap.subscribe( params =>{

			let id_paciente = params.get('id_paciente') == null ? null : parseInt( params.get('id_paciente') );
			let id_usuario = params.get('id_usuario') == null ? null : parseInt( params.get('id_usuario') );
			if( id_paciente )
			{
				this.is_loading = true;
				//this.rest.getPaciente( id_paciente ).subscribe((paciente)=>
				this.rest.paciente.get(id_paciente ).subscribe((paciente)=>
				{
					console.log("WTF");
					this.is_loading = false;
					this.paciente = paciente;
				});
			}
			else
			{
				this.paciente ={
					nombre:'',
					id_usuario,
					apellidos:'',
					fecha_nacimiento: '',
					telefono: ''
				};
			}
		});
	}

	guardarPaciente()
	{
		this.is_loading = true;

		console.log

		if( this.paciente.id )
		{
			//this.rest.updatePaciente(this.paciente ).subscribe((paciente)=>
			this.rest.paciente.update( this.paciente ).subscribe((paciente)=>
			{
				this.is_loading = false;
				this.router.navigate(['/home']);
			},
			(error)=>
			{
				this.showError( this.rest.getErrorMessage( error ) );
				this.is_loading = false;
			});

		}
		else
		{
			//this.rest.agregarPaciente(this.paciente ).subscribe((paciente)=>
			this.rest.paciente.create( this.paciente ).subscribe((paciente)=>
			{
				this.is_loading = false;
				this.router.navigate(['/home']);
			},
			(error)=>
			{
				this.showError( this.rest.getErrorMessage( error ) );
				this.is_loading = false;
			});
		}
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


	async showError(message:string)
	{
		const alert = await this.alertController.create
		({
			header: 'Error',
			//subHeader: 'Subtitle',
			message: message,
			buttons: ['OK']
		});

		await alert.present();
	}
}
