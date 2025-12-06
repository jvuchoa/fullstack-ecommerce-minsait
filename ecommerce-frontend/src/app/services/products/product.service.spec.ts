import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer GET', () => {
    service.findAll().subscribe();
    const req = httpMock.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('deve fazer POST', () => {
    const product = { name: 'Teste', barcode: '123', price: 100 };
    service.create(product).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toBe('POST');
    req.flush(product);
  });
});