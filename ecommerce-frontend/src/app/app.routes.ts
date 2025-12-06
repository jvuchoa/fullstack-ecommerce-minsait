import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/product-list/product-list.component';
import { ProductRegistrationComponent } from './pages/product-registration/product-registration.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/new', component: ProductRegistrationComponent },
  { path: 'products/edit/:id', component: ProductRegistrationComponent },
  { path: 'cart', component: CartComponent }
];