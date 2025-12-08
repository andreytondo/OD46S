import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const cleanValue = value.toString().replace(/\D/g, '');

    // Verifica se tem 10 (Fixo) ou 11 (Celular) dígitos
    // Ex: 11 99999 9999 (11) ou 46 3222 1234 (10)
    const isValid = cleanValue.length === 10 || cleanValue.length === 11;

    return isValid ? null : { invalidPhone: true };
  };
}