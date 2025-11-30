import { Component, OnInit, computed, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { Column, CrudConfig } from '@/shared/crud/crud';
import { CrudComponent } from '@/shared/crud/crud.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { EstadoSelectComponent } from '@/shared/components/estado-select/estado-select.component';
import { SearchSelectComponent } from '@/shared/components/search-select/search-select.component';
import { SearchRequest } from '@/shared/models/search';
import { CnpjPipe } from '@/shared/pipes/cnpj.pipe';
import { CEPResult, CEPService } from '@/shared/services/cep.service';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { CidadeService } from '../cidade/cidade.service';
import { Fornecedor } from './fornecedor';
import { FornecedorService } from './fornecedor.service';
import { cnpjValidator } from '@/shared/validator/cnpj.validator';
import { phoneValidator } from '@/shared/validator/phone.validator';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CrudComponent,
    InputContainerComponent,
    InputTextModule,
    TextareaModule,
    SelectModule,
    EstadoSelectComponent,
    SearchSelectComponent,
    InputMaskModule
  ],
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  providers: [CnpjPipe],
})
export class FornecedorComponent implements OnInit {
  fornecedorService = inject(FornecedorService);
  cepService = inject(CEPService);
  formBuilder = inject(FormBuilder);
  cidadeService = inject(CidadeService);
  cnpjPipe = inject(CnpjPipe);

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    razaoSocial: [null, Validators.required],
    nomeFantasia: [null, Validators.required],
    cnpj: [null, [Validators.required, cnpjValidator()]],
    ie: [null],
    telefone: [null, [Validators.required, phoneValidator()]],
    email: [null, [Validators.required, Validators.email]],
    endereco: [null, Validators.required],
    estado: [null, Validators.required],
    cidade: [null, Validators.required],
    cep: [null],
    observacao: [null, Validators.maxLength(2000)],
  });

  cols: Column<Fornecedor>[] = [
    { field: 'id', header: 'Código' },
    { field: 'razaoSocial', header: 'Razão Social' },
    { field: 'nomeFantasia', header: 'Nome Fantasia' },
    { field: 'cnpj', header: 'CNPJ', transform: (row: Fornecedor) => this.cnpjPipe.transform(row.cnpj) },
  ];

  config: CrudConfig<Fornecedor> = {
    title: 'Fornecedores',
  };

  filtroNomeFantasia = model<string | undefined>();
  filtroRazaoSocial = model<string | undefined>();
  filtroCnpj = model<string | undefined>();

  searchRequest = computed<SearchRequest>(() => {
    const filters = [];
    if (this.filtroNomeFantasia())
      filters.push({
        field: 'nomeFantasia',
        value: this.filtroNomeFantasia(),
        type: 'ILIKE',
      });
    if (this.filtroRazaoSocial())
      filters.push({
        field: 'razaoSocial',
        value: this.filtroRazaoSocial(),
        type: 'ILIKE',
      });
    if (this.filtroCnpj())
      filters.push({
        field: 'cnpj',
        value: this.filtroCnpj(),
        type: 'ILIKE',
      });
    return <SearchRequest>{ filters };
  });

  ngOnInit(): void {
    this._handleCEPChanges();
  }

    private _handleCEPChanges() {
    this.form
      .get('cep')
      ?.valueChanges.pipe(
        debounceTime(700),
        filter((value): value is string => {
            if (!value) return false;
            const cleanValue = value.replace(/\D/g, '');
            return cleanValue.length === 8;
        }),
        switchMap((cep: string) => this.cepService.search(cep)),
        tap((cepResult: CEPResult) => this._mapCEPResultToForm(cepResult)),
      )
      .subscribe();
  }


  private _mapCEPResultToForm(cepResult: CEPResult) {
    this.form.get('estado')?.patchValue(cepResult.uf);
    this.form.get('cidade')?.patchValue(cepResult.localidade);
  }
}
