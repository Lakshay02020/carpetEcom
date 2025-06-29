import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order-service/order.service';
// Update the path below if AuthService is located elsewhere
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { Order } from '../../../../core/models/order.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.css']
})

export class MyOrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId) {
      this.orderService.getOrdersByUserId(userId).subscribe({
        next: (orders) => {
          this.orders = orders;
        },
        error: (err) => {
          console.error('Failed to fetch orders:', err);
        }
      });
    } else {
      console.warn('User not logged in, cannot fetch orders.');
    }
  }

  viewOrder(order: Order): void {
    console.log('View order details:', order);
    // You can route to order details page or open a modal
  }
}
