import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DJ } from './dj';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DjService {
  private apiUrl = 'http://localhost:8081/api/djs';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`DjService: ${message}`);
  }

  getAllDJs(): Observable<DJ[]> {
    return this.http.get<DJ[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched DJs')),
        catchError(this.handleError<DJ[]>('getAllDJs', []))
      );
  }

  getDJ(id: number): Observable<DJ> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DJ>(url)
      .pipe(
        tap(_ => this.log(`fetched DJ id=${id}`)),
        catchError(this.handleError<DJ>(`getDJ id=${id}`))
      );
  }

  createDJ(dj: DJ, file?: File): Observable<DJ> {
    const formData = new FormData();
    formData.append('dj', new Blob([JSON.stringify(dj)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.post<DJ>(this.apiUrl, formData)
      .pipe(
        tap((newDJ: DJ) => this.log(`added DJ w/ id=${newDJ.id}`)),
        catchError(this.handleError<DJ>('createDJ'))
      );
  }

  updateDJ(id: number, dj: DJ): Observable<DJ> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<DJ>(url, dj)
      .pipe(
        tap(_ => this.log(`updated DJ id=${id}`)),
        catchError(this.handleError<DJ>('updateDJ'))
      );
  }

  deleteDJ(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        tap(_ => this.log(`deleted DJ id=${id}`)),
        catchError(this.handleError<void>('deleteDJ'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
