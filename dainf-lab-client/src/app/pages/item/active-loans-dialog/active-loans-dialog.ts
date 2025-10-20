import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { LoanItemTracking } from '@/pages/loan/loan';
@Component({
  selector: 'app-active-loans-dialog',
  imports: [CommonModule, TableModule, ButtonModule, TagModule],  
  templateUrl: './active-loans-dialog.html',
  styleUrl: './active-loans-dialog.scss'
})
export class ActiveLoansDialog {
  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);

  loans: LoanItemTracking[] = [];
  itemName: string = '';

  ngOnInit() {
    this.loans = this.config.data.loans;
    this.itemName = this.config.data.itemName;
  }

  closeDialog() {
    this.ref.close();
  }
 
}
