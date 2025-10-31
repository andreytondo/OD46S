import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    if (!value) return '';
    const digits = value.toString().replace(/\D/g, '');
    if (digits.length !== 11) return value.toString();

    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
