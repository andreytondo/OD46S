import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
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
import { FieldsetModule } from 'primeng/fieldset';
import { StaticSelectComponent } from '@/shared/components/static-select/static-select.component';
import { ItemService } from '../item/item.service';
import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserService } from '../user/user.service';
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
  
  constructor() {
    console.log('LoanComponent: CONSTRUTOR 1/3');
    
    this.receivedData = history.state?.['data'];

    if (this.receivedData) {
      console.log('LoanComponent: DADOS RECEBIDOS! ✅', this.receivedData);
    } else {
      console.warn('LoanComponent: Nenhum dado recebido na navegação.');
    }
  }

  ngAfterViewInit(): void {
    console.log('LoanComponent: TELA CARREGADA (ngAfterViewInit) 2/3');

    if (this.receivedData) {
      console.log('LoanComponent: Preenchendo o formulário...');
      this.form.patchValue({
        borrower: this.receivedData.borrower,
        raSiape: this.receivedData.raSiape,
        items: this.receivedData.items,
      });

      console.log('LoanComponent: Formulário preenchido. Abrindo o modal...');
      setTimeout(() => {
        if (this.crudComponent) {
          console.log('LoanComponent: Abrindo modal! 3/3 ✅');
          this.crudComponent.openNew();
        } else {
          console.error('LoanComponent: ERRO! O @ViewChild("crud") não foi encontrado.');
        }
      }, 0);
    }
  }
}