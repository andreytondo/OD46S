import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, model, OnInit } from '@angular/core'; // Adicionado OnInit
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from './../item/item.service';

import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';

import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';

import { FornecedorService } from '../supplier/fornecedor.service';
import { UserService } from '../user/user.service';
import { Purchase, PurchaseItem } from './purchase';
import { PurchaseService } from './purchase.service';

import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { SearchFilter, SearchRequest } from '@/shared/models/search';
import { DatePickerModule } from 'primeng/datepicker'; // Corrigido de DatePickerModule
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Item } from '../item/item';
import { Fornecedor } from '../supplier/fornecedor';
import { User } from '../user/user';

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
  providers: [
    PurchaseService,
    FornecedorService,
    UserService,
    DatePipe,
    ItemService,
  ],
  selector: 'app-purchase',
  templateUrl: 'purchase.component.html',
})
export class PurchaseComponent implements OnInit {
  purchaseService = inject(PurchaseService);
  supplierService = inject(FornecedorService);
  userService = inject(UserService);
  itemService = inject(ItemService);
  formBuilder = inject(FormBuilder);
  datePipe = inject(DatePipe);

  config: CrudConfig<Purchase> = {
    title: 'Compras',
  };

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    date: [new Date(), Validators.required],
    fornecedor: [null, Validators.required],
    user: [null, Validators.required],
    items: [[]],
    totalValue: [{ value: 0, disabled: true }],
  });

  purchaseItemForm: FormGroup = this.formBuilder.group({
    id: [null],
    item: [null, Validators.required],
    quantity: [null, [Validators.required, Validators.min(1)]],
    price: [
      { value: null, disabled: true },
      [Validators.required, Validators.min(0.01)],
    ],
  });

  cols: Column<Purchase>[] = [
    { field: 'id', header: 'Código' },
    {
      field: 'date',
      header: 'Data da Compra',
      transform: (row) => this.datePipe.transform(row.date, 'dd/MM/yyyy') || '',
    },
    { field: 'fornecedor.nomeFantasia', header: 'Fornecedor' },
    { field: 'user.nome', header: 'Responsável' },
  ];

  purchaseItemCols: Column<PurchaseItem>[] = [
    { field: 'item.name', header: 'Item' },
    { field: 'quantity', header: 'Qtd.' },
    {
      field: 'price',
      header: 'Vlr. Unitário',
      transform: (row) =>
        (row.price || 0).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
    {
      field: 'id',
      header: 'Subtotal',
      transform: (row) =>
        (row.quantity * row.price).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
  ];

  dateFilter = model<string | undefined>();
  userFilter = model<User | undefined>();
  fornecedorFilter = model<Fornecedor | undefined>();
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

    if (this.fornecedorFilter()) {
      filters.push({
        field: 'fornecedor.id',
        value: this.fornecedorFilter()?.id,
        type: 'EQUALS',
      });
    }
    return <SearchRequest>{ filters };
  });

  ngOnInit() {
    this.form.get('items')?.valueChanges.subscribe((items: PurchaseItem[]) => {
      const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      );
      this.form.get('totalValue')?.setValue(total);
    });

    this.purchaseItemForm.get('item')?.valueChanges.subscribe((item: Item) => {
      if (item?.price) {
        this.purchaseItemForm.get('price')?.setValue(item.price || 0);
      }
    });
  }
}
