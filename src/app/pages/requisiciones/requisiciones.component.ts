import	{	Component,	OnInit	}	from	'@angular/core';
import	{	RestService	}	from	'../../services/rest.service';
import	{	Usuario,Doctor,Centro_Medico, Proveedor, Servicio, Requisicion	}	from	'../../models/Modelos';
import	{Router,ActivatedRoute}	from	"@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-requisiciones',
  templateUrl: './requisiciones.component.html',
  styleUrls: ['./requisiciones.component.css']
})
export class RequisicionesComponent extends BaseComponent implements OnInit {

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
  }
  
  servicios: Servicio[] = [];
  search_servicios: Servicio[] = [];
  busqueda: string = '';
  todos_servicios: [] = [];
  requisiciones: Requisicion[] = []


  ngOnInit() {
    let centro_medico = this.rest.getCurrentCentroMedico();
    forkJoin([
      this.rest.requisicion.search({ eq: { id_centro_medico: centro_medico.id } }),
    ]).subscribe((respuestas) => {
      this.requisiciones = respuestas[0].datos;
      console.log(this.requisiciones)
    }, (error) => this.showError(error));

  }

}
