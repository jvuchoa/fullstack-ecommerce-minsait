import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent implements OnInit {
   productId?: number;
  isEditMode = false;

  productForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
  barcode: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)])
  });

  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = +params['id'];
        this.isEditMode = true;
        this.loadProduct(this.productId);
      }
    });

}
  
  loadProduct(id: number): void {
    this.productService.findById(id).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
      },
      error: () => {
        alert('Erro ao carregar produto');
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(): void {
    console.log('Form válido?', this.productForm.valid);
    console.log('Form value:', this.productForm.value);

    if (this.productForm.invalid) {
      alert('Preencha todos os campos corretamente');
      return;
    }

    const formValue = this.productForm.getRawValue();
    
    const product: Product = {
      name: formValue.name || '',
      barcode: formValue.barcode || '',
      price: Number(formValue.price) || 0
    };

    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, product).subscribe({
        next: () => {
          alert('Produto atualizado!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          alert('Erro ao atualizar');
        }
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          alert('Produto cadastrado!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          alert('Erro ao cadastrar');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}