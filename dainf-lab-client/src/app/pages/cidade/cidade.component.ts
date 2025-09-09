import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { CrudComponent } from '@/shared/crud/crud.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { EstadoSelectComponent } from "@/shared/components/estado-select/estado-select.component";
import { SelectModule } from 'primeng/select';

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
export class CidadeComponent {
}
