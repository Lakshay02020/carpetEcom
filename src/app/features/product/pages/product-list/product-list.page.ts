import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service/product.service';
import { CartService } from '../../../../core/services/cart-service/cart.service';
import { Product } from '../../../../core/models/product.model';
import { RouterModule}  from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ INCLUDE IT HERE
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css'],
})

export class ProductListPage implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    console.log('ProductListPage initialized');
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products received:', data);
  
        data.forEach((product, index) => {
          console.log(`Product ${index + 1}:`, product);
        });
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(product: Product): void {
    const userId = '10'; 
    console.log('Adding to cart:', product);
    this.cartService.addToCart(userId, product).subscribe({
      next: (res) => {
        console.log('Item added to cart:', res);
      },
      error: (err) => {
        console.error('Failed to add item to cart:', err);
      }
    });
  }
}