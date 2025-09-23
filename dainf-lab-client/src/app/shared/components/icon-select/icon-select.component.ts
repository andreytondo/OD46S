import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { SelectModule } from 'primeng/select';

@Component({
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule],
  selector: 'app-icon-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconSelectComponent),
      multi: true,
    },
  ],
  template: `
    <p-select
      class="w-full"
      [options]="icons"
      [(ngModel)]="value"
      [filter]="true"
      [showClear]="true"
      placeholder="Selecione um ícone"
      (onChange)="onChange(value)"
      appendTo="body"
    >
      <ng-template pTemplate="selectedItem" let-selected>
        @if (selected) {
          <div class="flex items-center gap-2">
            <i [class]="'pi ' + selected.value"></i>
            <span>{{ selected.label }}</span>
          </div>
        }
      </ng-template>

      <ng-template let-option pTemplate="item">
        <div class="flex items-center gap-2">
          <i [class]="'pi ' + option.value"></i>
          <span>{{ option.label }}</span>
        </div>
      </ng-template>
    </p-select>
  `,
})
export class IconSelectComponent implements ControlValueAccessor {
  value: string | null = null;

  icons = Object.keys(PrimeIcons).map((key) => {
    const value = (PrimeIcons as any)[key] as string;
    return {
      label: key.replace(/_/g, ' '),
      value,
    };
  });

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(val: string | null): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
