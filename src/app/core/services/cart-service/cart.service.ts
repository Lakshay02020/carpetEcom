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

  addToCart(userId: string, product: Product): Observable<string> {
    const cartItem: CartItem = {
      id: 0, 
      productId: product.id.toString(),
      quantity: 1,
      price: product.price
    };
    console.log("Inside cart service: ", cartItem)
    return this.http.post(`${this.apiUrl}/${userId}/items`, cartItem, {
      responseType: 'text' as const 
    });
  }
}