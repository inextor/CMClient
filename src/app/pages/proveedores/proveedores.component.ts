import	{	Component,	OnInit	}	from	'@angular/core';
import	{	AlertController	}	from	'@ionic/angular';
import	{	RestService	}	from	'../../services/rest.service';
import	{	Usuario,Doctor,Centro_Medico, Proveedor	}	from	'../../models/Modelos';
import	{Router,ActivatedRoute}	from	"@angular/router"
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent extends BaseComponent implements OnInit {

	proveedores: Proveedor[]		= [];
  ngOnInit() {
    this.is_loading = true;
    this.rest.proveedor.getAll({ id_organizacion: 1 }).subscribe((respuesta)=>
		{
	this.is_loading = false;
      this.proveedores = respuesta.datos;
      console.log(this.proveedores)
		});
  }

}
