import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<{ accessToken: string;}>('bookstore-api-20250615-hgezh6cfg5aqerbb.northeurope-01.azurewebsites.net/api/authentication/login', { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.accessToken);
          this.loggedIn.next(true);
        }),
        map(() => {}) 
      );
  }
    register(username: string, email: string,  password: string): Observable<any> {
    return this.http.post(`bookstore-api-20250615-hgezh6cfg5aqerbb.northeurope-01.azurewebsites.net/api/authentication`, { username, email, password });
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
}
