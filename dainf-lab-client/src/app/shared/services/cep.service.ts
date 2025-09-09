import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CEPService extends BaseService {
  private readonly _url = 'https://viacep.com.br/ws';

  search(cep: string): Observable<CEPResult> {
    return this._http.get<CEPResult>(`${this._url}/${cep}/json`);
  }
}

export interface CEPResult {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
