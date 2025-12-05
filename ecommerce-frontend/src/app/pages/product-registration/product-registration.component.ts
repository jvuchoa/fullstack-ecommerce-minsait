import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent {
   productId?: number;
  isEditMode = false;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    barcode: new FormControl('', [Validators.required, Validators.minLength(8)]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)])
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
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: (err) => {
        alert('Erro ao carregar produto.');
        this.router.navigate(['/products']);
      }
    });
  }
    onSubmit(): void {
    if (this.productForm.invalid) {
      alert('Por favor, corrija os erros no formulário.');
      return;
    }
    const product = this.productForm.value;

    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, product as any).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/products']);
        },
        error: () => {
          alert('Erro ao atualizar produto.');
        }
      });
  }else{
      this.productService.create(product as any).subscribe({
        next: () => {
          alert('Produto criado com sucesso!');
          this.router.navigate(['/products']);
        },
        error: () => {
          alert('Erro ao criar produto.');
        }
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/products']);
  }
}