import { Component, input, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  standalone: true,
  imports: [Dialog],
  selector: 'app-crud-dialog',
  templateUrl: 'crud-dialog.component.html',
})
export class CrudDialogComponent implements OnInit {
  visible = input<boolean>(false);

  constructor() {}

  ngOnInit() {}
}
