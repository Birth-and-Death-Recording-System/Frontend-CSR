import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BirthService {

  constructor(private http: HttpClient,) { }

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

  getAllBirths(): Observable<any> {
    return this.http.get('http://localhost:8000/births/').pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }

  getbirthDetails(id: number){
    return this.http.get(`http://localhost:8000/births/${id}/`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }

  updateBirthDeatils(data: any, id: number): Observable<any> {
    return this.http.put(`http://localhost:8000/births/${id}/`, data).pipe(
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
}
