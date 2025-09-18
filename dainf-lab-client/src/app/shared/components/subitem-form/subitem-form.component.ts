import { Column, Identifiable } from '@/shared/crud/crud';
import { DeepValuePipe } from '@/shared/pipes/deep-value.pipe';
import { CommonModule } from '@angular/common';
import {
  Component,
  contentChild,
  forwardRef,
  input,
  signal
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  selector: 'app-subitem-form',
  templateUrl: './subitem-form.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    Button,
    DeepValuePipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubItemFormComponent),
      multi: true,
    },
  ],
})
export class SubItemFormComponent<T extends Identifiable> implements ControlValueAccessor {
  formTemplate: any = contentChild('formTemplate');
  columns = input<Column<T>[]>([]);
  form = input.required<FormGroup>();

  items = signal<any[]>([]);
  editing = signal(false);
  editingIndex: number | null = null;

  onChange: (value: any[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any[]): void {
    this.items.set(value ?? []);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form()?.disable();
    } else {
      this.form()?.enable();
    }
  }

  edit(index: number): void {
    this.editingIndex = index;
    this.form().patchValue(this.items()[index]);
    this.editing.set(true);
  }

  save(): void {
    if (this.form()?.invalid) {
      this.form()!.markAllAsTouched();
      this.form()!.markAllAsDirty();
      return;
    }

    const value = this.form().getRawValue();
    if (this.editingIndex != null) {
      const arr = [...this.items()];
      arr[this.editingIndex] = value;
      this.items.set(arr);
    } else {
      this.items.update((list) => [...list, value]);
    }

    this.form().reset();
    this.onChange(this.items());
    this.editing.set(false);
    this.editingIndex = null;
  }

  cancel(): void {
    this.editing.set(false);
    this.editingIndex = null;
  }

  remove(index: number): void {
    this.items.update((list) => list.filter((_, i) => i !== index));
    this.onChange(this.items());
  }
}
