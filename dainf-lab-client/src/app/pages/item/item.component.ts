import { CategorySelectComponent } from '@/shared/components/category-select/category-select.component';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { PhotoAttachmentComponent } from '@/shared/components/photo-attachment/photo-attachment.component';
import { StaticSelectComponent } from '@/shared/components/static-select/static-select.component';
import { SubItemFormComponent } from '@/shared/components/subitem-form/subitem-form.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { LabelValue } from '@/shared/models/label-value';
import { SearchFilter, SearchRequest } from '@/shared/models/search';
import { CategoryTreeNodePipe } from '@/shared/pipes/category-tree-node.pipe';
import { LabelValuePipe } from '@/shared/pipes/label-value.pipe';
import { StorageImplService } from '@/shared/storage/storage-impl.service';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Fieldset } from 'primeng/fieldset';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { Asset, AssetStatus, Item, ItemType } from './item';
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
    CategorySelectComponent,
    Fieldset,
    SubItemFormComponent,
    InputNumber,
    StaticSelectComponent,
    PhotoAttachmentComponent,
  ],
  providers: [
    ItemService,
    CategoryService,
    LabelValuePipe,
    CategoryTreeNodePipe,
  ],
  selector: 'app-item',
  templateUrl: 'item.component.html',
})
export class ItemComponent {
  itemService = inject(ItemService);
  categoryService = inject(CategoryService);
  formBuilder = inject(FormBuilder);
  labelValue = inject(LabelValuePipe);

  storageService = new StorageImplService(
    `${this.itemService._url}/storage`,
    'item',
  );

  config: CrudConfig<Item> = {
    title: 'Itens',
  };

  /** forms */
  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    name: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(255)]),
    ],
    description: [null],
    price: [null],
    category: [null],
    assets: [null],
    images: [null],
    siorg: [null],
    type: [null, Validators.required],
    quantity: [
      { value: null, disabled: true },
      Validators.compose([Validators.required]),
    ],
    minimumStock: [null, Validators.compose([Validators.required])],
  });

  assetForm: FormGroup = this.formBuilder.group({
    id: [null],
    location: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(255)]),
    ],
    serialNumber: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(255)]),
    ],
    status: [null, Validators.required],
  });

  /** options */
  itemTypeOptions: LabelValue<ItemType>[] = [
    { label: 'Consumível', value: 'CONSUMABLE' },
    { label: 'Durável', value: 'DURABLE' },
  ];

  assetStatusOptions: LabelValue<AssetStatus>[] = [
    { label: 'Disponível', value: 'AVAILABLE' },
    { label: 'Emprestado', value: 'LOANED' },
    { label: 'Reservado', value: 'RESERVED' },
  ];

  /** cols */
  cols: Column<Item>[] = [
    { field: 'id', header: 'Código' },
    { field: 'name', header: 'Nome' },
    { field: 'category.description', header: 'Categoria' },
  ];

  assetCols: Column<Asset>[] = [
    { field: 'serialNumber', header: 'Patrimônio' },
    { field: 'location', header: 'Localização' },
    {
      field: 'status',
      header: 'Situação',
      transform: (row) =>
        this.labelValue.transform(row.status, this.assetStatusOptions),
    },
  ];

  nameFilter = model<string | undefined>();
  typeFilter = model<string | undefined>();
  categoryFilter = model<Category | undefined>();
  siorgFilter = model<string | undefined>();
  locationFilter = model<string | undefined>();
  statusFilter = model<string | undefined>();
  searchRequest = computed<SearchRequest>(() => {
    const filters: SearchFilter[] = [];

    if (this.nameFilter()) {
      filters.push({
        field: 'name',
        value: this.nameFilter(),
        type: 'ILIKE',
      });
    }

    if (this.typeFilter()) {
      filters.push({
        field: 'type',
        value: this.typeFilter(),
        type: 'EQUALS',
      });
    }

    if (this.categoryFilter()) {
      filters.push({
        field: 'category.documento',
        value: this.categoryFilter()?.id,
        type: 'ILIKE',
      });
    }

    if (this.siorgFilter()) {
      filters.push({
        field: 'siorg',
        value: this.siorgFilter(),
        type: 'ILIKE',
      });
    }

    if (this.locationFilter()) {
      filters.push({
        field: 'location',
        value: this.locationFilter(),
        type: 'ILIKE',
      });
    }

    if (this.statusFilter()) {
      filters.push({
        field: 'status',
        value: this.statusFilter(),
        type: 'EQUALS',
      });
    }
    return <SearchRequest>{ filters };
  });
}
