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

  public constructor(
    private plantService: PlantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const plantId: number = Number(params['id']);
      this.plant = this.plantService.getPlantById(plantId);
    });
  }


  public goToEditForm(id: number | null): void {
    this.router.navigate(['/plants', id, 'form'], {
      relativeTo: this.route,
      queryParams: { test: '1' },
    });
  }


}
