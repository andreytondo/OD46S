import { Pipe, PipeTransform } from '@angular/core';
import { Identifiable } from '../crud/crud';

@Pipe({
  name: 'deepValue',
  standalone: true,
})
export class DeepValuePipe implements PipeTransform {
  transform<T extends Identifiable>(row: any, field: keyof T | string): any {
    if (!row || field == null) return null;

    const path = String(field).split('.');
    return path.reduce((acc: any, seg) => (acc ? acc[seg] : null), row);
  }
}
