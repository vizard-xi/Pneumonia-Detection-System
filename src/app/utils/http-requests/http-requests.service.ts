import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {


  apiURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  postRequest(endpoint: string, data: any): Observable<any>{
    return this.http.post<any>(this.apiURL + '/' + endpoint, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  getRequest(endpoint: string): Observable<any>{
    return this.http.get<any>(this.apiURL + '/'  + endpoint).pipe(
      catchError(this.handleError)
    );
  }

  putRequest(endpoint: string, id: number, data: any): Observable<any>{
    return this.http.put<any>(this.apiURL + '/' + endpoint + '/' + id, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteRequest(endpoint: string, id: number): Observable<any>{
    return this.http.delete<any>(this.apiURL + '/' + endpoint + '/' + id);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message);
    } else {
      console.error(error.status);
    }

    return throwError('Error!');
  }
}
