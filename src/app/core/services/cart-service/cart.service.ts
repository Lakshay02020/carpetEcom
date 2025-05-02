import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Adjust the import path as necessary
import { CartItem } from '../../models/cartItem.model'; // Adjust the import path as necessary
import { Cart } from '../../models/cart.model'; // Adjust the import path as necessary
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  clearCart(cart: Cart): Observable<Cart> {
    return of(cart);
  }
  
  private apiUrl = `${environment.cartApi}`; // assuming /cart is the base

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/10`);
  }

  updateCartItem(userId: string, productId: string, itemQuantity: number): Observable<string> {
    console.log("Inside cart service: ", productId, itemQuantity);
    return this.http.post<string>(
      `${this.apiUrl}/${userId}/updateQuantity/${productId}?quantity=${itemQuantity}`, 
      null, 
      { responseType: 'text' as 'json' }
    );
  }
}