import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService,Product } from '../services/product';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // સામાન્ય વેરિએબલની જગ્યાએ Signals વાપરો
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('ડેટા મળ્યો:', data);
        // Signals અપડેટ કરો
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isLoading.set(false);
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}