import { HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { BaseService } from '../services/base.service';
import { Image } from './image';
import { StorageService } from './storage.service';

export class StorageImplService extends BaseService implements StorageService {
  private readonly _url: string;
  public readonly bucket: string;

  constructor(url: string, bucket: string) {
    super();
    this._url = url;
    this.bucket = bucket;
  }

  getSignedUrl(
    objectName: string,
    method: 'GET' | 'PUT' | 'DELETE',
  ): Observable<string> {
    let params = new HttpParams().set('method', method);
    if (objectName) params = params.set('objectName', objectName);

    return this._http.get(`${this._url}/signed-url`, {
      params,
      responseType: 'text',
    });
  }

  get(objectName: string): Observable<Blob> {
    return this.getSignedUrl(objectName, 'GET').pipe(
      switchMap((url) => this._http.get(url, { responseType: 'blob' })),
    );
  }

  upload(file: File): Observable<Image> {
    const random = Math.random().toString(36).substring(7);
    const key = `temp/${random}_${file.name}`;
    return this.getSignedUrl(key, 'PUT').pipe(
      switchMap((url) =>
        this._http.put(url, file, { headers: { 'Content-Type': file.type } }).pipe(
          map(() => ({ bucket: this.bucket, contentType: file.type, name: key, originalName: file.name }))
        ),
      ),

    );
  }

  delete(objectName: string): Observable<any> {
    return this.getSignedUrl(objectName, 'DELETE').pipe(
      switchMap((url) => this._http.delete(url)),
    );
  }
}
