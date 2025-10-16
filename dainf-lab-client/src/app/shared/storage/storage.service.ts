import { Observable } from 'rxjs';
import { Image } from './image';

export interface StorageService {
  getSignedUrl(
    objectName: string,
    method: 'GET' | 'PUT' | 'DELETE',
  ): Observable<string>;

  get(objectName: string): Observable<Blob>;

  upload(file: File): Observable<Image>;

  delete(objectName: string): Observable<void>;
}
