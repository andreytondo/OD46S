import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable()
export class CategoryService extends CrudService<Category> {
    constructor() {
        super('categories');
    }
}
