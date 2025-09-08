import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CrudComponent } from '@/shared/crud/crud.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { InputTextModule } from 'primeng/inputtext';

import { Fornecedor } from './fornecedor';
import { FornecedorService } from './fornecedor.service';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CrudComponent,
    InputContainerComponent,
    InputTextModule,
  ],
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
})
export class FornecedorComponent {
  fornecedorService = inject(FornecedorService);
  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    id: [{ value: '', disabled: true }],
    razaoSocial: ['', Validators.required],
    nomeFantasia: ['', Validators.required],
    cnpj: ['', Validators.required],
    ie: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', Validators.required],
    estado: ['', Validators.required],
    cidade: ['', Validators.required],
    cep: ['', Validators.required],
    observacao: ['', Validators.maxLength(2000)],
  });

  cols: Column<Fornecedor>[] = [
    { field: 'id', header: 'Código' },
    { field: 'razaoSocial', header: 'Razão Social' },
    { field: 'nomeFantasia', header: 'Nome Fantasia' },
    { field: 'cnpj', header: 'CNPJ' }
  ];

  config: CrudConfig<Fornecedor> = {
    title: 'Fornecedores',
  };

}
