import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {  RouterModule, Router } from '@angular/router';
import { LoginForm } from '../../../models/loginForm.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public errorMessage: string = '';

  public constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>(
    {
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }, {updateOn: 'change'}
  );

  public login():void {
    if (this.loginForm.invalid) {
      alert("Invalid login form");

      return;
    }

    const username: string | null = this.loginForm.getRawValue().username;
    const password: string | null = this.loginForm.getRawValue().password;
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.authService.isLoggedInSubject.next(true);
        console.log(res);
        localStorage.setItem('userId', res);
        localStorage.setItem('authHeader', 'Basic ' + btoa(`${username}:${password}`));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Check your credentials.';
        console.error('Login error:', err);
      }
    });

  }
}
