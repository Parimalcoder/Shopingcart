import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;

  updateQty(id: number, delta: number) {
    this.cartService.updateQuantity(id, delta);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  checkout() {
    alert(`Order Placed! Total: $${this.cartTotal().toFixed(2)}`);
    this.cartService.clearCart();
  }
}