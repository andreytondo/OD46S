import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator function
export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null; // allow empty value, use required validator separately
    }

    // Split by space to get first name and surname
    const parts = value.trim().split(' ');

    if (parts.length < 2) {
      return {
        name: 'Full name must contain at least first name and surname',
      };
    }

    const invalidParts = parts.filter(
      (part) => !/^[A-Z][a-z]+$/.test(part), // first letter uppercase, rest lowercase
    );

    return invalidParts.length > 0
      ? { name: 'Each part must start with uppercase letter' }
      : null;
  };
}
