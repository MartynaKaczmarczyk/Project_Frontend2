import { Component, OnInit } from '@angular/core';
import { Plant } from '../../../models/plant.model';
import { PlantService } from '../../../service/plant.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Species } from '../../../models/species.model';

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
  private searchBy: number = Number(localStorage.getItem('userId')) || 0;
  public species: Species[] = [];
  public selectedSpecies: string[] = [];
  public sortOrder: string = 'asc';

  public constructor(
    private plantService: PlantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loadPlants();
    this.plantService.loadSpecies().subscribe((data) => {
      this.species = data;  
    });
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


  public searchPlants(): void {
    if (this.searchTerm.length > 1) {
      this.plantService.searchPlantsBySpecies(this.searchBy, this.searchTerm)
        .subscribe((response) => {
          this.plants = response;
        }, (error) => {
          console.error('Błąd pobierania roślin:', error);
        });
    }
  }

  public onSpeciesChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSpecies.push(checkbox.value);  
    } else {
      const index = this.selectedSpecies.indexOf(checkbox.value);
      if (index > -1) {
        this.selectedSpecies.splice(index, 1);  
      }
    }
  }

  public filterBySpecies(): void {
    if (this.selectedSpecies.length > 0) {
      this.plantService.filterBySpecies(this.searchBy, this.selectedSpecies).subscribe((plants) => {
        console.log('Filtered plants:', plants);
        this.plants = plants;      
      });
    } else {
      console.log('No filters applied');
      this.loadPlants();
    }
  }

  public toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortByLastWatered();  
  }

  public sortByLastWatered(): void {
    this.plantService.sortByLastWateredDate(this.searchBy, this.sortOrder).subscribe(
      (data) => {
        this.plants = data;
      },
      (error) => {
        console.error('Błąd podczas pobierania roślin', error);
      }
    );
  }
}
