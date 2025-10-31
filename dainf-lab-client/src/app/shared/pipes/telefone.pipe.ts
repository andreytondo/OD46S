import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    if (!value) return '';
    const digits = value.toString().replace(/\D/g, '');

    if (digits.length === 10) {
      // (99) 9999-9999
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (digits.length === 11) {
      // (99) 9 9999-9999
      return digits.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    }

    return value.toString();
  }
}
