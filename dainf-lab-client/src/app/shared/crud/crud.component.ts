import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Component, input, OnInit, signal, TemplateRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Column, CrudConfig } from './crud';
import { CrudService } from './crud.service';
import { ButtonModule } from 'primeng/button';
import { CrudTableComponent } from './table/crud-table.component';
import { CrudDialogComponent } from './dialog/crud-dialog.component';
import { tap } from 'rxjs';

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
}
