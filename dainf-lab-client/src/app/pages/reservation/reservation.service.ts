import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Reservation } from './reservation'; // Importa a interface 'Purchase'

@Injectable()
export class ReservationService extends CrudService<Reservation> {
  constructor() {
    super('reservations');
  }
}