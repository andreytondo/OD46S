import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { LogoComponent } from '@/layout/component/logo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { EnvironmentService } from '@/shared/services/config.service';

@Component({
  selector: 'app-clearance-validation',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ButtonModule,
    CardModule,
    RippleModule,
    MessageModule,
    AppFloatingConfigurator,
    LogoComponent
  ],
  templateUrl: './clearance-validation.component.html'
})
export class ClearanceValidationComponent {
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';
  result: { nomeAluno: string; matricula: string; dataEmissao: string; codigoValidacao: string } | null = null;

  private readonly _route = inject(ActivatedRoute);
  private readonly _http = inject(HttpClient);
  private readonly _env = inject(EnvironmentService);

  constructor() {
    this._route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      if (code) {
        this.validate(code);
      } else {
        this.errorMessage = 'Código não informado.';
        this.status = 'error';
      }
    });
  }

  validate(code: string) {
    this.status = 'loading';
    this.errorMessage = '';
    this._http.get<Record<string, any>>(`${this._env.apiUrl}/clearance/validate`, { params: { code } })
      .subscribe({
        next: (res) => {
          this.result = {
            nomeAluno: res['nomeAluno'],
            matricula: res['matricula'],
            dataEmissao: res['dataEmissao'],
            codigoValidacao: res['codigoValidacao']
          };
          this.status = 'success';
        },
        error: (err) => {
          this.errorMessage = 'Código inválido ou não encontrado.';
          this.status = 'error';
          console.error('Clearance validation failed', err);
        }
      });
  }
}
