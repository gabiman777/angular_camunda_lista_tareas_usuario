import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasklistService {
  //private baseUrl = `${environment.camunda.tasklistBaseUrl}/v1`;

  // Usar el proxy para evitar problemas de CORS
  private baseUrl = `/camunda-api/v1`; 

  //private apiToken = 'YOUR_API_TOKEN_HERE'; // Replace with your actual API token
  private apiToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVVXdPVFpDUTBVM01qZEVRME0wTkRFelJrUkJORFk0T0RZeE1FRTBSa1pFUlVWRVF6bERNZyJ9.eyJodHRwczovL2NhbXVuZGEuY29tL2NsdXN0ZXJJZCI6IjkzOTEwNzhjLTEzMjUtNDZmYS1iZGEwLTEyOWI1NGZjYTViNiIsImh0dHBzOi8vY2FtdW5kYS5jb20vb3JnSWQiOiJjNWY0ZmQ0Mi05ZTNjLTQyYjQtYTA1MC02YmM1NzBiNTY1YzkiLCJodHRwczovL2NhbXVuZGEuY29tL2NsaWVudElkIjoiMWtCWjk3WmJZOXZ-TEQ2SFd0M2c4X345UmVrZU9fX2YiLCJpc3MiOiJodHRwczovL3dlYmxvZ2luLmNsb3VkLmNhbXVuZGEuaW8vIiwic3ViIjoibXdvOTB0MnIzMTYwN3ozNkJOSDY5dFdGS0JYNTVqMVdAY2xpZW50cyIsImF1ZCI6InRhc2tsaXN0LmNhbXVuZGEuaW8iLCJpYXQiOjE3NTY0NzQ3MDIsImV4cCI6MTc1NjU2MTEwMiwic2NvcGUiOiI5MzkxMDc4Yy0xMzI1LTQ2ZmEtYmRhMC0xMjliNTRmY2E1YjYiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJtd285MHQycjMxNjA3ejM2Qk5INjl0V0ZLQlg1NWoxVyJ9.nAdyjI5qneyii_MaiR4J56EadVJvCG9tYOUv2lIwFfXRY2dvqqHZme8uSHDAAFPrcAoSMPqnYRqEYb9IhSoz7vKkIt5y8WneqAk21NYZDmL3u9GjwKespxex2VsPzFZoTfmIM5QusfIPx-8L9LK85CHhZD-25InnjqU-y9MhiwPQUtEi92BepPFTIPkkZ_Xhf3PBU7pOzWS3ICaOfd3auSvrdxDXKUmBZt6t-QQXVLFOQ8wWT5CFjoZvQbZo1ymc4k5BRlrqZWUMNqH4us1xD95gGFjAt-EsViWlcVKAqlhL13ghSaw1Tycxqi20B_TYuuxLSQ60UbVYJ9RaW_uqRA';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /*version1, token variable
  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  */

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    });
  }

  searchTasks(searchBody: any = { state: 'CREATED' }): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks/search`, searchBody, {
      headers: this.getHeaders(),
    });
  }

  getTask(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks/${id}`, {
      headers: this.getHeaders(),
    });
  }
  
  completeTask(id: string, variables: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/complete`, { variables }, {
      headers: this.getHeaders(),
    });
  }

  claimTask(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/claim`, {}, {
      headers: this.getHeaders(),
    });
  }

  /*version1, token variable
  searchTasks(searchBody: any = { state: 'CREATED' }): Observable<any> {
    return this.authService.getToken().pipe(
      switchMap((token) =>
        this.http.post(`${this.baseUrl}/tasks/search`, searchBody, {
          headers: this.getHeaders(token),
        })
      )
    );
  }

  getTask(id: string): Observable<any> {
    return this.authService.getToken().pipe(
      switchMap((token) =>
        this.http.get(`${this.baseUrl}/tasks/${id}`, {
          headers: this.getHeaders(token),
        })
      )
    );
  }

  completeTask(id: string, variables: any): Observable<any> {
    return this.authService.getToken().pipe(
      switchMap((token) =>
        this.http.patch(`${this.baseUrl}/tasks/${id}/complete`, { variables }, {
          headers: this.getHeaders(token),
        })
      )
    );
  }

  claimTask(id: string): Observable<any> {
  return this.authService.getToken().pipe(
    switchMap((token) =>
      this.http.patch(
        `${this.baseUrl}/tasks/${id}/claim`,
        {},
        { headers: this.getHeaders(token) }
      )
    )
  );
  */

  /*
  searchTasks(searchBody: any = { state: 'CREATED' }): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks/search`, searchBody);
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`);
  }

  completeTask(id: string, variables: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/complete`, { variables });
  }
  */

}