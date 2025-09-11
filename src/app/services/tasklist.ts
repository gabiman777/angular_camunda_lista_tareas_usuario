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
  //private baseUrl = `/camunda-api/v1`; 
  private baseUrl = `${environment.camunda.tasklistBaseUrl}/v1`;

  //TODO. este token debe generarse dinámicamente
  //private apiToken = 'YOUR_API_TOKEN_HERE'; // Replace with your actual API token
  private apiToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVVXdPVFpDUTBVM01qZEVRME0wTkRFelJrUkJORFk0T0RZeE1FRTBSa1pFUlVWRVF6bERNZyJ9.eyJodHRwczovL2NhbXVuZGEuY29tL2NsdXN0ZXJJZCI6IjRhYjdlODgyLTc2OTAtNDZkOS1iODEwLWFjM2ZhMjkzMDhkZSIsImh0dHBzOi8vY2FtdW5kYS5jb20vb3JnSWQiOiJjNWY0ZmQ0Mi05ZTNjLTQyYjQtYTA1MC02YmM1NzBiNTY1YzkiLCJodHRwczovL2NhbXVuZGEuY29tL2NsaWVudElkIjoiYllGWUw1R2czNVZDUkh5VUplX01Rd19-Z3NnYUhsZnEiLCJpc3MiOiJodHRwczovL3dlYmxvZ2luLmNsb3VkLmNhbXVuZGEuaW8vIiwic3ViIjoibXdvOTB0MnIzMTYwN3ozNkJOSDY5dFdGS0JYNTVqMVdAY2xpZW50cyIsImF1ZCI6InRhc2tsaXN0LmNhbXVuZGEuaW8iLCJpYXQiOjE3NTc2MTg3OTgsImV4cCI6MTc1NzcwNTE5OCwic2NvcGUiOiI0YWI3ZTg4Mi03NjkwLTQ2ZDktYjgxMC1hYzNmYTI5MzA4ZGUiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJtd285MHQycjMxNjA3ejM2Qk5INjl0V0ZLQlg1NWoxVyJ9.S0rFTxM8mblLEunmMwIaHZ_P2neZYVomEacOQKpav0dBiofrksoyJMVdDTKkJEiMr0ks47SlFXsqp471n9mS8rQsQZCOh3cAF7PxZSiHPsZo0xs5KgQjHLzLAffrWAi-MXfgevcZG28mUmvPqj-jvFbQOLGXP74kDCnVxSOH2bb0WDvPEyY3O8ZqpWiphgGW48hniJ7Jd3iFdkrQiVYnmIKRHnUz2v75k3fJbbdX4UdbM_c4Fvz7rAypFAuWeeXEXPzvuAcIjpw9U2Vuhy103H1bPNKver_jZubg9weXjnU5iai5H82zaO6HxeFMRqgWPUJbKV_zkV1rCQniFvYTpQ';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /*version1, token variable, para que lo pueda refrescar el interceptor
  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  */

  private getHeaders(): HttpHeaders {
    /*
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    });
    */
    if (!this.apiToken) {
      console.error('apiToken is undefined or empty');
      throw new Error('API token is not set');
    }

   const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    });
    console.log('Headers after creation:', headers);
    return headers;
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