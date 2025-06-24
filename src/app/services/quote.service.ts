import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Quote {
  id: string;
  text: string;
  author: string;
  publishedDate: string;
}

export interface CreateQuoteDto {
  text: string;
  author: string;
  publishedDate: string;
}

export interface UpdateQuoteDto extends CreateQuoteDto {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private baseUrl = 'bookstore-api-20250615-hgezh6cfg5aqerbb.northeurope-01.azurewebsites.net/api/quote';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getQuoteById(id: string): Observable<Quote> {
    return this.http.get<Quote>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addQuote(quote: CreateQuoteDto): Observable<any> {
    return this.http.post(`${this.baseUrl}`, quote, {
      headers: this.getAuthHeaders(),
    });
  }

  updateQuote(quote: UpdateQuoteDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${quote.id}`, quote, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteQuote(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
