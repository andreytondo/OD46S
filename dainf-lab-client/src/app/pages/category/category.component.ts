import { IconSelectComponent } from '@/shared/components/icon-select/icon-select.component';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { SearchRequest } from './../../shared/models/search';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  standalone: true,
  imports: [
    CrudComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputContainerComponent,
    CommonModule,
    IconSelectComponent,
    SubItemFormComponent,
    FieldsetModule
  ],
  selector: 'app-category',
  templateUrl: 'category.component.html',
  providers: [CategoryService],
})
export class CategoryComponent {
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);

  searchRequest: SearchRequest = {
    filters: [{field: 'parent', type: 'IS_NULL'}]
  }

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    description: [null, Validators.required],
    icone: [null],
    subcategories: [],
  });

  subcategoryForm: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    description: [null, Validators.required],
    icone: [null],
  });

  cols: Column<Category>[] = [{ field: 'description', header: 'Descrição' }];

  config: CrudConfig<Category> = {
    title: 'Categorias',
  };
}
