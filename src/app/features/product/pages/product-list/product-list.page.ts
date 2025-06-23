import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service/product.service';
import { CartService } from '../../../../core/services/cart-service/cart.service';
import { Product } from '../../../../core/models/product.model';
import { RouterModule}  from '@angular/router';
import { CartItem } from '../../../../core/models/cartItem.model';
import { Cart } from '../../../../core/models/cart.model';
import { getRandomPlaceholderImage } from '../../../imageUtils';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ INCLUDE IT HERE
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css'],
})

export class ProductListPage implements OnInit {
  products: Product[] = [];
  cart: Cart | null = null;
  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    console.log('ProductListPage initialized');
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products received:', data);
  
        data.forEach((product, index) => {
          console.log(`Product ${index + 1}:`, product);
        });
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
      });

    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cart = data;
        console.log('Cart data loaded:', this.cart);
      },
      error: (err) => {
        console.error('Failed to load cart', err);
      }
    });
  }

  // TODO : Clicking add button 20 times is too fast for backend, need to add dealy and a scheduled update
  addToCart(product: Product): void {
    const userId = '10'; 
    console.log('Adding to cart:', product);
    const quantity= 1; // Default quantity to add

    const cartItem: CartItem = {
      id: 0, 
      productId: product.id.toString(),
      quantity: quantity,
      price: product.price,
      name: product.name,
      description: product.description
    };

    const existingItem = this.cart?.cartItems.find(item => item.productId === product.id.toString());

    // For Faster UI, Update the cart item quantity immediately
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // If the item does not exist, add it to the cart
      console.log('Item not in cart, adding new item:', cartItem);
      this.cart?.cartItems.push(cartItem);
    }

    this.cartService.updateCartItem(userId, product.id.toString(), quantity).subscribe({
      next: (res) => {
        console.log('Item added to cart confirmed by backend:', res);
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

    const existingItem = this.cart?.cartItems.find(item => item.productId === product.id.toString());

    // For Faster UI, Update the cart item quantity immediately
    if (existingItem) {
      console.log('Item already in cart, decreasing quantity:', existingItem);
      existingItem.quantity -= 1;

      // Remove item from cart if quantity is 0 or less
      if (existingItem.quantity <= 0 && this.cart !== null) {
         this.cart.cartItems = this.cart.cartItems.filter(i => i.productId !== product.id.toString());
      }
    }

    const cartItem: CartItem = {
      id: 0, 
      productId: product.id.toString(),
      quantity: quantity,
      price: product.price,
      name: product.name,
      description: product.description
    };

    console.log("Before cart item updated successfully:", cartItem);
    this.cartService.updateCartItem(userId, cartItem.productId, quantity).subscribe({
      next: (res) => {
        console.log("Quantity decrease. Confirmed by backend")
      },
      error: (err) => {
        console.error('Failed to decrease quantity:', err);
      }
    });
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

scrollToProducts(element: HTMLElement): void {
  element.scrollIntoView({ behavior: 'smooth' });
}

placeholderImages = [
  'assests/images/carpet1.jpg',
  'assests/images/carpet2.jpg',
  'assests/images/carpet3.jpg',
  'assests/images/carpet4.png'
];

getRandomImage(): string {
  return getRandomPlaceholderImage();
}
}