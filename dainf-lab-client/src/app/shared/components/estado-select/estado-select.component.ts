import { UnidadeFederativa } from '@/shared/models/unidade-federativa';
import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-estado-select',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EstadoSelectComponent),
      multi: true,
    },
  ],
  template: `
    <p-select
      [options]="estados"
      [(ngModel)]="value"
      (onChange)="onChange($event.value)"
      placeholder="Selecione um estado"
      optionLabel="label"
      optionValue="value"
      [showClear]="true"
      appendTo="body"
    >
    </p-select>
  `,
})
export class EstadoSelectComponent implements ControlValueAccessor {
  value?: UnidadeFederativa;
  disabled = false;

  estados: { label: string; value: UnidadeFederativa }[] = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
  ];

  onChange: (value: UnidadeFederativa | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: UnidadeFederativa | null): void {
    this.value = value ?? undefined;
  }

  registerOnChange(fn: (value: UnidadeFederativa | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleChange(event: any) {
    const val = event.value as UnidadeFederativa;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}
