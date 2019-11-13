import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Observable, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<any>;
  constructor(private rest: RestService) {}

  ngOnInit() {}

  logout() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    // localStorage.removeItem('usuario');
    // localStorage.removeItem('session_token');
    // localStorage.removeItem('id_organizacion');
    this.currentUserSubject.next(null);
  }
}
