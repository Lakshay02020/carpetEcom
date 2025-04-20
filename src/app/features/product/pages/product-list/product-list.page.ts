import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], // ✅ INCLUDE IT HERE
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css'],
})

export class ProductListPage implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('ProductListPage initialized');
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    // You can later connect this to a cart service
  }
}