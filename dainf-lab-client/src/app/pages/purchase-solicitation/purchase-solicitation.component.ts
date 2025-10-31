import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core'; // Adicionado OnInit
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

import { UserService } from '../user/user.service';
import { PurchaseService } from './purchase-solicitation.service';

import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { SearchFilter, SearchRequest } from '@/shared/models/search';
import { DatePickerModule } from 'primeng/datepicker'; // Corrigido de DatePickerModule
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../user/user';
import {
  PurchaseSolicitation,
  PurchaseSolicitationItem,
} from './purchase-solicitation.';

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
  ],
  providers: [PurchaseService, UserService, DatePipe, ItemService],
  selector: 'app-purchase-solicitation',
  templateUrl: 'purchase-solicitation.component.html',
})
export class PurchaseSolicitationComponent {
  purchaseService = inject(PurchaseService);
  userService = inject(UserService);
  itemService = inject(ItemService);
  formBuilder = inject(FormBuilder);
  datePipe = inject(DatePipe);

  config: CrudConfig<PurchaseSolicitation> = {
    title: 'Solicitações de Compras',
  };

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    date: [new Date(), Validators.required],
    user: [null, Validators.required],
    observation: [null],
    items: [[]],
  });

  purchaseItemForm: FormGroup = this.formBuilder.group({
    id: [null],
    item: [null, Validators.required],
    quantity: [null, [Validators.required, Validators.min(1)]],
  });

  cols: Column<PurchaseSolicitation>[] = [
    { field: 'id', header: 'Código' },
    {
      field: 'date',
      header: 'Data da Solicitação',
      transform: (row) => this.datePipe.transform(row.date, 'dd/MM/yyyy') || '',
    },
    { field: 'user.nome', header: 'Responsável' },
    { field: 'user.observation', header: 'Observação' },
  ];

  purchaseItemCols: Column<PurchaseSolicitationItem>[] = [
    { field: 'item.name', header: 'Item' },
    { field: 'quantity', header: 'Qtd.' },
  ];

  dateFilter = model<string | undefined>();
  userFilter = model<User | undefined>();
  searchRequest = computed<SearchRequest>(() => {
    const filters: SearchFilter[] = [];

    if (this.dateFilter()) {
      filters.push({
        field: 'date',
        value: this.dateFilter(),
        type: 'EQUALS',
      });
    }

    if (this.userFilter()) {
      filters.push({
        field: 'user.id',
        value: this.userFilter()?.id,
        type: 'EQUALS',
      });
    }
    return <SearchRequest>{ filters };
  });
}
