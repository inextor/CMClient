import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario } from '../../models/Modelos';
import { Router,ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  constructor(private rest:RestService,public alertController: AlertController,private router:Router,private route:ActivatedRoute) { }
  is_loading:boolean = false;

// 	producto: Producto = {
// 		'nombre':'',
// 		'tipo':'',
//     'caducidad':''

//   };

  ngOnInit() {
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
