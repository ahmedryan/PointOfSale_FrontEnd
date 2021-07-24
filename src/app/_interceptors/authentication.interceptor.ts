import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authenticationToken = this.authenticationService.getToken();
    const authenticationRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authenticationToken)
    });

    // console.log(authenticationRequest);

    // console.log("entered authentication interceptor...");

    return next.handle(authenticationRequest);
  }

}
