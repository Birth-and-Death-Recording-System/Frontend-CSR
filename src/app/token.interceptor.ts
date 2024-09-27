import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './Services/auth.service';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  // Determine if this request is for the login endpoint
  const isLoginRequest = req.url.includes('/login/');

  // Clone request to add the token, if present, and if not a login request
  const authReq = (!isLoginRequest && token)
    ? req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      })
    : req; // If no token or login request, send the original request

  return next(authReq)
  
};