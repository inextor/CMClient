import { Component,	OnInit	}	from	'@angular/core';
import { RestService	}	from	'../../services/rest.service';
import { Usuario,Doctor,Centro_Medico	}	from	'../../models/Modelos';
import { Router,ActivatedRoute}	from	"@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';



@Component({
  selector: 'app-centros-medicos',
  templateUrl: './centros-medicos.component.html',
  styleUrls: ['./centros-medicos.component.css']
})

export class CentrosMedicosComponent extends BaseComponent implements OnInit {


	centros_medicos:Centro_Medico[]		= [];
	//constructor(public rest:RestService,public router:Router,public route:ActivatedRoute,public location: Location) {
	//	super( rest,router,route,location);
	//  }
	ngOnInit()	{
		// TODO agarrar id organizacion de la sesion
		this.is_loading = true;
		//this.rest.getCentrosMedicosPorOrganizacion(1).subscribe((respuesta)=>
		this.rest.centro_medico.getAll({ id_organizacion: 1 }).subscribe((respuesta)=>
		{
			this.is_loading = false;
			this.centros_medicos = respuesta.datos;
		}, (error) =>  this.showError );
	}
}
