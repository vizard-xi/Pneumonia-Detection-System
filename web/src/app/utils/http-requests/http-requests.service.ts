import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {


  javaAPI = environment.javaAPI;
  pythonAPI = environment.pythonAPI;

  constructor(private http: HttpClient) { }

  postRequest(endpoint: string, body: any): Observable<any>{
    return this.http.post<any>(this.javaAPI + '/' + endpoint, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  getRequest(endpoint: string): Observable<any>{
    return this.http.get<any>(this.javaAPI + '/'  + endpoint).pipe(
      catchError(this.handleError)
    );
  }

  putRequest(endpoint: string, id: number, body: any): Observable<any>{
    return this.http.put<any>(this.javaAPI + '/' + endpoint + '/' + id, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteRequest(endpoint: string, id: number): Observable<any>{
    return this.http.delete<any>(this.javaAPI + '/' + endpoint + '/' + id);
  }

  postRequestForImageAnalyses(body: any):  Observable<any> {
    return this.http.post<any>(this.pythonAPI, body);
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
