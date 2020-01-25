import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-calendario-doctores',
  templateUrl: './calendario-doctores.component.html',
  styleUrls: ['./calendario-doctores.component.css']
})
export class CalendarioDoctoresComponent extends BaseComponent implements OnInit {


  ngOnInit() {
	  this.titleService.setTitle('Calendario Doctores');
  }

}
