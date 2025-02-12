import {
  FormControl,
} from '@angular/forms';

export interface Event {
    readonly idEvent: number | null,
    readonly type: string | null,
    readonly date: Date | null,
}

export interface EventForm {
  readonly idEvent: FormControl<number | null>;
  readonly type: FormControl<string | null>;
  readonly date: FormControl<Date | null>;
}