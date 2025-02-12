import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../../service/plant.service';
import { Plant } from '../../../models/plant.model';

@Component({
  selector: 'app-detailed-plant',
  standalone: true,
  imports: [],
  templateUrl: './detailed-plant.component.html',
  styleUrl: './detailed-plant.component.scss'
})
export class DetailedPlantComponent implements OnInit {

  public plant: Plant | undefined;

  public constructor(
    private plantService: PlantService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const plantId: number = Number(params['id']);
      this.plant = this.plantService.getPlantById(plantId);
    });
  }

}
