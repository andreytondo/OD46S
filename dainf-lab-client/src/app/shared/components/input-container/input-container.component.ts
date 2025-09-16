import { CommonModule } from '@angular/common';
import { Component, computed, contentChild, input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-input-container',
  template: `
    <div class="flex flex-col gap-1">
      <label class="block font-bold">
        {{ label() || '&#8203;' }}
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
    return control.errors?.['required'] === true;
  });

  errorMessages = computed(() => {
    const control = this.control();
    if (!control || !control.errors) return [];
    return Object.entries(control.errors)
      .filter(([key]) => key in errorMap)
      .map(([key, error]) => errorMap[key](error));
  });
}

const errorMap: Record<string, (error: any) => string> = {
  required: () => 'Campo obrigatório.',
  email: () => 'E-mail inválido.',
  minlength: (e) => `Mínimo de ${e.requiredLength} caracteres.`,
  maxlength: (e) => `Máximo de ${e.requiredLength} caracteres.`,
  pattern: () => 'Formato inválido.',
};
