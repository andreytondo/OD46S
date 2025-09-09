import { Injectable } from '@angular/core';
import { CrudService } from '@/shared/crud/crud.service';
import { Cidade } from './cidade';

@Injectable({ providedIn: 'root' })
export class CidadeService extends CrudService<Cidade> {
  constructor() {
    super('cidades');
  }
}
