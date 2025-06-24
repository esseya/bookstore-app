import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  publishedDate: string;
}

export interface UpdateBookDto extends CreateBookDto {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://bookstore-api-20250615-hgezh6cfg5aqerbb.northeurope-01.azurewebsites.netapi/book';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getMyBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/my-books`, {
      headers: this.getAuthHeaders(),
    });
  }
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addBookToUser(bookId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${bookId}/add`, null, {
      headers: this.getAuthHeaders(),
    });
  }
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addBook(book: CreateBookDto): Observable<any> {
    return this.http.post(`${this.baseUrl}`, book, {
      headers: this.getAuthHeaders(),
    });
  }

  updateBook(book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, book, {
      headers: this.getAuthHeaders(),
    });
  }


  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
