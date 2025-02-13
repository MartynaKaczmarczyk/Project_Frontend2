import {
  FormControl,
} from '@angular/forms';

export interface LoginForm {
    readonly username: FormControl<string | null>
    readonly password: FormControl<string | null>;
  }