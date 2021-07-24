import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from "rxjs/operators";
import { BusyService } from '../_services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyService.busy();
    // console.log("entered loading interceptor...");

    return next.handle(request)
      .pipe(
        delay(1000),
        finalize(() => {
          // console.log("entered loading interceptor...");
          this.busyService.idle();
        })
      );
  }
}
