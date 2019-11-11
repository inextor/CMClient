import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario , Paciente } from '../../models/Modelos';
import {Router,ActivatedRoute} from "@angular/router"



@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

	constructor(private rest:RestService,public alertController: AlertController,private router:Router,private route:ActivatedRoute) { }

	usuario:Usuario = {
		id_organizacion: 1,
		contrasena: '',
		correo_electronico:'',
		tipo: 'PACIENTE'
	};
	paciente:Paciente = {
		nombre:'',
		apellidos:''
	};
	is_loading:boolean = false;

	confirmar_contrasena:string = '';

	ngOnInit()
	{

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

	registrarse()
	{

		this.is_loading = true;
		this.rest.registrarUsuarioPaciente( this.usuario, this.paciente ).subscribe((usuario)=>
		{
			this.is_loading = false;
			this.router.navigate(['/home']);
		},
		(error)=>
		{
			console.log("QUE PASO");
			 this.showError( this.rest.getErrorMessage( error ) );
			this.is_loading = false;
		});
	}
}
