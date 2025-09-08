import { Injectable } from "@angular/core";
import { Fornecedor } from "./fornecedor";
import { CrudService } from "@/shared/crud/crud.service";

@Injectable({ providedIn: 'root' })
export class FornecedorService extends CrudService<Fornecedor> {
  constructor() {
    super('fornecedores');
  }
}