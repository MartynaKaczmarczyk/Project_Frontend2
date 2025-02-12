import { Component, OnInit } from '@angular/core';
import { Plant } from '../../../models/plant.model';
import { PlantService } from '../../../service/plant.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.scss'
})
export class PlantListComponent implements OnInit{
  public plants: Plant[] = [];

  public constructor(
    private plantService: PlantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loadPlants();
  }

  private loadPlants(): void {
    this.plantService.loadPlants().subscribe((res) => {
      console.log(res);
      this.plants = res;
    });

  }

  public goToDetails(id: number | null): void {
    this.router.navigate(['/plants', id, 'details'], {
      relativeTo: this.route,
      queryParams: { test: '1' },
    });
  }

  public deletePlant(id: number | null): void {
    this.plantService.deletePlant(id).subscribe((res) => {
      console.log(res);
      this.loadPlants(); 
    });
  }



}
