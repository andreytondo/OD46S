import { Cidade } from '@/pages/cidade/cidade';
import { CidadeService } from '@/pages/cidade/cidade.service';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, OnInit, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-cidade-select',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CidadeSelectComponent),
      multi: true,
    },
  ],
  template: `
    <p-autocomplete
      [(ngModel)]="value"
      [virtualScroll]="true"
      [suggestions]="suggestions()"
      [virtualScrollItemSize]="34"
      (completeMethod)="complete($event)"
      [dropdown]="true"
      optionLabel="nome"
      placeholder="Selecione uma cidade"
      appendTo="body"
    />
  `,
})
export class CidadeSelectComponent implements ControlValueAccessor {
  value?: Cidade;
  disabled = false;
  suggestions = signal<any[]>([]);

  cidadeService = inject(CidadeService);

  complete(event: AutoCompleteCompleteEvent) {
    this.search(event.query);
  }

  onChange: (value: Cidade | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: Cidade | string | null): void {
    console.log(value);
    if (!value) {
      this.value = undefined;
      return;
    }

    if (typeof value !== 'string') {
      this.value = value;
      return;
    }

    this.search(value);
  }

  registerOnChange(fn: (value: Cidade | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleChange(event: any) {
    const val = event.value as Cidade;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  search(value: string) {
    this.cidadeService
      .search({
        page: 0,
        rows: 10,
        filters: [{ field: 'nome', type: 'ILIKE', value: value }],
      })
      .pipe(
        tap((res) => this.suggestions.set(res.content)),
        tap((res) => {
          if (res?.content.length === 1) {
            this.onChange(res.content[0]);
          }
        })
      )
      .subscribe();
  }
}
