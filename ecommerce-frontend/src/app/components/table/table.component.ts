import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
  
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  
  @Input() products: Product[] = [];
  
  @Output() deleteProduct = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<Product>();

  onDelete(id: number | undefined): void {
    if (id) {
      this.deleteProduct.emit(id);
    }
  }

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
