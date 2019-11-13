import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { RestService } from "../services/rest.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private rest: RestService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.rest.currentUserValue;
    if (currentUser) {
      if (
        route.data.roles &&
        route.data.roles.indexOf(currentUser.usuario.tipo) === -1
      ) {
        this.router.navigate(["/"]);
        return false;
      }
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/"], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
