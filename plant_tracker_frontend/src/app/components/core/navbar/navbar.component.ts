import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public constructor(
      private router: Router,
  ) {}

  public goToAddPlantForm(): void {
    this.router.navigate(['/plants', 'form'], {});
  }

  public goToPlantsList(): void {
    this.router.navigate(['/plants'], {});
  }
}
