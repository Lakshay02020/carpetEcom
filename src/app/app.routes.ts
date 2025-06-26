import { Routes } from '@angular/router';
import { ProductListPage } from './features/product/pages/product-list/product-list.page';  // Update the path if necessary
import {ProductDetailsPage} from './features/product/pages/product-details/product-details/product-details.page'; // Update the path if necessary
import { OrderSuccessComponent } from './features/order/pages/order-success/order-success.component'; // Update the path if necessary
import { CartPage } from './features/cart/pages/cart/cart.page';
import { OrderCheckoutPage } from './features/order/pages/order-checkout/order-checkout.page';
import { LoginPage } from './features/login/login.page';
import { AuthGuard } from './guards/auth.guard';  // Ensure you have an AuthGuard implemented

export const appRoutes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },  // Redirect to /product by default
 
   // Public Routes
  { path: 'login', component: LoginPage },
  // { path: 'register', component: RegisterPage },

  { path: 'product', component: ProductListPage },  // Product List Page route
  { path: 'product-details/:id', component: ProductDetailsPage },  // Product Details Page route
  { path: 'cart/:userId', component: CartPage, canActivate: [AuthGuard]},
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: OrderCheckoutPage, canActivate: [AuthGuard]}, // Assuming you have a checkout order page 

];
