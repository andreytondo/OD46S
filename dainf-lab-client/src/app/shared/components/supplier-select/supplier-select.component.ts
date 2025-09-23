import { Component, forwardRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable, map } from 'rxjs';

// Models e Services
import { FornecedorService } from '@/pages/supplier/fornecedor.service';
import { Fornecedor } from '@/pages/supplier/fornecedor';

// Imports de PrimeNG (ajustado para SelectModule)
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-supplier-select',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule], // Módulo atualizado
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SupplierSelectComponent),
      multi: true,
    },
  ],
  // O template agora usa o componente <p-select>
  template: `
    <p-select
      [options]="(fornecedores$ | async) || []"
      [(ngModel)]="value"
      (onChange)="onChange($event.value)"
      (onBlur)="onTouched()"
      optionLabel="nomeFantasia"
      placeholder="Selecione um fornecedor"
      [showClear]="true"
      [filter]="true"
      filterBy="nomeFantasia,razaoSocial,cnpj"
      styleClass="w-full"
      [disabled]="disabled"
    >
      <ng-template let-supplier pTemplate="item">
        <div>
          <div>{{ supplier.nomeFantasia }}</div>
          <small class="text-gray-500">{{ supplier.razaoSocial }}</small>
        </div>
      </ng-template>
    </p-select>
  `,
})
export class SupplierSelectComponent implements OnInit, ControlValueAccessor {
  fornecedorService = inject(FornecedorService);
  fornecedores$!: Observable<Fornecedor[]>;

  value: Fornecedor | null = null;
  disabled: boolean = false;

  onChange: (value: Fornecedor | null) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.fornecedores$ = this.fornecedorService
      .search({ page: 0, rows: 1000 })
      .pipe(map((page) => page.content));
  }

  writeValue(value: Fornecedor | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Fornecedor | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
