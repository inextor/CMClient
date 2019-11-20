import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private rest: RestService, public router: Router ) {}
  showCentros:boolean = false;
  ngOnInit() {}

  logout() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    // localStorage.removeItem('usuario');
    // localStorage.removeItem('session_token');
    // localStorage.removeItem('id_organizacion');
    this.rest.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
