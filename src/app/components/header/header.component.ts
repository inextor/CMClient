import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../pages/base/base.component'

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Input() pagina: string;
  ngOnInit() {
    let usuario = this.rest.getUsuarioSesion();
  }

  isNavbarCollapsed=true;
}
