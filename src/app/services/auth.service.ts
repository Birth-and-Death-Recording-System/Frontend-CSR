import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData, userResponse } from '../interface/authInterface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signIn(userData: SignInData) {
    return this.http
      .post<userResponse>(`http://127.0.0.1:8000/login/`, userData)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.storeToken(response.token);
            this.setUsername(response.userData.username);
            this.setUserId(response.userData.id);
          }
        })
      );
  }

  // Handle the auth response by setting the cookie and user data

  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  private setUsername(username: string) {
    sessionStorage.setItem('username', username);
  }

  private setUserId(id: string) {
    sessionStorage.setItem('id', id);
  }

  getToken() {
    const token = sessionStorage.getItem('token');
    console.log(token, 'token');
    return token;
  }

  getUsername() {
    const username = sessionStorage.getItem('username');
    return username;
  }

  getUserId() {
    const userId = sessionStorage.getItem('id');
    return userId;
  }

  getProfileDetail() {
    return this.http.get(`http://localhost:8000/profile/`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }

  updateProfileData(data: any): Observable<any> {
    return this.http.put(`http://localhost:8000/profile/`, data).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }

  // Method to clear authentication state and log out the user
  logout(): void {
    // Clear any authentication-related data (e.g., user token, user object, etc.)
    // For example:
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    // Navigate the user to the login page or any other appropriate page
    this.router.navigate(['']);
  }
}
