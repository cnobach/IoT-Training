import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor( private toastr: NotificationService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          this.toastr.error('Your session has expired. Please log in again.', 'Authentication Error');
        } 
        else if(error.status === 403){
          this.toastr.error('Your session has expired. Please log in again.', 'Authentication Error');
        }
        else if(error.status === 500){
          this.toastr.error('Internal server error.', 'Error');
        }
        else {
          this.toastr.error(error.message, 'Unexpected Error');
        }
        this.router.navigate(['']);
        return throwError(() => new Error(error.message));
      })
    )
  }
}
