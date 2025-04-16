import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css'],
})
export class ProductListPage {
  products = [
    { id: 1, name: 'Carpet 1', price: 50 },
    { id: 2, name: 'Carpet 2', price: 75 },
    { id: 3, name: 'Carpet 3', price: 100 },
  ];
}
