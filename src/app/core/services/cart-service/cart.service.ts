import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Adjust the import path as necessary
import { CartItem } from '../../models/cartItem.model'; // Adjust the import path as necessary
import { Cart } from '../../models/cart.model'; // Adjust the import path as necessary
import { Product } from '../../models/product.model';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  clearCart(cart: Cart): Observable<Cart> {
    return of(cart);
  }
  
  private apiUrl = `${environment.cartApi}`; // assuming /cart is the base

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCartItems(): Observable<Cart> {
      const userId = this.authService.getUserId();
      console.log("Fetching cart items for userId: ", userId);
      return this.http.get<Cart>(`${this.apiUrl}/${userId}`);
  }

  updateCartItem(productId: string, itemQuantity: number): Observable<string> {
    console.log("Inside cart service: ", productId, itemQuantity);
    const userId = this.authService.getUserId(); // Use provided userId or fallback to auth service
    return this.http.post<string>(
      `${this.apiUrl}/${userId}/updateQuantity/${productId}?quantity=${itemQuantity}`, 
      null, 
      { responseType: 'text' as 'json' }
    );
  }
}