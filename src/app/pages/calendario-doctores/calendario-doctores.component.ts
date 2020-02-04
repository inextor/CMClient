import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-calendario-doctores',
  templateUrl: './calendario-doctores.component.html',
  styleUrls: ['./calendario-doctores.component.css']
})
export class CalendarioDoctoresComponent extends BaseComponent implements OnInit {

date:Date=new Date();
  ngOnInit() {
    this.titleService.setTitle('Calendario Doctores');
  }
  siguiente(){
    let newDate= new Date();
    newDate.setTime(this.date.getTime());
    newDate.setDate(this.date.getDate()+1);
    this.date = newDate;
  }
  anterior(){
    let newDate= new Date();
    newDate.setTime(this.date.getTime());
    newDate.setDate(this.date.getDate()-1);
    this.date = newDate;

  }
}
