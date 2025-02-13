import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../../../service/plant.service';
import { Plant } from '../../../models/plant.model';

@Component({
  selector: 'app-detailed-plant',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detailed-plant.component.html',
  styleUrl: './detailed-plant.component.scss'
})
export class DetailedPlantComponent implements OnInit {

  public plant: Plant | undefined;
  public errorMessage: string = '';

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
}
