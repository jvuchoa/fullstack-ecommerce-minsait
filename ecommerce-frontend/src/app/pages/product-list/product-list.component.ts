import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { CartService } from '../../services/shopping-cart/cart.service';
import { Product } from '../../models/product.model';
import { TableComponent } from '../../components/table/table.component';
import id from '@angular/common/locales/extra/id';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TableComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Carrega produtos 
  loadProducts(): void {
    this.productService.findAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        alert('Erro ao carregar produtos. Verifique se o backend está rodando.');
      }
    });
  }

  // Remover item 
  handleDelete(id: number): void {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          // Atualiza a lista 
          this.products = this.products.filter(p => p.id !== id);
          alert('Produto excluído com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
          alert('Erro ao excluir produto');
        }
      });
    }
  }

  // Adicionar produto ao carrinho
  handleAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.name} adicionado ao carrinho!`);
  }
}