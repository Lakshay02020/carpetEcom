export interface CartItem {
  id: number;
  productId: string;
  name: string | null;
  description: string | null;
  quantity: number;
  price: number;
}
