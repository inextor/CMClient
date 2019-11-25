import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base/base.component'
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-agregar-organizacion',
  templateUrl: './agregar-organizacion.component.html',
  styleUrls: ['./agregar-organizacion.component.css']
})
export class AgregarOrganizacionComponent extends BaseComponent implements OnInit {


	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location, public titleService:Title)
	{
		super( rest,router,route,location,titleService);
	}

  ngOnInit() {
  }

}
