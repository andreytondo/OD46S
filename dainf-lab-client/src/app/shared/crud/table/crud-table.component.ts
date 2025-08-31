import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  TemplateRef
} from '@angular/core';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';
import { Column, CrudConfig } from '../crud';

@Component({
  selector: 'app-crud-table',
  templateUrl: 'crud-table.component.html',
  imports: [CommonModule, TableModule, IconField, InputIcon, Button],
})
export class CrudTableComponent<T = any> {
  columns = input<Column<T>[]>([]);
  config = input<CrudConfig<T>>();
  globalFilterFields = input<string[]>([]);
  templateMap = input<Map<string, TemplateRef<any>>>(new Map());
  actionsTemplate = input<TemplateRef<any>>();
  items = input<T[]>([]);

  onEdit = output<T>();
  onDeleteOne = output<T>();

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getValue(row: any, field: string | keyof T) {
    const path = String(field).split('.');
    return path.reduce((acc: any, seg) => (acc ? acc[seg] : null), row);
  }

  edit(row: T) {
    this.onEdit.emit(row);
  }

  deleteOne(row: T) {
    this.onDeleteOne.emit(row);
  }
}
