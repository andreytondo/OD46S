import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { StaticSelectComponent } from '@/shared/components/static-select/static-select.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { LabelValue } from '@/shared/models/label-value';
import { SearchFilter, SearchRequest } from '@/shared/models/search';
import { LabelValuePipe } from '@/shared/pipes/label-value.pipe';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, model, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset'; 
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../category/category.service';
import { ItemService } from '../item/item.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Loan, LoanItem, LoanStatus } from './loan';
import { LoanService } from './loan.service';
import { Router } from '@angular/router'; 
import { DatePickerModule } from 'primeng/datepicker'; 

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputContainerComponent,
    FieldsetModule,
    SubItemFormComponent,
    StaticSelectComponent,
    CrudComponent,
    SearchSelectComponent,
    InputNumberModule,
    DatePickerModule,
  ],
  providers: [
    LoanService,
    CategoryService,
    LabelValuePipe,
    ItemService,
    UserService,
  ],
  selector: 'app-loan',
  templateUrl: 'loan.component.html',
})

export class LoanComponent implements AfterViewInit {
  loanService = inject(LoanService);
  formBuilder = inject(FormBuilder);
  labelValue = inject(LabelValuePipe);
  itemService = inject(ItemService);
  userService = inject(UserService);
  router = inject(Router); 

  @ViewChild('crud') crudComponent!: CrudComponent<Loan>;
  
  private receivedData: any;

  config: CrudConfig<Loan> = {
    title: 'Empréstimos',
  };

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    borrower: [null],
    loanDate: [new Date()],
    deadline: [null],
    devolutionDate: [null],
    observation: [null],
    raSiape: [null],
    items: [[]],
  });

  loanItensForm: FormGroup = this.formBuilder.group({
    id: [null],
    loan: [null],
    item: [null],
    shouldReturn: [false],
    quantity: [1],
    status: ['PENDENTE'],
  });

  loanStatusOptions: LabelValue<LoanStatus>[] = [
    { label: 'Em andamento', value: 'PENDENTE' },
    { label: 'Atrasado', value: 'ATRASADO' },
    { label: 'Devolvido', value: 'DEVOLVIDO' },
  ];

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

  loanDateFilter = model<string | undefined>();
  borrowerFilter = model<User | undefined>();
  raSiapeFilter = model<string | undefined>();
  statusFilter = model<string | undefined>();
  searchRequest = computed<SearchRequest>(() => {
    const filters: SearchFilter[] = [];

    if (this.loanDateFilter()) {
      filters.push({
        field: 'loanDate',
        value: this.loanDateFilter(),
        type: 'EQUALS',
      });
    }
    if (this.borrowerFilter()) {
      filters.push({
        field: 'borrower.id',
        value: this.borrowerFilter()?.id,
        type: 'EQUALS',
      });
    }
    if (this.raSiapeFilter()) {
      filters.push({
        field: 'borrower.documento',
        value: this.raSiapeFilter(),
        type: 'ILIKE',
      });
    }
    if (this.statusFilter()) {
      filters.push({
        field: 'status',
        value: this.statusFilter(),
        type: 'EQUALS',
      });
    }
    return <SearchRequest>{ filters };
  });

  constructor() {
    this.receivedData = history.state?.['data'];

  }

  ngAfterViewInit(): void {

    if (this.receivedData) {
      this.form.patchValue({
        borrower: this.receivedData.borrower,
        raSiape: this.receivedData.raSiape,
        items: this.receivedData.items,
      });
    }
  }
}