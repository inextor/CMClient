import	{	Component,	OnInit	}	from	'@angular/core';
import	{	RestService	}	from	'../../services/rest.service';
import	{	Usuario,Doctor,Centro_Medico, Proveedor	}	from	'../../models/Modelos';
import	{Router,ActivatedRoute}	from	"@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

	proveedores: Proveedor[]		= [];
  ngOnInit() {
	this.titleService.setTitle('Proveedores');
    this.is_loading = true;
    this.rest.proveedor.getAll({ id_organizacion: 1 }).subscribe((respuesta)=>
		{
	this.is_loading = false;
      this.proveedores = respuesta.datos;
      console.log(this.proveedores)
    }, (error) => this.showError );
  }
}
