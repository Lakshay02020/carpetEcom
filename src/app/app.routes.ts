import { Routes } from '@angular/router';
import { ProductListPage } from './features/product/pages/product-list/product-list.page';  // Update the path if necessary
import {ProductDetailsPage} from './features/product/pages/product-details/product-details/product-details.page'; // Update the path if necessary
import { OrderSuccessComponent } from './features/order/pages/order-success/order-success.component'; // Update the path if necessary
import { CartPage } from './features/cart/pages/cart/cart.page';
import { OrderCheckoutPage } from './features/order/pages/order-checkout/order-checkout.page';
export const appRoutes: Routes = [
  { path: '', component: ProductListPage },  // Redirect to /product by default
  { path: 'product', component: ProductListPage },  // Product List Page route
  { path: 'product-details/:id', component: ProductDetailsPage },  // Product Details Page route
  { path: 'cart/:userId', component: CartPage},
  { path: 'order-success', component: OrderSuccessComponent},
  { path: 'checkout', component: OrderCheckoutPage}, // Assuming you have a checkout order page 
];
