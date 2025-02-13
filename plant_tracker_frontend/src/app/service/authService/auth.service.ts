import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authHeader'));
  
  public constructor(private http: HttpClient) {}

  public isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  public login(username: string | null, password: string | null): Observable<any> {
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authHeader
    });

    return this.http.post<any>('http://localhost:8080/users/login', {}, { headers });
  }

  public logout(): void {
    localStorage.removeItem('authHeader');
    localStorage.removeItem('userId');
    this.isLoggedInSubject.next(false);
  }
}
