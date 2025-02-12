import {
  FormControl,
} from '@angular/forms';

export interface Species {
    readonly id: number | null,
    readonly name: string,
}

export interface SpeciesForm {
  readonly id: FormControl<string | null>;
  readonly name: FormControl<string | null>;
}
