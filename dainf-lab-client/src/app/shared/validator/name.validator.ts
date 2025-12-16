import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null; // use Validators.required separately
    }

    const parts = value.trim().split(/\s+/);

    return parts.length >= 2
      ? null
      : { name: 'Deve conter nome e sobrenome' };
  };
}
