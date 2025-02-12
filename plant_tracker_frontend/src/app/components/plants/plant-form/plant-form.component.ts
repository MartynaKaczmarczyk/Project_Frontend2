import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../service/plant.service';
import {
  //FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlantForm } from '../../../models/plant.model';
import { Plant } from '../../../models/plant.model';
import { Species } from '../../../models/species.model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.scss'
})
export class PlantFormComponent implements OnInit {

  public isEditMode: boolean = false;

  public constructor(
    private plantService: PlantService, 
    private router: Router,
    private route: ActivatedRoute ,
  ) {}

  public plantForm: FormGroup<PlantForm> = new FormGroup<PlantForm>(
    {
      id: new FormControl<number | null>(0),      
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      species: new FormControl<Species | null>(null),
      lastWatered: new FormControl<Date | null>(null),
      created: new FormControl<Date | null>(null)
    }, {updateOn: 'change'}
  );

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.isEditMode = true;
        // this.loadPlantData(id);
      }
    });
  }

  // private loadPlantData(id: number): void {
  //   this.plantService.getPlantById(id)?.subscribe((plant: Plant) => {
  //     this.plantForm.setValue({
  //       id: plant.id,
  //       name: plant.name,
  //       description: plant.description,
  //       species: plant.species,
  //       lastWatered: plant.lastWatered,
  //       created: plant.created,
  //     });
  //   });
  // }

  public saveForm(): void {
    if (this.plantForm.valid) {
      console.log("Udało sie :)");
      const rawValue = this.plantForm.getRawValue();
      const plant: Plant = {
        id: rawValue.id,
        name: rawValue.name,
        description: rawValue.description,
        species: rawValue.species, 
        lastWatered: rawValue.lastWatered, 
        created: rawValue.created
      };
      this.plantService.addPlant(plant);
      this.plantForm.reset();

      this.router.navigate(['/plants'], {});
    }
  }

}


