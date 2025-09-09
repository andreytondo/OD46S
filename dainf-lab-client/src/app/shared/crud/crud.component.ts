import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { catchError, Observable, pipe, take, tap, throwError } from 'rxjs';
import { Column, CrudConfig, Identifiable } from './crud';
import { CrudService } from './crud.service';
import { CrudDialogComponent } from './dialog/crud-dialog.component';
import { CrudTableComponent } from './table/crud-table.component';
import { Page, SearchRequest } from '../models/search';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    CrudTableComponent,
    CrudDialogComponent,
    ToastModule,
  ],
  selector: 'app-crud',
  templateUrl: 'crud.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CrudComponent<T extends Identifiable> implements OnInit {
  service = input.required<CrudService<T>>();
  columns = input<Column<T>[]>([]);
  config = input<CrudConfig<T>>();
  globalFilterFields = input<string[]>([]);
  form = input<FormGroup>();

  templateMap = input<Map<string, TemplateRef<any>>>(new Map());
  actionsTemplate = input<TemplateRef<any>>();
  formTemplate = input<TemplateRef<any>>();

  cancelClick = output<void>();
  saveClick = output<void>();
  entityLoad = output<T>();

  items = signal<Page<T> | undefined>(undefined);
  dialogVisible = signal<boolean>(false);

  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this._loadItems()
      .pipe(tap((result) => this.items.set(result)))
      .subscribe();
  }

  openNew() {
    this.dialogVisible.set(true);
  }

  exportCSV() {}

  save() {
    if (this.form()?.invalid) {
      this.form()!.markAllAsTouched();
      this.form()!.markAllAsDirty();
      return;
    }

    const item: T = this.form()?.getRawValue();
    this._save(item)
      ?.pipe(
        tap(() => {
          this.cancel();
          this.loadItems();
          this.saveClick.emit();
        }),
        catchError((error) => {
          this._showWarn(`Falha ao salvar o registro: ${error.error.message}`);
          return throwError(() => error);
        }),
        take(1),
      )
      .subscribe();
  }

  edit(item: T) {
    this.service()
      .get(item.id)
      .pipe(
        tap((item: T) => {
          this.form()?.patchValue(item as { [key: string]: any });
          this.entityLoad.emit(item);
          this.dialogVisible.set(true);
        }),
        take(1),
      )
      .subscribe();
  }

  deleteOne(item: T) {
    this.service()
      .delete(item.id)
      .pipe(
        tap(() => this.loadItems()),
        catchError((error) => {
          this._showWarn(`Falha ao deletar o registro: ${error.error.message}`);
          return throwError(() => error);
        }),
        take(1),
      )
      .subscribe();
    this.cancel();
  }

  cancel() {
    this.dialogVisible.set(false);
    this.form()?.reset();
    this.cancelClick.emit();
  }

  onPage(event: { page: number; size: number }) {
    this._loadItems({ page: event.page, rows: event.size })
      .pipe(tap((result) => this.items.set(result)))
      .subscribe();
  }

  private _showWarn(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção!',
      detail: detail,
    });
  }

  private _save(item: T): Observable<any> {
    const isUpdate = !!item.id;
    return isUpdate
      ? this.service().update(item.id, item)
      : this.service().create(item);
  }

  private _loadItems(request?: SearchRequest): Observable<Page<T>> {
    const req = this._mapRequest(request);
    return this.service().search(req);
  }

  private _mapRequest(request?: SearchRequest): SearchRequest {
    const base = this.baseRequest;
    return {
      filters: request?.filters ?? base.filters,
      sort: request?.sort ?? base.sort,
      page: request?.page ?? base.page,
      rows: request?.rows ?? base.rows,
    };
  }

  private get baseRequest() {
    return {
      filters: [],
      sort: { field: 'id', type: 'ASC' as const },
      page: 0,
      rows: 10,
    };
  }
}
