import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  OnInit,
  signal,
  TemplateRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { tap } from 'rxjs';
import { Column, CrudConfig } from './crud';
import { CrudService } from './crud.service';
import { CrudDialogComponent } from './dialog/crud-dialog.component';
import { CrudTableComponent } from './table/crud-table.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    CrudTableComponent,
    CrudDialogComponent,
  ],
  selector: 'app-crud',
  templateUrl: 'crud.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CrudComponent<T = any> implements OnInit {
  columns = input<Column<T>[]>([]);
  service = input<CrudService<T>>();
  config = input<CrudConfig<T>>();
  globalFilterFields = input<string[]>([]);
  form = input<FormGroup>();

  templateMap = input<Map<string, TemplateRef<any>>>(new Map());
  actionsTemplate = input<TemplateRef<any>>();
  formTemplate = input<TemplateRef<any>>();

  items = signal<T[]>([]);
  dialogVisible = signal<boolean>(false);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.service()
      ?.search({
        filters: [],
        sort: { field: 'id', type: 'ASC' },
        page: 0,
        rows: 10,
      })
      .pipe(tap((result) => this.items.set(result.content)))
      .subscribe();
  }

  openNew() {
    this.dialogVisible.set(true);
  }

  exportCSV() {}


  save() {
    this.dialogVisible.set(false);
    this.form()?.reset();
  }

  cancel() {
    this.dialogVisible.set(false);
    this.form()?.reset();
  }
}
