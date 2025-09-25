import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Loan } from './loan';

@Injectable()
export class LoanService extends CrudService<Loan> {
  constructor() {
    super('loans');
  }
}
