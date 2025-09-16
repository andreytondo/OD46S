import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from "@/shared/crud/crud.component";
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
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
    CrudComponent
],
  selector: 'app-item',
  templateUrl: 'item.component.html',
})
export class ItemComponent {
  itemService = inject(ItemService);
  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
  });

  cols: Column<Item>[] = [
    { field: 'email', header: 'E-mail' },
    { field: 'nome', header: 'Nome' },
    { field: 'telefone', header: 'Telefone' },
    { field: 'documento', header: 'RA/SIAPE' },
  ];

  config: CrudConfig<Item> = {
    title: 'Itens',
  };
}
