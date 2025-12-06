import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../../models/product.model';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    id: 1,
    name: 'Notebook',
    barcode: '123456789',
    price: 1000
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar produto ao carrinho', (done) => {
    service.addToCart(mockProduct);

    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      done();
    });
  });

  it('deve calcular o total corretamente', () => {
    service.addToCart(mockProduct);
    expect(service.getTotal()).toBe(1000);
  });

  it('deve contar itens do carrinho', () => {
    service.addToCart(mockProduct);
    expect(service.getItemCount()).toBe(1);
  });

  it('deve remover produto do carrinho', (done) => {
    service.addToCart(mockProduct);
    service.removeFromCart(1);

    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('deve limpar o carrinho', (done) => {
    service.addToCart(mockProduct);
    service.clearCart();

    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });
});