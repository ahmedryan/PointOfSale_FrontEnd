import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  username: string;
  userrole: string;
  model: any = {};
  private authStatusSubscriber: Subscription;

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authenticationService.getIsAuth();
    this.username = this.authenticationService.getUserName();
    this.userrole = this.authenticationService.getUserRole();

    this.authStatusSubscriber = this.authenticationService
      .getAuthStatusListener()
      .subscribe(response => {
        console.log(response);


        this.isUserAuthenticated = response;
        this.username = this.authenticationService.getUserName();
        this.userrole = this.authenticationService.getUserRole();

        // console.log("username: " + this.username);
        // console.log("userrole: " + this.userrole);
        // console.log("status: " + this.isUserAuthenticated);
      }); // subscribes to the authStatusListener
  }

  login() {
    this.authenticationService
      .login(this.model);
    this.model = {};
  }

  logout() {
    console.log("username: " + this.username);
    console.log("userrole: " + this.userrole);
    this.authenticationService
      .logout();
  }

  ngOnDestroy() {
    this.authStatusSubscriber.unsubscribe();
  }
}
