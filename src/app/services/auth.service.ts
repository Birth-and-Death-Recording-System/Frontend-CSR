import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData, userResponse } from '../interface/authInterface';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient,) {}

  signIn(userData: SignInData) {
    return this.http
      .post<userResponse>(`http://127.0.0.1:8000/login/`, userData).pipe(
        tap(response => {
          if (response && response.token) {
            this.storeToken(response.token);
          }
        }),
      );
 
  }
      
  
  // Handle the auth response by setting the cookie and user data
 
  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getUserData() {
    return localStorage.getItem('userData');
  }

  getPageTitle() {
    return localStorage.getItem('pageTitle')
  }

  
  getToken() {
  const token= sessionStorage.getItem('token');
  console.log(token, 'token');
  return token;

  }

  submitBirthData(data: any) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Token ${this.getToken()}`
    // });
    console.log(data);

    return this.http.post('http://localhost:8000/births/', data).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Add this line to return an Observable
      })
    );
  }

  submitDeathData(data: any) {
    console.log(data);

    return this.http.post('http://localhost:8000/deaths/', data).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Add this line to return an Observable
      })
    );
  }

  getAllBirths(): Observable<any> {
    return this.http.get('http://localhost:8000/births/').pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }


  getAllDeaths(): Observable<any> {
    return this.http.get('http://localhost:8000/deaths/').pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }
}
