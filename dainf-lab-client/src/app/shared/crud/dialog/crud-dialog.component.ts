import { CommonModule } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CrudConfig, Identifiable } from '../crud';

@Component({
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  selector: 'app-crud-dialog',
  templateUrl: 'crud-dialog.component.html',
})
export class CrudDialogComponent<T extends Identifiable> {
  visible = input<boolean>(false);
  config = input<CrudConfig<T>>();
  formTemplate = input<TemplateRef<any>>();

  visibleChange = output<boolean>();

  saveClick = output<void>();
  cancelClick = output<void>();

  save() {
    this.saveClick.emit();
  }

  cancel() {
    this.cancelClick.emit();
  }
}
