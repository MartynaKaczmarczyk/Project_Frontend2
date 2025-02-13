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
    private router: Router 
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
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    localStorage.setItem('authHeader', authHeader);

    this.router.navigate(['/']);
  }
}
