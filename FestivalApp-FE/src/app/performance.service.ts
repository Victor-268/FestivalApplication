import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Performance } from './performance';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private apiUrl = 'http://localhost:8081/api/performances'; // Ensure this matches your backend API URL
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`PerformanceService: ${message}`);
  }

  getAllPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched performances')),
        catchError(this.handleError<Performance[]>('getAllPerformances', []))
      );
  }

  getPerformancesByDJ(djId: number): Observable<Performance[]> {
    const url = `${this.apiUrl}/dj/${djId}`;
    return this.http.get<Performance[]>(url)
      .pipe(
        tap(_ => this.log(`fetched performances for DJ id=${djId}`)),
        catchError(this.handleError<Performance[]>('getPerformancesByDJ', []))
      );
  }

  getPerformance(id: number): Observable<Performance> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Performance>(url)
      .pipe(
        tap(_ => this.log(`fetched performance id=${id}`)),
        catchError(this.handleError<Performance>(`getPerformance id=${id}`))
      );
  }

  createPerformance(performance: Performance): Observable<Performance> {
    return this.http.post<Performance>(this.apiUrl, performance, this.httpOptions)
      .pipe(
        tap((newPerformance: Performance) => this.log(`added performance w/ id=${newPerformance.id}`)),
        catchError(this.handleError<Performance>('createPerformance'))
      );
  }

  updatePerformance(id: number, performance: Performance): Observable<Performance> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Performance>(url, performance, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated performance id=${id}`)),
        catchError(this.handleError<Performance>('updatePerformance'))
      );
  }

  deletePerformance(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted performance id=${id}`)),
        catchError(this.handleError<void>('deletePerformance'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
