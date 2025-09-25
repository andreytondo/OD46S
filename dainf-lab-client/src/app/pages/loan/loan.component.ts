import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../category/category.service';
import { Loan, LoanItem, LoanStatus } from './loan';
import { LoanService } from './loan.service';
import { LabelValue } from '@/shared/models/label-value';
import { LabelValuePipe } from '@/shared/pipes/label-value.pipe';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';
import { Fieldset } from 'primeng/fieldset';
import { StaticSelectComponent } from '@/shared/components/static-select/static-select.component';
import { ItemService } from '../item/item.service';
import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { InputNumber } from 'primeng/inputnumber';
import { UserService } from '../user/user.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputContainerComponent,
    Fieldset,
    SubItemFormComponent,
    StaticSelectComponent,
    CrudComponent,
    SearchSelectComponent,
    InputNumber
],
  providers: [LoanService, CategoryService, LabelValuePipe, ItemService, UserService],
  selector: 'app-item',
  templateUrl: 'loan.component.html',
})
export class LoanComponent {
  loanService = inject(LoanService);
  formBuilder = inject(FormBuilder);
  labelValue = inject(LabelValuePipe);
  itemService = inject(ItemService);
  userService = inject(UserService);

  config: CrudConfig<Loan> = {
    title: 'Empréstimos',
  };

  /** forms */
  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    borrower: [null],
    loanDate: [null],
    deadline: [null],
    devolutionDate: [null],
    observation: [null],
    raSiape: [null],
    items: [null],
  });

  loanItensForm: FormGroup = this.formBuilder.group({
    id: [null],
    loan: [null],
    item: [null],
    shouldReturn: [false],
    quantity: [1],
    status: [null],
  });

  /** options */
  loanStatusOptions: LabelValue<LoanStatus>[] = [
    { label: 'Em andamento', value: 'PENDENTE' },
    { label: 'Atrasado', value: 'ATRASADO' },
    { label: 'Devolvido', value: 'DEVOLVIDO' },
  ];

  /** cols */
  cols: Column<Loan>[] = [
    { field: 'id', header: 'Código' },
    { field: 'borrower.nome', header: 'Mutuário' },
    { field: 'raSiape', header: 'RA/SIAPE' },
  ];

  itensCols: Column<LoanItem>[] = [
    { field: 'item.name', header: 'Nome' },
    { field: 'quantity', header: 'Quantidade' },
    {
      field: 'status',
      header: 'Status',
      transform: (row) =>
        this.labelValue.transform(row.status, this.loanStatusOptions),
    },
  ];
}
