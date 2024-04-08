import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData, userResponse } from '../interface/authInterface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: any;

  constructor(private http: HttpClient,) {}

  signIn(userData: SignInData) {
    return this.http
      .post<userResponse>(`http://127.0.0.1:8000/login/`, userData).pipe(
        tap(response => {
          if (response && response.token) {
            this.storeToken(response.token);
            this.setUsername(response.userData.username)
            this.setUserId(response.userData.id)
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

  private setUsername(username: string){
    sessionStorage.setItem('username', username)
  }
  
  private setUserId(id: string){
    sessionStorage.setItem('id', id)
    
  }

  getToken() {
  const token= sessionStorage.getItem('token');
  console.log(token, 'token');
  return token;

  }

  getUsername(){
    const username =  sessionStorage.getItem("username")
    console.log(username, 'username')
    return username
  }

  getUserId(){
    const userId = sessionStorage.getItem('id')
    return userId
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

  updateBirth(data: any, id: number): Observable<any> {
    return this.http.put(`http://localhost:8000/births/${id}/`, data).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }

  updateDeath(data: any, id: number): Observable<any> {
    return this.http.put(`http://localhost:8000/deaths/${id}/`, data).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }

  deleteBirth(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/births/${id}/`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }

  deleteDeath(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/deaths/${id}/`).pipe(
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
