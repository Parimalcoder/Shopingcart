import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  addToCart(product: any) {
    const existing = this.cartItems().find(item => item.id === product.id);
    if (existing) {
      this.cartItems.update(items =>
        items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.cartItems.update(items => [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        }
      ]);
    }
  }

  updateQuantity(id: number, delta: number) {
    this.cartItems.update(items =>
      items
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }

  removeFromCart(id: number) {
    this.cartItems.update(items => items.filter(item => item.id !== id));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}