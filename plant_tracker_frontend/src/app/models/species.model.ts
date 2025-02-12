import {
  FormControl,
} from '@angular/forms';

export interface Species {
    readonly id: string | null,
    readonly name: string,
}

export interface SpeciesForm {
  readonly id: FormControl<string | null>;
  readonly name: FormControl<string | null>;
}
