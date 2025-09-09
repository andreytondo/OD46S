import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Category } from './category';
import { CategoryService } from './category.service';
import { Subcategory } from './subcategory';

@Component({
  standalone: true,
  imports: [
    CrudComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputContainerComponent,
    CommonModule,
  ],
  selector: 'app-category',
  templateUrl: 'category.component.html',
  providers: [CategoryService],
})
export class CategoryComponent {
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    description: [null, Validators.required],
    subcategories: this.formBuilder.array([]),
  });

  cols: Column<Category>[] = [{ field: 'description', header: 'Descrição' }];

  config: CrudConfig<Category> = {
    title: 'Categorias',
  };

  get subcategories() {
    return this.form.get('subcategories') as FormArray;
  }

  addSubcategory(subcategory?: Subcategory) {
    const subForm = this.formBuilder.group({
      id: [{ value: null as number | null, disabled: true }],
      description: [null as string | null, Validators.required],
    });
    if (subcategory) {
      subForm.patchValue(subcategory);
    }
    this.subcategories.push(subForm);
  }

  removeSubcategory(index: number) {
    this.subcategories.removeAt(index);
  }

  addSubcategories(item: Category) {
    this.subcategories.clear();
    if (item.subcategories) {
      item.subcategories.forEach((sub) => this.addSubcategory(sub));
    }
  }

  clear() {
    this.form.reset();
    this.subcategories.clear();
  }
}
