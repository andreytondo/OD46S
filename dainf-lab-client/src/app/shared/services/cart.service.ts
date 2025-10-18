import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart';
import { Item } from '@/pages/item/item';
import { MessageService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class CartService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private apiUrl = `${environment.apiUrl}/carts`;

  private cartItems: WritableSignal<CartItem[]> = signal([]);
  items = this.cartItems.asReadonly();
  itemCount = computed(() => this.cartItems().length);
  isCartVisible = signal(false);

  constructor() {
    this.loadCart();
  }

  loadCart(): void {
    this.http.get<CartItem[]>(this.apiUrl).pipe(
      tap(items => this.cartItems.set(items)),
      catchError(err => {
        console.error("Failed to load cart", err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar carrinho.' });
        return throwError(() => err);
      })
    ).subscribe();
  }

  private saveCart(): void {
    this.http.put<CartItem[]>(this.apiUrl, this.cartItems()).pipe(
      tap(updatedItems => this.cartItems.set(updatedItems)),
      catchError(err => {
        console.error("Failed to save cart", err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar carrinho.' });
        return throwError(() => err);
      })
    ).subscribe();
  }


  addItem(itemToAdd: Item, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(ci => ci.item.id === itemToAdd.id);

    if (existingItemIndex > -1) {
      const updatedItems = currentItems.map((ci, index) =>
        index === existingItemIndex ? { ...ci, quantity: ci.quantity + quantity } : ci
      );
      this.cartItems.set(updatedItems);
    } else {
      const newItem: CartItem = { id: 0, item: itemToAdd, quantity: quantity };
      this.cartItems.set([...currentItems, newItem]);
    }
    this.saveCart();
    this.messageService.add({ severity: 'success', summary: 'Adicionado', detail: `${itemToAdd.name} adicionado ao carrinho.` });
  }

  removeItem(itemId: number): void {
    this.cartItems.update(items => items.filter(ci => ci.item.id !== itemId));
    this.saveCart();
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(itemId); 
      return;
    }
    this.cartItems.update(items => items.map(ci =>
      ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci
    ));
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.saveCart();
  }

  toggleCartVisibility(): void {
    this.isCartVisible.update(visible => !visible);
    console.log('CartService: Toggled visibility to', this.isCartVisible());
  }
}