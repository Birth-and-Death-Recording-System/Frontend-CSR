import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('interceptor');
const authService = inject(AuthService);
const token = req.clone({
  setHeaders:{
    Authorization: ` ${authService.getToken()}`
  }
}
);
  return next(token)

};
