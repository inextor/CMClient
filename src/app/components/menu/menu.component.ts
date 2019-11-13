import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private rest: RestService) {}

  ngOnInit() {}

  logout() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    // localStorage.removeItem('usuario');
    // localStorage.removeItem('session_token');
    // localStorage.removeItem('id_organizacion');
    // this.currentUserSubject.next(null);
    window.location.reload()
  }
}
