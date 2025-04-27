import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart-service/cart.service';
import { Cart } from '../../../../core/models/cart.model'; // Adjust the import path as necessary
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order-service/order.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.css'],
})
export class CartPage implements OnInit {
  cart: Cart | null = null;

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {}

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

  onPlaceOrder(): void {
    const cartItems = this.cart?.cartItems || []; // fallback to empty array
    console.log('OnplaceOrder Called, Cart items:', cartItems);
    if (cartItems.length === 0) {
      console.error('No cart items found');
      return; // don't place empty orders
    }
  
    if (!this.cart) {
      console.error('Cart is null, cannot place order');
      return;
    }
    this.orderService.placeOrder(this.cart).subscribe({
      next: (order) => {
        console.log('Order placed successfully:', order);
        this.router.navigate(['/order-success']); // Navigate to success page
      },
      error: (err) => {
        console.error('Failed to place order:', err);
        // Optional: show error notification to user
      }
    });
  }
  
}
