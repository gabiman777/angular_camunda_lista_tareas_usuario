import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenExpiration: number | null = null;

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    if (this.isTokenValid()) {
      return this.tokenSubject.asObservable() as Observable<string>;
    } else {
      return this.fetchToken().pipe(map((response) => response.access_token));
    }
  }

  private fetchToken(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.camunda.clientId);
    body.set('client_secret', environment.camunda.clientSecret);
    body.set('audience', 'tasklist.camunda.io');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(environment.camunda.oauthUrl, body.toString(), { headers }).pipe(
      map((response: any) => {
        this.tokenSubject.next(response.access_token);
        this.tokenExpiration = Date.now() + response.expires_in * 5000 - 60000; // Buffer de 5 min
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching token:', error);
        return throwError(() => error);
      })
    );
  }

  private isTokenValid(): boolean {
    return (
      this.tokenSubject.value !== null &&
      this.tokenExpiration !== null &&
      Date.now() < this.tokenExpiration
    );
  }

  refreshToken(): Observable<string> {
    return this.fetchToken().pipe(map((response) => response.access_token));
  }
}
