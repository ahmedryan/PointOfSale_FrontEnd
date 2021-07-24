import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IUser } from "../_models/user";
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = "https://localhost:5001/api/";

  isLoading = false;

  private userName: string;
  private userRole: string;
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;

  private authStatusListener = new Subject<boolean>(); // publisher

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return this.token;
  }

  getUserName(): string {
    return this.userName;
  }

  getUserRole(): string {
    return this.userRole;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatusListener(): Observable<any> {
    return this.authStatusListener.asObservable(); // listens to publisher
  }

  register(credentials: any) {
    return this.http
      .post<any>(this.baseUrl + "accounts/register", credentials);
  }

  login(credentials: any): void {
    this.http
      .post<any>(this.baseUrl + "accounts/login", credentials)
      .subscribe(response => {
        this.userName = response.userName;
        this.token = response.token;

        if (this.token) {
          var decoded: any = jwt_decode(this.token);
          var decodedHeader: any = jwt_decode(this.token, { header: true });
          // console.log(JSON.stringify(decoded));
          this.userRole = decoded.role;
          // console.log(this.userRole);
          // console.log(new Date().getTime());
          // console.log(decoded.exp * 1000);
          // console.log((decoded.exp * 1000 - new Date().getTime()) / 1000 / 60);

          const expiresInDuration = decoded.exp * 1000 - new Date().getTime(); // converted into miliseconds
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration);
          this.saveAuthData(this.userName, this.userRole, this.token, expirationDate);
          // console.log(now.getTime());
          // console.log(decoded.exp * 1000);
          if (this.userRole.toLowerCase() === "admin") this.router.navigate(['/stock']).then();
          if (this.userRole.toLowerCase() === "operator") this.router.navigate(['/sale']).then();
        }

        // console.log("logged in");
        // console.log(this.userName);
        // console.log(this.userRole);
        // console.log(this.token);
        // console.log(this.isAuthenticated);

      }, (err) => {
        console.log("not logged in");

        this.authStatusListener.next(false);
      });
  }

  logout() {
    console.log("logout");

    this.isAuthenticated = null;
    this.token = null;
    this.userName = null;
    this.userRole = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearLocalStorageAuthData();
    this.router.navigate(['/']).then();
  }

  autoAuthUser() {
    // console.log("auto auth user entered");

    const _userName = localStorage.getItem("userName");
    const _userRole = localStorage.getItem("userRole");
    const _token = localStorage.getItem("token");
    const _expirationDate = new Date(localStorage.getItem("expiration"));


    if (!_token || !_expirationDate) return;

    const _now = new Date();
    const _expiresIn = _expirationDate.getTime() - _now.getTime();

    // console.log(_expiresIn / 1000 / 60);

    if (_expiresIn > 0) {
      this.userName = _userName;
      this.userRole = _userRole;
      this.token = _token;
      this.setAuthTimer(_expiresIn);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    // console.log("set auth timer: " + typeof (duration));
    // console.log("set auth timer: " + duration);

    this.tokenTimer = setTimeout(() => {
      // console.log("token timer logout");
      // console.log(duration);

      this.logout();
    }, duration);
  }

  private saveAuthData(userName: string, userRole: string, token: string, expirationDate: Date) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearLocalStorageAuthData() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
}
