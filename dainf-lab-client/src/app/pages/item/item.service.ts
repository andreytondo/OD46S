import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable()
export class ItemService extends CrudService<Item> {
  constructor() {
    super('items');
  }
}
