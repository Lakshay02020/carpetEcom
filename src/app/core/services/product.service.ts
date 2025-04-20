import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; // Adjust the import path as necessary
import { environment } from '../../../environments/environment'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.productApi}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
