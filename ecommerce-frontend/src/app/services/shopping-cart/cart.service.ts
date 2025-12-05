import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private readonly STORAGE_KEY = 'ecommerce_cart';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage()); //lembrar de implementar testes para este serviço
  
  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }
  addToCart(product: Product, quantity: number = 1): void { //alterar aqui 
    if(product.price <= 0) {
      throw new Error('Cannot add product with non-positive price to cart.');
      return;
    }
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity ++;
    } else {
            currentCart.push({ product, quantity: 1 });

  }
    this.updateCart(currentCart);

  }
  removeFromCart(productId: number): void {
    const updatedCart = this.cartItemsSubject.value.filter(
      item => item.product.id !== productId
    );
    this.updateCart(updatedCart);
  }
  getTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }
  getItemCount(): number {
    return this.cartItemsSubject.value.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
  clearCart(): void {
    this.updateCart([]);
  }
  private saveToStorage(cartItems: CartItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartItems));
  }
  private loadFromStorage(): CartItem[] {
    const Cartdata = localStorage.getItem(this.STORAGE_KEY);
    return Cartdata ? JSON.parse(Cartdata) : [];
  }
  private updateCart(cartItems: CartItem[]): void {
    this.cartItemsSubject.next(cartItems);
    this.saveToStorage(cartItems);
  }


}
