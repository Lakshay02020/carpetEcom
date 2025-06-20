import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Order } from '../../models/order.model';
import { OrderItem } from '../../models/order-item.model';
import { CartService } from '../cart-service/cart.service'; // Ensure correct path
import { Cart } from '../../models/cart.model';       // Ensure correct path
import { CartItem } from '../../models/cartItem.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.orderApi;

  constructor(private http: HttpClient, private cartService: CartService) {}

  /**
   * Clears the user's cart.
   * @returns An Observable that completes when the cart is cleared.
   */
  clearCart(): Observable<void> {
    // Wrap the implementation in an Observable
    return of(undefined); // Replace with actual logic if needed
  }

  /**
   * Maps CartItem objects to OrderItem objects.
   * @param cartItems The array of CartItem objects from the cart.
   * @returns An array of OrderItem objects.
   */
  private mapCartItemsToOrderItems(cartItems: CartItem[]): OrderItem[] {
    return cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
  }


  private buildOrder(cartItems: CartItem[], paymentMode: string): Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'> {
    console.log("Building order...")
    const orderItems = this.mapCartItemsToOrderItems(cartItems);
    const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    //  In a real app, you would get this data from the user's session,
    //  or from input fields in the checkout form.  This is hardcoded for demonstration.
    const userId = '10';
    const shippingAddress = 'House no 549, Patiala Chowk, Punjab';

    console.log("Order built!")
    return {
      userId,
      totalAmount,
      shippingAddress,
      paymentMode,
      items: orderItems,
    };
  }

  /**
   * Places an order using the provided cart.  Clears the cart upon successful order placement.
   * @param cart The user's cart.
   * @returns An Observable that emits the placed Order object.
   */
  placeOrder(cart: Cart,  paymentMode: string): Observable<Order> {
    console.log('Placing order...');

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return throwError(() => new Error('Cart is empty'));
    }
    
    const order = this.buildOrder(cart.cartItems, paymentMode);
    console.log('Order to be placed:', order);
    return this.http.post<Order>(`${this.apiUrl}/placeOrder`, order).pipe(
      tap((placedOrder) => console.log('Order placed successfully:', placedOrder)),
      catchError((err) => {
        console.error('Error placing order:', err);
        return throwError(() => new Error('Failed to place order'));
      }),
      switchMap((placedOrder) => {
        // Clear the cart after a successful order.
        return this.cartService.clearCart(cart).pipe(
          catchError((clearCartErr) => {
            console.error('Error clearing cart:', clearCartErr);
            return of(placedOrder); //  Important: Return the order, even if clearing cart fails.
          }),
          switchMap(() => of(placedOrder)) //ensure placedOrder is returned.
        );
      })
    );
  }
}
