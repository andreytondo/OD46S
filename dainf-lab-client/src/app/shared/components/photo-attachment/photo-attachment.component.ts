import { Image } from '@/shared/storage/image';
import { StorageService } from '@/shared/storage/storage.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import {
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadModule,
} from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { concatMap, from, tap, toArray } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-photo-attachment',
  templateUrl: './photo-attachment.component.html',
  imports: [
    CommonModule,
    CarouselModule,
    FileUploadModule,
    ButtonModule,
    ImageModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhotoAttachmentComponent),
      multi: true,
    },
  ],
})
export class PhotoAttachmentComponent implements ControlValueAccessor {
  service = input.required<StorageService>();

  fileUpload = viewChild(FileUpload);

  value = model<Image[]>([]);
  disabled = signal(false);

  onChange: (value: any[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: Image[]): void {
    this.value.set(value ?? []);
    from(this.value())
      .pipe(
        concatMap((file) => this.service().get(file.name)),
        toArray(),
        tap((blobs) => {
          const files: File[] = blobs.map((blob, index) => {
            return new File([blob], this.value()[index].name, {
              type: 'image/png',
            });
          });
          this.fileUpload()!.files = [...files];
          this.fileUpload()!.cd.markForCheck();
        }),
      )
      .subscribe();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onSelect(event: FileUploadHandlerEvent) {
    const files: File[] = event.files;
    from(files)
      .pipe(
        concatMap((file) => this.service().upload(file)),
        tap((img) => {
          if (this.value().some((i) => this.isSameImage(i, img))) return;
          const newVal = [...this.value(), img];
          this.value.set(newVal);
          this.onChange(newVal);
        }),
      )
      .subscribe();
  }

  removeImage(event: any, item: Image, removeFileCallback: any) {
    const image = this.value().findIndex(
      (img) => this.isSameImage(img, item)
    );
    if (image === -1) return;
    this.value.update((v) => v.filter((i) => !this.isSameImage(i, item)));
    this.onChange(this.value());
    removeFileCallback(event, image);
  }

  isSameImage(imageA: Image, imageB: Image) {
    return (
      (imageA.originalName || imageA.name) ===
      (imageB.originalName || imageB.name)
    );
  }
}
