import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/shopping-cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    total: number = 0;

    cartService = inject(CartService);

    ngOnInit(): void {
    // Inscrever para receber atualizações do carrinho
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
  clearCart(): void {
    this.cartService.clearCart();
  }
}