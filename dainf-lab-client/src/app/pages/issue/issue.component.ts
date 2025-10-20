import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';

import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';

import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';

import { Issue, IssueItem } from './issue';
import { IssueService } from './issue.service';

import { LoanService } from '../loan/loan.service';
import { UserService } from '../user/user.service';

import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CrudComponent,
    InputContainerComponent,
    InputTextModule,
    InputNumberModule,
    FieldsetModule,
    SubItemFormComponent,
    DatePickerModule,
    SearchSelectComponent,
    TextareaModule,
  ],
  providers: [IssueService, LoanService, UserService, DatePipe, ItemService],
  selector: 'app-issue',
  templateUrl: 'issue.component.html',
})
export class IssueComponent {
  issueService = inject(IssueService);
  userService = inject(UserService);
  itemService = inject(ItemService);
  loanService = inject(LoanService);
  formBuilder = inject(FormBuilder);
  datePipe = inject(DatePipe);

  config: CrudConfig<Issue> = {
    title: 'Saídas de Estoque',
  };

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    date: [new Date(), Validators.required],
    user: [null, Validators.required],
    loan: [null],
    observation: [null],
    items: [[], Validators.required],
  });

  issueItemForm: FormGroup = this.formBuilder.group({
    id: [null],
    item: [null, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
  });

  cols: Column<Issue>[] = [
    { field: 'id', header: 'Código' },
    {
      field: 'date',
      header: 'Data da Saída',
      transform: (row) => this.datePipe.transform(row.date, 'dd/MM/yyyy') || '',
    },
    { field: 'user.nome', header: 'Responsável' },
    { field: 'observation', header: 'Observações' },
  ];

  issueItemCols: Column<IssueItem>[] = [
    { field: 'item.name', header: 'Item' },
    { field: 'quantity', header: 'Quantidade' },
  ];

  onEntityLoad(issue: Issue) {
    this.form.patchValue({
      date: new Date(issue.date),
    });
  }
}
