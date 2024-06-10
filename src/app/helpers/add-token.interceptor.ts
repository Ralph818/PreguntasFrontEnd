import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

export const addTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  const token = localStorage.getItem('token');
  var authReq;
  console.log(token);
  if (token) {
    authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
    console.log(authReq);
  }else{
    authReq = req.clone();
  }
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401){
        toastr.error('Sesión expirada, por favor vuelva a  loguearse', "Error!");
        router.navigate(['/inicio/login']);
      }
      return throwError(() => error);
    })
  );
};
