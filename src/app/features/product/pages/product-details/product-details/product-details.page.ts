import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../core/services/product-service/product.service';
import { CartService } from '../../../../../core/services/cart-service/cart.service';
import { Product } from '../../../../../core/models/product.model';
import { Cart } from '../../../../../core/models/cart.model'; // Adjust the import path as necessary
import { CartItem } from '../../../../../core/models/cartItem.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.css']
})
export class ProductDetailsPage implements OnInit {
  product: Product | null = null;
  cart: Cart | null = null; // Assuming you have a Cart model defined somewhere

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService // Assuming you need this for cart operations
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Fetched Product ID from route:', productId);
    this.refreshCart(); // Refresh the cart when the component initializes
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
  
    // Assuming this.cartItems is an array of CartItem
isInCart(productId: number): boolean {
  const productIdStr = productId.toString(); // Ensure productId is a string
  return this.cart?.cartItems?.some(item => item.productId == productIdStr) ?? false;
}

getCartItemQuantity(productId: number): number {
  const productIdStr = productId.toString();
  const item = this.cart?.cartItems?.find(item => item.productId === productIdStr);
  return item ? item.quantity : 0;
}

refreshCart(): void {
  this.cartService.getCartItems().subscribe({
    next: (data) => {
      this.cart = data;
      console.log('Cart refreshed:', this.cart);
    },
    error: (err) => {
      console.error('Failed to refresh cart:', err);
    }
  });
}

  addToCart(product: Product): void {
    const userId = '10'; 
    console.log('Adding to cart:', product);
    const quantity= 1; // Default quantity to add

    const cartItem: CartItem = {
      id: 0, 
      productId: product.id.toString(),
      quantity: quantity,
      price: product.price
    };

    this.cartService.updateCartItem(userId, product.id.toString(), quantity).subscribe({
      next: (res) => {
        cartItem.quantity = cartItem.quantity + 1; // Update the item quantity in the cart
        this.refreshCart();
        console.log('Item added to cart:', res);
      },
      error: (err) => {
        console.error('Failed to add item to cart:', err);
      }
    });
  }

  decreaseQuantity(product: Product): void {
    const userId = '10'; 
    console.log('Decreasing quantity for:', product);
    const quantity= -1; // Decrease quantity by 1

    const cartItem: CartItem = {
      id: 0, 
      productId: product.id.toString(),
      quantity: quantity,
      price: product.price
    };

    this.cartService.updateCartItem(userId, cartItem.productId, quantity).subscribe({
      next: (res) => {
        cartItem.quantity = cartItem.quantity - 1; // Update the item quantity in the cart
        this.refreshCart();
        console.log('Quantity decreased:', res);
      },
      error: (err) => {
        console.error('Failed to decrease quantity:', err);
      }
    });
  }
}
