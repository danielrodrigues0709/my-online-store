import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { toArray } from 'rxjs';
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products', (done) => {
    service.getProducts().subscribe((res: any) => {
      expect(res.length).toBeGreaterThan(7);
      done();
      });
    
    const http = httpController.expectOne(service.apiUrl)
    http.flush(productsList)
  });
});
