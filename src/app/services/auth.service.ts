import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  private baseUrl = 'https://bookstore-api-20250615-hgezh6cfg5aqerbb.northeurope-01.azurewebsites.netapi/authentication';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<{ accessToken: string }>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.accessToken);
          this.loggedIn.next(true);
        }),
        map(() => {}),
        catchError(this.handleError)  // <-- Add error handling here
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { username, email, password }).pipe(
      catchError(this.handleError)  // <-- Add error handling here
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    return throwError(() => error);
  }
}
