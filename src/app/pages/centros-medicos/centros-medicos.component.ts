import	{	Component,	OnInit	}	from	'@angular/core';
import	{	AlertController	}	from	'@ionic/angular';
import	{	RestService	}	from	'../../services/rest.service';
import	{	Usuario,Doctor,Centro_Medico	}	from	'../../models/Modelos';
import	{Router,ActivatedRoute}	from	"@angular/router"



@Component({
  selector: 'app-centros-medicos',
  templateUrl: './centros-medicos.component.html',
  styleUrls: ['./centros-medicos.component.css']
})
export class CentrosMedicosComponent implements OnInit {

	constructor(private	rest:RestService,public	alertController:	AlertController,private	router:Router,private	route:ActivatedRoute)	{	}

	is_loading:boolean 	= false;
	centros_medicos:Centro_Medico[]		= [];

	ngOnInit()	{
		// TODO agarrar id organizacion de la sesion

		//this.rest.getCentrosMedicosPorOrganizacion(1).subscribe((respuesta)=>
		this.rest.centro_medico.getAll({ id_organizacion: 1 }).subscribe((respuesta)=>
		{
			this.centros_medicos = respuesta.datos;
		});
	}
}
