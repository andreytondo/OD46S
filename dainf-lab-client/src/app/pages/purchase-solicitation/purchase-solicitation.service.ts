import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { PurchaseSolicitation } from './purchase-solicitation.';

@Injectable()
export class PurchaseService extends CrudService<PurchaseSolicitation> {
  constructor() {
    super('solicitations');
  }
}
