import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { StaticSelectComponent } from '@/shared/components/static-select/static-select.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { LabelValue } from '@/shared/models/label-value';
import { SearchFilter, SearchRequest } from '@/shared/models/search';
import { LabelValuePipe } from '@/shared/pipes/label-value.pipe';
import { ContextStore } from '@/shared/store/context-store.service';
import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogService } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CategoryService } from '../category/category.service';
import { ItemService } from '../item/item.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Loan, LoanItem, LoanStatus } from './loan';
import { LoanService } from './loan.service';
import { LoanReturnDialog } from './return-dialog/return-dialog';

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
    TextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
  ],
  providers: [
    LoanService,
    CategoryService,
    LabelValuePipe,
    ItemService,
    UserService,
    DialogService,
    DatePipe
  ],
  selector: 'app-loan',
  templateUrl: 'loan.component.html',
})
export class LoanComponent implements OnInit {
  loanService = inject(LoanService);
  dialogService = inject(DialogService);
  formBuilder = inject(FormBuilder);
  labelValue = inject(LabelValuePipe);
  itemService = inject(ItemService);
  userService = inject(UserService);
  context = inject(ContextStore);
  datePipe = inject(DatePipe);

  crud = viewChild(CrudComponent);
  subItem = viewChild(SubItemFormComponent);

  disabled = signal(false);

  config: CrudConfig<Loan> = {
    title: 'Empréstimos',
  };

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    borrower: [null, Validators.required],
    loanDate: [new Date(), Validators.required],
    deadline: [null, Validators.required],
    observation: [null],
    items: [[]],
  });

  loanItensForm: FormGroup = this.formBuilder.group({
    id: [null],
    item: [null, Validators.required],
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
    { field: 'loanDate', header: 'Data do empréstimo', transform: (row) => this.datePipe.transform(row.loanDate, 'dd/MM/yyyy') || '' },
    { field: 'deadline', header: 'Prazo de devolução', transform: (row) => this.datePipe.transform(row.deadline, 'dd/MM/yyyy') || '' },
    { field: 'status', header: 'Status' },
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

  ngOnInit(): void {
    const data = this.context.consume('reservation');
    if (data) {
      this.crud()?.openNew();
      this.form.patchValue({ items: data.items, borrower: data.borrower });
    }
  }

  onEntityLoad(loan: Loan) {
    this.form.patchValue({
      loanDate: new Date(loan.loanDate),
      deadline: new Date(loan.deadline),
    });

    setTimeout(() => {
      this.loanItensForm.disable();
      this.form.get('borrower')?.disable();

      this.loanItensForm.updateValueAndValidity();
      this.form.get('borrower')?.updateValueAndValidity();

      this.disabled.set(true);
    }, 100);
  }

  onCancel() {
    this.loanItensForm.enable();
    this.form.get('borrower')?.enable();

    this.loanItensForm.updateValueAndValidity();
    this.form.get('borrower')?.updateValueAndValidity();

    this.disabled.set(false);
  }

  openReturnDialog(loan: Loan) {
    const ref = this.dialogService.open(LoanReturnDialog, {
      header: `Devolução de empréstimo`,
      width: '60%',
      modal: true,
      data: { loan },
    });

    ref.onClose.subscribe((result: any) => {
      if (result?.success) {
        this.crud()?.loadItems();
      }
    });
  }

  openEdit(row: Loan) {
    this.crud()?.edit(row);
  }
}
