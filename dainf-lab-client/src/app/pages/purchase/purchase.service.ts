import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Purchase } from './purchase'; // Importa a interface 'Purchase'

@Injectable()
export class PurchaseService extends CrudService<Purchase> {
  constructor() {
    super('purchases');
  }
}