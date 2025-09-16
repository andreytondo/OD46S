import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SearchSelectComponent } from "@/shared/components/search-select/search-select.component";
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../category/category.service';
import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputContainerComponent,
    CrudComponent,
    SearchSelectComponent
],
  providers: [ItemService, CategoryService],
  selector: 'app-item',
  templateUrl: 'item.component.html',
})
export class ItemComponent {
  itemService = inject(ItemService);
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    name: [null],
    description: [null],
    price: [null],
    category: [null],
    assets: [null],
  });

  cols: Column<Item>[] = [
    { field: 'id', header: 'Código' },
    { field: 'name', header: 'Nome' },
    { field: 'category.description', header: 'Categoria' },
  ];

  config: CrudConfig<Item> = {
    title: 'Itens',
  };
}
