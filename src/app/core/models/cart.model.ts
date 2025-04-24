import { CartItem } from './cartItem.model';

export interface Cart {
    id: number;
    userId: string;
    cartItems: CartItem[];
  }