import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart-service/cart.service';
import { Cart } from '../../../../core/models/cart.model'; // Adjust the import path as necessary
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order-service/order.service'; // Adjust the import path as necessary
import { Product } from '../../../../core/models/product.model';
import { CartItem } from '../../../../core/models/cartItem.model';
import { getRandomPlaceholderImage } from '../../../imageUtils';  

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

  // onPlaceOrder(): void {
  //   const cartItems = this.cart?.cartItems || []; // fallback to empty array
  //   console.log('OnplaceOrder Called, Cart items:', cartItems);
  //   if (cartItems.length === 0) {
  //     console.error('No cart items found');
  //     return; // don't place empty orders
  //   }
  
  //   if (!this.cart) {
  //     console.error('Cart is null, cannot place order');
  //     return;
  //   }
  //   this.orderService.placeOrder(this.cart, null).subscribe({
  //     next: (order) => {
  //       console.log('Order placed successfully:', order);
  //       this.router.navigate(['/order-success']); // Navigate to success page
  //     },
  //     error: (err) => {
  //       console.error('Failed to place order:', err);
  //     }
  //   });
  // }

    addToCart(item: CartItem): void {
      const userId = '10'; 
      console.log('Adding to cart with product Id:', item.productId);
      
      const existingItem = this.cart?.cartItems.find(cartItem => cartItem.productId === item.productId.toString());

      // For Faster UI, Update the cart item quantity immediately
      if (existingItem) {
        console.log('Item already exists in cart, increasing quantity');
        existingItem.quantity += 1;
      }

      this.cartService.updateCartItem(userId, item.productId, 1).subscribe({
        next: (res) => {
          console.log('Item added to cart confirmed by backend:', res);
        },
        error: (err) => {
          console.error('Failed to add item to cart:', err);
        }
      });
    }
  
    decreaseQuantity(item: CartItem): void {
      const userId = '10'; 
      console.log('Decreasing quantity for product with productId:', item.productId);

      const existingItem = this.cart?.cartItems.find(cartItem => cartItem.productId === item.productId.toString());

      // For Faster UI, Update the cart item quantity immediately
      if (existingItem) {
        console.log('Item already in cart, decreasing quantity:', existingItem);
        existingItem.quantity -= 1;

        // Remove item from cart if quantity is 0 or less
        if (existingItem.quantity <= 0 && this.cart !== null) {
          this.cart.cartItems = this.cart.cartItems.filter(i => i.productId !== item.productId.toString());
        }
      }

      this.cartService.updateCartItem(userId, item.productId, -1).subscribe({
        next: (res) => {
          console.log('Quantity decreased:', res);
        },
        error: (err) => {
          console.error('Failed to decrease quantity:', err);
        }
      });
  }

  // 💰 Calculate subtotal based on product price and quantity
  get subtotal(): number {
    console.log('Calculating subtotal...', this.cart);
    if (!this.cart || !this.cart.cartItems) return 0;
    return this.cart.cartItems.reduce((sum, item) => {
      return Math.floor(sum + (item.price * item.quantity));
    }, 0);
  }

  get shippingCharge(): number {
    console.log('Calculating shipping charge...');
    return this.subtotal > 10000 ? 0 : 200; // Example logic for shipping charge
  }

  get total(): number {
    console.log('Calculating total...');
    return this.subtotal + this.shippingCharge;
  }

  moveToCheckOutPage(): void {
    console.log('Moving to checkout page with cart items...');
    // Replace 'this.cartItems' with your actual cart data variable

    console.log('Cart Page: Cart data:', this.cart);
    if(this.cart != null && this.cart.cartItems != null && this.cart.cartItems.length != 0) {
    this.router.navigate(['/checkout'], {
      state: { cartData: this.cart, cartItems: this.cart.cartItems } // Pass your cart items here
    });
  }
}

getRandomImage(): string {
  return getRandomPlaceholderImage();
}

}
