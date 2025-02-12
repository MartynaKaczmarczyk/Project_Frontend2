import {
  FormControl,
} from '@angular/forms';
import { Species } from './species.model';

export interface Plant {
    readonly id: number | null,
    readonly name: string,
    readonly description: string,

    readonly species: Species,
    readonly lastWatered: Date,
    readonly created: Date,
}

export interface PlantForm {
  readonly id: FormControl<number | null>;
  readonly name: FormControl<string | null>;
}
