import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    InputContainerComponent,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './config.component.html',
})
export class ConfigurationComponent implements OnInit {
  messageService = inject(MessageService);
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _configService: ConfigService,
  ) {
    this.form = this._buildForm();
  }

  ngOnInit(): void {
    this.load();
  }

  save() {
    if (!this.form.valid) return;
    this._configService
      .update(this.form.getRawValue())
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Registro salvo com sucesso.',
          });
          this.load();
        }),
      )
      .subscribe();
  }

  load() {
    this._configService.get().subscribe((config) => {
      this.form.patchValue(config);
    });
  }

  private _buildForm() {
    return this._formBuilder.group({
      id: [null],
      clearanceEmailRecipient: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }
}
