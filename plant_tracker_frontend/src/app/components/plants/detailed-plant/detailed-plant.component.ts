import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../../../service/plant.service';
import { Plant } from '../../../models/plant.model';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-detailed-plant',
  standalone: true,
  imports: [RouterModule, ModalComponent],
  templateUrl: './detailed-plant.component.html',
  styleUrl: './detailed-plant.component.scss'
})
export class DetailedPlantComponent implements OnInit {

  public plant: Plant | undefined;
  public errorMessage: string = '';
  public showModal:boolean = false;
  public selectedPlantId: number | null = null;


  public constructor(
    private plantService: PlantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const plantId: number = Number(params['id']);
      this.plantService.getPlantById(plantId).subscribe(
        (res) => {
          this.plant = res;
        },
        (error) => {
          console.error(`Error occurred while fetching plant with ID ${plantId}:`, error);
          this.errorMessage = `Failed to load plant details, please try again later.`;
        }
      );
    });
  }

  public goToEditForm(id: number | null): void {
    this.router.navigate(['/plants', id, 'form'], {
      relativeTo: this.route,
      queryParams: { test: '1' },
    });
  }

  public onDeleteClick(id: number | null): void {
    this.selectedPlantId = id;
    this.showModal = true; 
  }

  public deletePlant(id: number | null): void {
    this.plantService.deletePlant(id).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/plants'], {});
      },
      (error) => {
        console.error(`Error occurred while deleting plant with ID ${id}:`, error);
        this.errorMessage = `Failed to delete plant with ID ${id}, please try again later.`;
      }
    );
  }

  public onConfirmDelete(): void {
    if (this.selectedPlantId !== null) {
      this.deletePlant(this.selectedPlantId);
    }
    this.showModal = false; 
  }

 
  public onCancelDelete(): void {
    this.showModal = false; 
  }

  public getFormattedDate(lastWatered: Date | null): string {
    if (lastWatered) {
      return new Date(lastWatered).toISOString().split('T')[0]; // Formatowanie daty
    }

    return ''; 
  }
}
