import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { Item } from '../item/item';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { Reservation, ReservationItem } from './reservation';
import { ReservationService } from './reservation.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CrudComponent,
    InputContainerComponent,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    FieldsetModule,
    SubItemFormComponent,
    DatePickerModule,
    SearchSelectComponent,
  ],
  providers: [ReservationService, UserService, ItemService, DatePipe],
  selector: 'app-reservation',
  templateUrl: 'reservation.component.html',
})
export class ReservationComponent implements OnInit {
  reservationService = inject(ReservationService);
  userService = inject(UserService);
  itemService = inject(ItemService);
  formBuilder = inject(FormBuilder);
  datePipe = inject(DatePipe);

  config: CrudConfig<Reservation> = {
    title: 'Reservas',
  };

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    description: [''],
    observation: [''],
    reservationDate: [new Date(), Validators.required],
    withdrawalDate: [null],
    user: [null, Validators.required],
    items: [[], [Validators.required, Validators.minLength(1)]],
  });

  reservationItemForm: FormGroup = this.formBuilder.group({
    id: [null],
    item: [null, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [{ value: null, disabled: true }, Validators.required],
  });

  cols: Column<Reservation>[] = [
    { field: 'id', header: 'Código' },
    {
      field: 'reservationDate',
      header: 'Data da Reserva',
      transform: (row) =>
        this.datePipe.transform(row.reservationDate, 'dd/MM/yyyy') || '',
    },
    { field: 'user.nome', header: 'Usuário' },
    { field: 'description', header: 'Descrição' },
  ];

  reservationItemCols: Column<ReservationItem>[] = [
    { field: 'item.name', header: 'Item' },
    { field: 'quantity', header: 'Quantidade' },
  ];

  ngOnInit() {
    this.form.get('items')?.valueChanges.subscribe((itemsValue) => {
      console.log('Valor atual do array de itens:', itemsValue);
    });

    this.reservationItemForm.get('item')?.valueChanges.subscribe((selectedItem: Item) => {
      if (selectedItem?.price) {
        this.reservationItemForm.get('price')?.setValue(selectedItem.price);
      } else {
        this.reservationItemForm.get('price')?.setValue(0);
      }
      console.log('Item selecionado:', selectedItem);
    });
  }
}

