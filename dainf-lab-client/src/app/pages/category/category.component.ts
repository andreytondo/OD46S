import { IconSelectComponent } from '@/shared/components/icon-select/icon-select.component';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { CategoryTreeNodePipe } from '@/shared/pipes/category-tree-node.pipe';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { TreeModule } from 'primeng/tree';
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
    FieldsetModule,
    TreeModule,
    CategoryTreeNodePipe
  ],
  selector: 'app-category',
  templateUrl: 'category.component.html',
  providers: [CategoryService],
})
export class CategoryComponent implements AfterViewInit {
  subcategoryTemplate = viewChild('subcategoryTemplate', {
    read: TemplateRef<any>,
  });

  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);

  searchRequest: SearchRequest = {
    filters: [{ field: 'parent', type: 'IS_NULL' }],
  };

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    description: [null, Validators.required],
    icon: [null],
    subcategories: [],
  });

  subcategoryForm: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    description: [null, Validators.required],
    icon: [null],
  });

  cols: Column<Category>[] = [
    { field: 'description', header: 'Descrição' },
  ];

  subcategoryCols: Column<Category>[] = [
    { field: 'description', header: 'Descrição' },
  ];

  templateMap: Map<keyof Category | string, TemplateRef<any>> | undefined;

  config: CrudConfig<Category> = {
    title: 'Categorias',
  };

  ngAfterViewInit(): void {
    this.templateMap = new Map([
      ['description', this.subcategoryTemplate()!],
    ]);
  }

  mapToTreeNodes(categories: Category[]): TreeNode<Category>[] {
    return categories?.map((category) => ({
      key: category.id.toString(),
      label: category.description,
      icon: category.icon,
      data: category,
      children: category.subcategories
        ? this.mapToTreeNodes(category.subcategories)
        : [],
      leaf: !category.subcategories || category.subcategories.length === 0,
    }));
  }
}
