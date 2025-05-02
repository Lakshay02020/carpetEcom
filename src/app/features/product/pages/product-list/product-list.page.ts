import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service/product.service';
import { CartService } from '../../../../core/services/cart-service/cart.service';
import { Product } from '../../../../core/models/product.model';
import { RouterModule}  from '@angular/router';
import { CartItem } from '../../../../core/models/cartItem.model';

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
    const quantity= 1; // Default quantity to add

    const cartItem: CartItem = {
      id: 0, 
      productId: product.id.toString(),
      quantity: quantity,
      price: product.price
    };

    this.cartService.updateCartItem(userId, cartItem.productId, quantity).subscribe({
      next: (res) => {
        console.log('Item added to cart:', res);
      },
      error: (err) => {
        console.error('Failed to add item to cart:', err);
      }
    });
  }

  decreaseQuantity(product: Product): void {
    const userId = '10'; 
    console.log('Decreasing quantity for:', product);
    const quantity= -1; // Decrease quantity by 1

    const cartItem: CartItem = {
      id: 0, 
      productId: product.id.toString(),
      quantity: quantity,
      price: product.price
    };

    this.cartService.updateCartItem(userId, cartItem.productId, quantity).subscribe({
      next: (res) => {
        console.log('Quantity decreased:', res);
      },
      error: (err) => {
        console.error('Failed to decrease quantity:', err);
      }
    });
  }  
}