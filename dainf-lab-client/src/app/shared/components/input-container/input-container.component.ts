import { CommonModule } from '@angular/common';
import { Component, computed, contentChild, input } from '@angular/core';
import { NgControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-input-container',
  template: `
    <div class="flex flex-col gap-1">
      <label class="block font-bold">
        {{ label() }}
        @if (required()) {
          <span class="text-red-500">*</span>
        }
      </label>

      <ng-content></ng-content>

      @if (control()?.invalid && (control()?.touched || control()?.dirty)) {
        <div class="text-sm text-red-500">
          @if (control()?.errors) {
            @for (error of errorMessages(); track $index) {
              <div>{{ error }}</div>
            }
          }
        </div>
      }
    </div>
  `,
})
export class InputContainerComponent {
  label = input<string>();
  ngControl = contentChild(NgControl, { read: NgControl });

  control = computed(() => this.ngControl()?.control);

  required = computed(() => {
    const control = this.control();
    if (!control) return false;
    const validators: ValidatorFn[] =
      (control.validator && (control.validator as any)?.validators) || [];
    if (control.validator && (control.validator as any).validators) {
      return (control.validator as any).validators.some(
        (v: ValidatorFn) => v === Validators.required,
      );
    }
    return !!control.hasValidator?.(Validators.required);
  });

  errorMessages = () => {
    const control = this.control();
    if (!control || !control.errors) return [];
    const errors = control.errors;
    const messages: string[] = [];
    if (errors['required']) messages.push('Campo obrigatório.');
    if (errors['email']) messages.push('E-mail inválido.');
    if (errors['minlength'])
      messages.push(
        `Mínimo de ${errors['minlength'].requiredLength} caracteres.`,
      );
    if (errors['maxlength'])
      messages.push(
        `Máximo de ${errors['maxlength'].requiredLength} caracteres.`,
      );
    if (errors['pattern']) messages.push('Formato inválido.');
    return messages;
  };
}
