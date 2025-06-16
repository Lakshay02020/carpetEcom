import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Cart } from '../../../../core/models/cart.model';
import { CartItem } from '../../../../core/models/cartItem.model';
import { CheckoutService } from '../../../../core/services/checkout-service/checkout.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/order-service/order.service';


@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-checkout.page.html',
  styleUrls: ['./order-checkout.page.css']
})

export class OrderCheckoutPage {

  cart: Cart | null = null; 
  cartItems: CartItem[] = [];
  itemTotal: number = 0;
  deliveryCharge: number = 400; // Example delivery charge
  grandTotal: number = 0;
  isPlacingOrder: boolean = false;

  constructor(private checkoutService: CheckoutService, private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
  this.getCartData();
  }


  getCartData(): void {
    console.log('Navigation state:', history.state.ca);
    const state = history.state as { cartData: Cart, cartItems: CartItem[] };
    if (state?.cartData) {
      this.cart = state.cartData;
      console.log('Cart data received:', this.cart);
      this.cartItems = state.cartItems; // Ensure cartItems is an array
      console.log('Cart items received:', this.cartItems);

    // Calculate item total
    if (this.cartItems && this.cartItems.length > 0) {
    console.log('Calculating totals for cart items:', this.cartItems);
    this.itemTotal = this.cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    this.itemTotal = parseFloat(this.itemTotal.toFixed(2));

    if (this.itemTotal > 5000) {
      this.deliveryCharge = 0; // Free delivery for orders above 5000
    } else {
      this.deliveryCharge = 100;
    }

    this.deliveryCharge = parseFloat(this.deliveryCharge.toFixed(2));
    this.grandTotal = parseFloat((this.itemTotal + this.deliveryCharge).toFixed(2));
    }
    } else {
      console.warn('No cart data found in navigation state.');
    }
  }

  totalAmount = 539;

  placeOrder() {
    this.isPlacingOrder = true;
    const userInfo = {
      name: 'Lakshay Singla',
      email: 'lakshay@example.com',
      contact: '9876543210'
    };

    this.checkoutService.createOrder(this.totalAmount).subscribe(order => {
      this.checkoutService.openRazorpay(order, userInfo, 
        () => {
          console.log('Payment successful, proceeding to place order');
          console.log('Cart before placing order:', this.cart);
          if (this.cart) {
            this.orderService.placeOrder(this.cart, "PAYMENT_SUCCESS"). subscribe(
              order => {
                console.log('Order placed successfully:', order);
                this.router.navigate(['/order-success'], { state: { order } });
              }
            );
          } else {
            console.error('Cart is null, cannot place order.');
          }
        },
        () => {
          this.isPlacingOrder = false;
          // Failure callback
          console.error('Handle failed payment gracefully');
        }
      );
    });
}


}