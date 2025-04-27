import { OrderItem } from './order-item.model'; // We'll create this next

export interface Order {
  id?: number; // id might not exist before placing order
  userId: string;
  totalAmount: number;
  shippingAddress: string;
  paymentMode: string;
  status?: 'PENDING' | 'COMPLETED' | 'CANCELLED'; // Match your OrderStatus enum
  items: OrderItem[];
  createdAt?: string; // ISO String
  updatedAt?: string; // ISO String
}
