import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Input() pagina: string;
  showCentros =true;
  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
  }

  isNavbarCollapsed=false;
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
