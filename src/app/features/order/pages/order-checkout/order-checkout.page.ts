import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Cart } from '../../../../core/models/cart.model';
import { CartItem } from '../../../../core/models/cartItem.model';
import { CheckoutService } from '../../../../core/services/checkout-service/checkout.service';


@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './order-checkout.page.html',
  styleUrls: ['./order-checkout.page.css']
})
export class OrderCheckoutPage {

  cart: Cart | null = null; 
  cartItems: CartItem[] = [];

  constructor(private checkoutService: CheckoutService, private router: Router) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    const state = history.state as { cartData: CartItem[] };

    if (state?.cartData) {
      this.cartItems = state.cartData;
      console.log('Cart items received:', this.cartItems);
    } else {
      console.warn('No cart data found in navigation state.');
    }
  }

  totalAmount = 539;

  placeOrder() {
    const userInfo = {
      name: 'Lakshay Singla',
      email: 'lakshay@example.com',
      contact: '9876543210'
    };

    this.checkoutService.createOrder(this.totalAmount).subscribe(order => {
      this.checkoutService.openRazorpay(order, userInfo, 
        () => {
          // Success callback
          console.log('Navigate to order success page or clear cart');
           this.router.navigate(['/order-success']);
        },
        () => {
          // Failure callback
          console.error('Handle failed payment gracefully');
        }
      );
    });
}
}