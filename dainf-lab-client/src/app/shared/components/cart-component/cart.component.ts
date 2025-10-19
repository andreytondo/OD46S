import { CartItem } from '@/shared/models/cart';
import { CartService } from '@/shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputNumberModule,
    FormsModule
  ],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cartService = inject(CartService);
  router = inject(Router);

  items = this.cartService.items;

  updateQuantity(item: CartItem, newQuantity: number | null): void {
    if (newQuantity !== null) {
      this.cartService.updateQuantity(item.item.id, newQuantity);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.item.id);
  }

  goToReservation(): void {
    const cartItemsData = this.items().map(ci => ({
      item: ci.item,
      quantity: ci.quantity
    }));

    if (cartItemsData.length === 0) return;

    this.router.navigate(['/pages/reservation'], { state: { data: cartItemsData } });
  }
}
