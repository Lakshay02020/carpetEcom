import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart-service/cart.service';
import { Cart } from '../../../../core/models/cart.model'; // Adjust the import path as necessary
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.css'],
})
export class CartPage implements OnInit {
  cart: Cart | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cart = data;
        console.log('Cart data loaded:', this.cart);
      },
      error: (err) => {
        console.error('Failed to load cart', err);
      }
    });
  }

  // getTotalPrice(): number {
  //   return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // }
}
