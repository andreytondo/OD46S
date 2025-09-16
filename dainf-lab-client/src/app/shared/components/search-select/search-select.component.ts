import { Identifiable } from '@/shared/crud/crud';
import { CrudService } from '@/shared/crud/crud.service';
import { Page, SearchFilter } from '@/shared/models/search';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { Observable, take, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-search-select',
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectComponent),
      multi: true,
    },
  ],
  template: `
    <p-autocomplete
      class="w-full"
      [(ngModel)]="value"
      [virtualScroll]="true"
      [suggestions]="suggestions()"
      [virtualScrollItemSize]="34"
      (completeMethod)="complete($event)"
      [dropdown]="true"
      [optionLabel]="optionLabel()"
      [placeholder]="placeholder()"
      (onSelect)="handleChange($event)"
      appendTo="body"
    />
  `,
})
export class SearchSelectComponent<T extends Identifiable>
  implements ControlValueAccessor
{
  placeholder = input<string>();
  optionLabel = input.required<string>();
  service = input.required<CrudService<T>>();
  filters = input<SearchFilter[]>();

  value?: T;
  disabled = false;
  suggestions = signal<any[]>([]);

  complete(event: AutoCompleteCompleteEvent) {
    this.search(event.query);
  }

  onChange: (value: T | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: T | string | null): void {
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

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleChange(event: any) {
    const val = event.value as T;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  search(query: string) {
    const filters = this._mapFilters(query);
    return this._search(filters)
      .pipe(
        tap((res) => this.suggestions.set(res.content)),
        take(1),
      )
      .subscribe();
  }

  private _search(filters: SearchFilter[]): Observable<Page<T>> {
    return this.service()!.search({
      page: 0,
      rows: 10,
      filters: filters || [],
    });
  }

  private _mapFilters(query: string): SearchFilter[] {
    return [
      ...(this.filters() ?? []),
      {
        field: this.optionLabel(),
        type: 'ILIKE',
        value: query,
      },
    ];
  }
}
