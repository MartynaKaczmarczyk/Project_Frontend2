import {
  FormControl,
} from '@angular/forms';
import { Species } from './species.model';

export interface Plant {
    readonly id: number | null,
    readonly name: string | null,
    readonly description: string | null,

    readonly species: Species | null,
    readonly lastWatered: Date | null,
    readonly created: Date | null,
}

export interface PlantForm {
  readonly id: FormControl<number | null>;
  readonly name: FormControl<string | null>;
  readonly description: FormControl<string | null>;
  readonly species: FormControl<Species | null>;
  readonly lastWatered: FormControl<Date | null>;
  readonly created: FormControl<Date | null>;
}
