import { Product } from './product.model';

export interface CartItem {
  id: number;
  productId: string;
  quantity: number;
  price: number;
}
