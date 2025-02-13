import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../service/authService/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public isLoggedIn: boolean = false;

  public constructor(
      private router: Router,
      private authService: AuthService
  ) {
    authService.isLoggedIn.subscribe((userStatus) => {
      this.isLoggedIn = userStatus;
    });
  }

  public goToAddPlantForm(): void {
    this.router.navigate(['/plants', 'form'], {});
  }

  public goToPlantsList(): void {
    this.router.navigate(['/plants'], {});
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
