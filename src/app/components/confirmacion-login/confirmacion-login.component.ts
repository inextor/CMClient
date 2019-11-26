import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { Centro_Medico } from '../../models/Modelos';
import { map, distinctUntilChanged, mergeMap, delay } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmacion-login',
  templateUrl: './confirmacion-login.component.html',
  styleUrls: ['./confirmacion-login.component.css']
})
export class ConfirmacionLoginComponent implements OnInit {
  @Input() show: boolean;
  @Input() showCancel: boolean;
  @Output() selected = new EventEmitter<Centro_Medico>();
  constructor(private rest: RestService, private router: Router ) {
  }

  ngOnInit() {


  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    // localStorage.removeItem('usuario');
    // localStorage.removeItem('session_token');
    // localStorage.removeItem('id_organizacion');
    this.rest.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
 

  dismissModal() {
    //		this.modalCtrl.dismiss(null);
  }


}
