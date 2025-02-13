import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../service/plant.service';
import {
  FormArray,
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
import { EventForm } from '../../../models/event.model';



@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.scss'
})
export class PlantFormComponent implements OnInit {

  public isEditMode: boolean = false;
  public species: Species[] = [];

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
      created: new FormControl<Date | null>(null),
      events: new FormArray<FormGroup<EventForm>>([])
    }, {updateOn: 'change'}
  );


  public ngOnInit(): void {
    this.loadSpecies();
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.isEditMode = true;
        this.loadPlantData(id);
      }
    });
  }

  private loadPlantData(id: number): void {
    this.plantService.getPlantById(id).subscribe((plant: Plant) => {
      this.plantService.loadSpecies().subscribe((res) => {

        this.species = res;
        this.plantForm.setValue({
          id: plant.id,
          name: plant.name,
          description: plant.description,
          species: plant.species 
            ? this.species.find((s) => s.id === plant.species!.id) || null
            : null,        
          lastWatered: plant.lastWatered,
          created: plant.created,
          events: []
        });
        console.log(plant.species, "GGGGGG" );
        
        plant.lastEvents.forEach((event) => {
          console.log(event, "EVVVENT");
          this.plantForm.controls.events.push(
            new FormGroup<EventForm>({
              idEvent: new FormControl(event.idEvent, Validators.required),
              type: new FormControl(event.type, Validators.required),
              date: new FormControl(event.date, Validators.required),
            })
          );
        });
        console.log(this.plantForm.getRawValue(), "HHHHH");


      },
      (error) => alert('There was an error while loading the plant: ' + error)
      );
    });
  }


  public get event(): FormArray<FormGroup<EventForm>> {
    return this.plantForm.controls.events as FormArray<FormGroup<EventForm>>;  }

  public addEvent(): void {
    this.plantForm.controls.events.push(
      new FormGroup<EventForm>({
        idEvent: new FormControl<number | null>(0, Validators.required),
        type: new FormControl<string | null>('', Validators.required),
        date: new FormControl<Date | null>(null, Validators.required),
      })
    );
  }

  public deleteEvent(index: number): void {
    this.plantForm.controls.events.removeAt(index);
  }



  public saveForm(): void {
    console.log("saveForm() wywołane!");
    if (this.plantForm.valid) {
      const plant: Plant = { 
        ...this.plantForm.getRawValue(),
        lastWatered: new Date(this.plantForm.getRawValue().lastWatered ?? new Date()),
        created:  new Date(),
        lastEvents: this.event.getRawValue().map((event) => ({
          idEvent: event.idEvent,
          type: event.type,
          date: new Date(event.date ?? new Date())
        }))
      };

      if (this.isEditMode) {
        this.plantService.updatePlant(plant, plant.id).subscribe((res) => {
          console.log(res);
          this.plantForm.reset();
          this.router.navigate(['/plants'], {});
        });
      } else {
        console.log(this.isEditMode);
        this.plantService.addPlant(plant).subscribe((res)=> {
          console.log(res);
          this.plantForm.reset();
          this.router.navigate(['/plants'], {});
        },
        (error) => alert('There was an error adding the plant: ' + error)
        );     
      }
    }
  }



  public loadSpecies(): void {
    this.plantService.loadSpecies().subscribe((res) => {
      console.log(res);
      this.species = res;
    },
    (error) => alert('There was an error while loading the plant: ' + error)
    );
  }

}


