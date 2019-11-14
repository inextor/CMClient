import {
	Component,
	OnInit,
	AfterContentInit,
	AfterViewInit,
	OnDestroy
} from '@angular/core';

import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { BaseComponent } from '../../pages/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends BaseComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
	ngOnInit() {
		if( this.rest.currentUserValue ){
			this.router.navigate(['/'])
		}
		//this.menuCtrl.enable(false);
		//this.menuCtrl.swipeEnable(false);
	}
	ngAfterContentInit() {
		//this.menuCtrl.enable(true);
		//this.menuCtrl.swipeEnable(true);
	}
	ngAfterViewInit() {
		//this.menuCtrl.enable(false);
		//this.menuCtrl.swipeEnable(false);
	}
	ngOnDestroy() {
		//this.menuCtrl.enable(true);
		//this.menuCtrl.swipeEnable(true);
	}

	usuario: string = '';
	contrasena: string = '';
	is_loading: boolean = false;

	doLoginKeyboard(evt:KeyboardEvent)
	{
		if( evt.keyCode == 13 )
			this.doLogin();
	}

	doLogin() {
		this.is_loading = true;

		this.rest.doLogin(this.usuario, this.contrasena).subscribe(
			response => {
				this.is_loading = false;
				this.router.navigate(['/home']);
				//this.restService.callMethodGet('/assets/data.json',{foo:'yes'}).subscribe((response)=>
			},
			error => {
				this.error_message =  this.rest.getErrorMessage(error);
				this.is_loading = false;
			}
		);
	}
}
