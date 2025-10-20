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
import { CartService } from '@/shared/services/cart.service';
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
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { LoanService } from '../loan/loan.service';
import { Asset, AssetStatus, Item, ItemType } from './item';
import { ItemService } from './item.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActiveLoansDialog } from './active-loans-dialog/active-loans-dialog';

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
    FieldsetModule,
    SubItemFormComponent,
    InputNumberModule,
    StaticSelectComponent,
    PhotoAttachmentComponent,
    ButtonModule,
    TooltipModule,
    
  ],
  providers: [
    ItemService,
    CategoryService,
    LabelValuePipe,
    CategoryTreeNodePipe,
    LoanService,
    DialogService
  ],
  selector: 'app-item',
  templateUrl: 'item.component.html',
})
export class ItemComponent {
  itemService = inject(ItemService);
  categoryService = inject(CategoryService);
  loanService = inject(LoanService);
  formBuilder = inject(FormBuilder);
  labelValue = inject(LabelValuePipe);
  cartService = inject(CartService);
  dialogService = inject(DialogService);

  dialogRef: DynamicDialogRef | undefined;

  storageService = new StorageImplService(
    `${this.itemService._url}/storage`,
    'item',
  );

  config: CrudConfig<Item> = {
    title: 'Itens',
  };

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

  itemTypeOptions: LabelValue<ItemType>[] = [
    { label: 'Consumível', value: 'CONSUMABLE' },
    { label: 'Durável', value: 'DURABLE' },
  ];

  assetStatusOptions: LabelValue<AssetStatus>[] = [
    { label: 'Disponível', value: 'AVAILABLE' },
    { label: 'Emprestado', value: 'LOANED' },
    { label: 'Reservado', value: 'RESERVED' },
  ];

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
    if (this.nameFilter())
      filters.push({ field: 'name', value: this.nameFilter(), type: 'ILIKE' });
    if (this.typeFilter())
      filters.push({ field: 'type', value: this.typeFilter(), type: 'EQUALS' });
    if (this.categoryFilter())
      filters.push({
        field: 'category.id',
        value: this.categoryFilter()?.id,
        type: 'EQUALS',
      });
    if (this.siorgFilter())
      filters.push({
        field: 'siorg',
        value: this.siorgFilter(),
        type: 'ILIKE',
      });
    if (this.locationFilter())
      filters.push({
        field: 'assets.location',
        value: this.locationFilter(),
        type: 'ILIKE',
      });
    if (this.statusFilter())
      filters.push({
        field: 'assets.status',
        value: this.statusFilter(),
        type: 'EQUALS',
      });
    return <SearchRequest>{ filters };
  });

  addToCart(item: Item): void {
    this.cartService.addItem(item);
  }

  showActiveLoans(item: Item): void {
    this.loanService.getActiveLoansForItem(item.id).subscribe((loans) => {
      this.dialogRef = this.dialogService.open(ActiveLoansDialog, {
        header: `Empréstimos Ativos: ${item.name}`,
        width: '60%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        modal: true,
        baseZIndex: 10000,
        data: {
          loans: loans,
          itemName: item.name 
        }
      });
    });
  }
}
