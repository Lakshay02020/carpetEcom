import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../core/services/product.service';
import { Product } from '../../../../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.css']
})
export class ProductDetailsPage implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Fetched Product ID from route:', productId);
  
    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (data) => {
          console.log('Product data loaded:', data);
          this.product = data;
        },
        error: (err) => {
          console.error('Error loading product:', err);
        }
      });
    }
  }
  
}
