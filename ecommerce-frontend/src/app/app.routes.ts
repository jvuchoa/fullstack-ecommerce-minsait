import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'products', loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ListagemProdutosComponent)},
    {path: 'products/new', loadComponent: () => import('./pages/product-registration/product-registration.component').then(m => m.ProductRegistrationComponent)},
    {path: 'products/edit/:id', loadComponent: () => import('./pages/product-registration/product-registration.component').then(m => m.ProductRegistrationComponent)},
    {path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)},
];
