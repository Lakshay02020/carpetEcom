import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Adjust the import path as necessary
import { CartItem } from '../../models/cartItem.model'; // Adjust the import path as necessary
import { Cart } from '../../models/cart.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.cartApi}`; // assuming /cart is the base

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/10`);
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId });
  }
}