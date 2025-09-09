import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Subcategory } from './subcategory';

@Injectable()
export class SubcategoryService extends CrudService<Subcategory> {
    constructor() {
        super('subcategories');
    }
}
