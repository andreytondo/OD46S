import { CategoryService } from './category.service';
import { Component, OnInit, inject } from '@angular/core';
import { CrudComponent } from '@/shared/crud/crud.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { Category } from './category';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { CommonModule } from '@angular/common';


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

  cols: Column<Category>[] = [
    { field: 'description', header: 'Descrição' },
  ];

  config: CrudConfig<Category> = {
    title: 'Categorias',
  };

  get subcategories() {
    return this.form.get('subcategories') as FormArray;
  }

  addSubcategory() {
    const subForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      description: [null, Validators.required],
    });
    this.subcategories.push(subForm);
  }


  removeSubcategory(index: number) {
    this.subcategories.removeAt(index);
  }
}
