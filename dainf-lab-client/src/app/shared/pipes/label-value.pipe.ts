import { LabelValue } from '@/shared/models/label-value';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelValue',
  standalone: true,
})
export class LabelValuePipe implements PipeTransform {
  transform(value: any, options: LabelValue[]): string {
    return options?.find((option) => option.value === value)?.label || '';
  }
}
