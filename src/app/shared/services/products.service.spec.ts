import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { toArray } from 'rxjs';

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

  it('should return all products', inject([ProductsService], async(productsService: ProductsService) => {
    let array = [];
    await productsService.getProducts().subscribe(res => {
      res.forEach((element: any) => {
        array.push(element)
      });
      expect(array.length).toBeGreaterThan(700);
    })
    
    
    // const url = service.apiUrl;
    // const http = httpController.expectOne(service.apiUrl)
  }));
});
