import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('interceptor');
const authService = inject(AuthService);

const authReq = req.clone({
  setHeaders:{
    Authorization: `Token ${authService.getToken()}`,

  }
}
);
  return next(authReq)

};
