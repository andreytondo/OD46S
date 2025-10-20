import { LabelValue } from '@/shared/models/label-value';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-static-select',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StaticSelectComponent),
      multi: true,
    },
  ],
  template: `
    <p-select
      class="w-full"
      [options]="options()"
      [(ngModel)]="value"
      (onChange)="onChange($event.value)"
      [placeholder]="placeholder()"
      optionLabel="label"
      optionValue="value"
      appendTo="body"
      [disabled]="disabled"
    >
    </p-select>
  `,
})
export class StaticSelectComponent implements ControlValueAccessor {
  placeholder = input<string>('Selecione uma opção');
  options = input<LabelValue[]>([]);

  value?: any;
  disabled = false;

  onChange: (value: any | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any | null): void {
    this.value = value ?? undefined;
  }

  registerOnChange(fn: (value: any | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleChange(event: any) {
    const val = event.value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}
