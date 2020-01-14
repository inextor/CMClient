import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CentroMedico';
  calendarPlugins = [dayGridPlugin];
}
