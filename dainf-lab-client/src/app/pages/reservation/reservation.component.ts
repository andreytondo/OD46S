import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { Router } from '@angular/router';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { Reservation, ReservationItem } from './reservation';
import { ReservationService } from './reservation.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
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
export class ReservationComponent {
  reservationService = inject(ReservationService);
  userService = inject(UserService);
  itemService = inject(ItemService);
  formBuilder = inject(FormBuilder);
  datePipe = inject(DatePipe);
  router = inject(Router);
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


  createLoanFromReservation(reservation: Reservation) {
    const loanItems = reservation.items.map((item) => ({
      item: item.item,
      quantity: item.quantity,
      status: 'PENDENTE',
    }));

    const loanData = {
      borrower: reservation.user,
      raSiape: reservation.user.documento,
      items: loanItems,
    };

    this.router.navigate(['/pages/loan'], { state: { data: loanData } });
  }
}
