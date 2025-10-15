import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { Page, SearchRequest } from '../models/search';
import { Identifiable } from './crud';

export abstract class CrudService<T extends Identifiable> extends BaseService {
  public readonly _url: string;

  constructor(url: string) {
    super();
    this._url = `${this.apiUrl}/${url}`;
  }

  search(request: SearchRequest): Observable<Page<T>> {
    return this._http.post<Page<T>>(`${this._url}/search`, request);
  }

  get(id: string | number): Observable<T> {
    return this._http.get<T>(`${this._url}/${id}`);
  }

  create(item: Partial<T>): Observable<T> {
    return this._http.post<T>(this._url, item);
  }

  update(id: string | number, item: Partial<T>): Observable<T> {
    return this._http.put<T>(`${this._url}/${id}`, item);
  }

  delete(id: string | number): Observable<void> {
    return this._http.delete<void>(`${this._url}/${id}`);
  }
}
