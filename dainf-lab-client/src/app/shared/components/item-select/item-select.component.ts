import { Component, forwardRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable, map } from 'rxjs';

import { SelectModule } from 'primeng/select';

import { Item } from '@/pages/item/item';
import { ItemService } from '@/pages/item/item.service';

@Component({
  selector: 'app-item-select',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectComponent),
      multi: true,
    },
    ItemService,
  ],
  template: `
    <!-- 
      Corrigido: Adicionado '?? []' para garantir que a propriedade 'options' 
      receba um array vazio em vez de 'null' enquanto o Observable não emite um valor.
    -->
    <p-select
      [options]="(items$ | async) ?? []"
      [(ngModel)]="value"
      (onChange)="onChange(value)"
      (onBlur)="onTouched()"
      [disabled]="disabled"
      optionLabel="name"
      placeholder="Selecione um Item"
      [filter]="true"
      filterBy="name"
      styleClass="w-full"
    >
      <ng-template pTemplate="item" let-item>
        <div class="flex flex-col">
          <strong>{{ item.name }}</strong>
          <small class="text-gray-500">{{ item.description }}</small>
        </div>
      </ng-template>
    </p-select>
  `,
})
export class ItemSelectComponent implements OnInit, ControlValueAccessor {
  itemService = inject(ItemService);
  items$!: Observable<Item[]>;

  value: Item | null = null;
  disabled: boolean = false;

  onChange: (value: Item | null) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.items$ = this.itemService
      .search({ page: 0, rows: 1000 })
      .pipe(map((page) => page.content));
  }

  writeValue(value: Item | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Item | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

