import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeathService {

  constructor(private http: HttpClient,) { }

  submitDeathData(data: any) {
    console.log(data);

    return this.http.post('http://localhost:8000/deaths/', data).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Add this line to return an Observable
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

  getDeathDetails(id: number){
    return this.http.get(`http://localhost:8000/births/${id}/`).pipe(
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

  deleteDeath(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/deaths/${id}/`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error); // Return the error as an Observable
      })
    );
  }
}
