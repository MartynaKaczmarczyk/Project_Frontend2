import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'plant_tracker_frontend';

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}
