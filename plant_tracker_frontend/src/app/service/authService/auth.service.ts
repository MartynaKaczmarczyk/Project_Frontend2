import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authHeader'));
  
  public isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  public login(authHeader: string): void {
    localStorage.setItem('authHeader', authHeader);
    this.isLoggedInSubject.next(true);
  }

  public logout(): void {
    localStorage.removeItem('authHeader');
    this.isLoggedInSubject.next(false);
  }
}
