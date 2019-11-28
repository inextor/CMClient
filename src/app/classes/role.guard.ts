import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { RestService } from "../services/rest.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private rest: RestService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.rest.getUsuarioSesion()
    if (currentUser) {
  
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
