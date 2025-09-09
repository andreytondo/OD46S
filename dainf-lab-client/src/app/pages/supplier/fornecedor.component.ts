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
import { TextareaModule } from 'primeng/textarea';

import { Fornecedor } from './fornecedor';
import { FornecedorService } from './fornecedor.service';
import { catchError, debounceTime, of, switchMap, tap } from 'rxjs';
import { CEPResult, CEPService } from '@/shared/services/cep.service';
import { SelectModule } from 'primeng/select';
import { EstadoSelectComponent } from "@/shared/components/estado-select/estado-select.component";

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CrudComponent,
    InputContainerComponent,
    InputTextModule,
    TextareaModule,
    SelectModule,
    EstadoSelectComponent
],
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
})
export class FornecedorComponent implements OnInit {
  fornecedorService = inject(FornecedorService);
  cepService = inject(CEPService);
  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    razaoSocial: [null, Validators.required],
    nomeFantasia: [null, Validators.required],
    cnpj: [null, Validators.required],
    ie: [null, Validators.required],
    telefone: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    endereco: [null, Validators.required],
    estado: [null, Validators.required],
    cidade: [null, Validators.required],
    cep: [null, Validators.required],
    observacao: [null, Validators.maxLength(2000)],
  });

  cols: Column<Fornecedor>[] = [
    { field: 'id', header: 'Código' },
    { field: 'razaoSocial', header: 'Razão Social' },
    { field: 'nomeFantasia', header: 'Nome Fantasia' },
    { field: 'cnpj', header: 'CNPJ' },
  ];

  config: CrudConfig<Fornecedor> = {
    title: 'Fornecedores',
  };

  ngOnInit(): void {
    this._handleCEPChanges();
  }

  private _handleCEPChanges() {
    this.form
      .get('cep')
      ?.valueChanges.pipe(
        debounceTime(700),
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
