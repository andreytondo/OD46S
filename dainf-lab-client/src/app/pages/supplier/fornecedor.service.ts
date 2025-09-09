import { CrudService } from "@/shared/crud/crud.service";
import { Injectable } from "@angular/core";
import { Fornecedor } from "./fornecedor";

@Injectable({ providedIn: 'root' })
export class FornecedorService extends CrudService<Fornecedor> {
  constructor() {
    super('fornecedores');
  }
}
