import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, TemplateRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CrudConfig } from '../crud';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  selector: 'app-crud-dialog',
  templateUrl: 'crud-dialog.component.html',
})
export class CrudDialogComponent<T = any> {
  visible = input<boolean>(false);
  config = input<CrudConfig<T>>();
  formTemplate = input<TemplateRef<any>>();

  visibleChange = output<boolean>();

  saveClick = output<void>();
  cancelClick = output<void>();

  cancel() {
    this.cancelClick.emit();
    this.visibleChange.emit(false);
  }
}
