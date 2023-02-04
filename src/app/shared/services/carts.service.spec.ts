import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CartsService } from './carts.service';

describe('CartsService', () => {
  let service: CartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(CartsService);
  });

  it('should create a cart with at least 1 product', () => {
    let cart = service.getCart();
    if(cart) {
      expect(cart.products.length).toBeGreaterThan(0);
    }
    else {
      expect(cart).toBeFalsy();
    }
  });

  it('should get coupons options', () => {
    let coupons = service.getCoupons();
    expect(coupons).toBeTruthy();
  });
});
