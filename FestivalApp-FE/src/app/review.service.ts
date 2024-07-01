import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Review } from './review';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8082/reviews'; // Ensure this matches your backend API URL
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`ReviewService: ${message}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched reviews')),
        catchError(this.handleError<Review[]>('getAllReviews', []))
      );
  }

  getReviewsByDJ(djName: string): Observable<Review[]> {
    const url = `${this.apiUrl}/dj/${djName}`;
    return this.http.get<Review[]>(url)
      .pipe(
        tap(_ => this.log(`fetched reviews for DJ name=${djName}`)),
        catchError(this.handleError<Review[]>('getReviewsByDJ', []))
      );
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review, this.httpOptions)
      .pipe(
        tap((newReview: Review) => this.log(`added review w/ id=${newReview.id}`)),
        catchError(this.handleError<Review>('createReview'))
      );
  }

  updateReview(id: string, review: Review): Observable<Review> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Review>(url, review, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated review id=${id}`)),
        catchError(this.handleError<Review>('updateReview'))
      );
  }

  deleteReview(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted review id=${id}`)),
        catchError(this.handleError<void>('deleteReview'))
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
