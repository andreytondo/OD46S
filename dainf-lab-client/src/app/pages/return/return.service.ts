import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../loan/loan';
import { Return } from './return';

@Injectable()
export class ReturnService extends CrudService<Return> {
  constructor() {
    super('returns');
  }

  findByLoan(loan: Loan): Observable<Return> {
    return this._http.get<Return>(`${this._url}/by-loan/${loan.id}`);
  }
}
