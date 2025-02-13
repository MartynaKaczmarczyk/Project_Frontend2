import { Component, OnInit } from '@angular/core';
import { Plant } from '../../../models/plant.model';
import { PlantService } from '../../../service/plant.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.scss'
})
export class PlantListComponent implements OnInit {
  public plants: Plant[] = [];
  public errorMessage: string = '';
  public searchTerm : string = '';
  public searchBy: number = Number(localStorage.getItem('userId')) || 0;

  public constructor(
    private plantService: PlantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loadPlants();
  }

  public loadPlants(): void {
    this.plantService.loadPlants().subscribe(
      (res) => {
        console.log(res);
        this.plants = res;
        this.searchTerm = '';
      },
      (error) => {
        console.error('Error loading plants:', error);
        this.errorMessage = 'Failed to load plants, please try again later.';
      }
    );
  }

  public goToDetails(id: number | null): void {
    this.router.navigate(['/plants', id, 'details'], {
      relativeTo: this.route,
      queryParams: { test: '1' },
    });
  }

  public deletePlant(id: number | null): void {
    this.plantService.deletePlant(id).subscribe(
      (res) => {
        console.log(res);
        this.loadPlants(); 
      },
      (error) => {
        console.error(`Error deleting plant with ID ${id}:`, error);
        this.errorMessage = `Failed to delete plant with ID ${id}, please try again later.`;
      }
    );
  }


  public searchPlants(userId: number): void {
    if (this.searchTerm.length > 1) {
      this.plantService.searchPlantsBySpecies(userId, this.searchTerm)
        .subscribe((response) => {
          this.plants = response;
        }, (error) => {
          console.error('Błąd pobierania roślin:', error);
        });
    }
  }
}
