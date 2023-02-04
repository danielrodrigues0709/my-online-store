import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { productsList } from 'src/app/mocks/productsList';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should return products', (done) => {
    service.getProducts().subscribe((res: any) => {
      expect(res.length).toBeGreaterThan(7);
      done();
      });
    
    const http = httpController.expectOne(service.apiUrl)
    expect(http.request.method).toBe("GET");
    http.flush(productsList)
  });

  it('should save product', (done) => {
    let product = productsList[0];
    service.saveProduct(product).subscribe(() => {
      done();
      });
    
    const http = httpController.expectOne(service.apiUrl)
    expect(http.request.method).toBe("POST");
    http.flush(productsList)
  });

  it('should update product', (done) => {
    let id = 1;
    let product = productsList[0];
    service.updateProduct(product, id).subscribe(() => {
      done();
      });
    
    const http = httpController.expectOne(`${service.apiUrl}/${id}`)
    expect(http.request.method).toBe("PATCH");
    http.flush(productsList)
  });

  it('should delete product', (done) => {
    let id = 1;
    service.deleteProduct(id).subscribe(() => {
      done();
      });
    
    const http = httpController.expectOne(`${service.apiUrl}/${id}`)
    expect(http.request.method).toBe("DELETE");
    http.flush(productsList)
  });
});
