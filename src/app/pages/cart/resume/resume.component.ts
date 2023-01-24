import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/interfaces/cart';
import { Product } from 'src/app/shared/interfaces/product';
import { CartsService } from 'src/app/shared/services/carts.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  cart!: Cart;
  products: { product: Product; quantity: any; }[] = [];
  values: {
    total: number,
    discount: number,
    totalWithDiscount: number,
  };

  constructor(
    private cartService: CartsService,
    private router: Router
    ) {
      const nav = this.router.getCurrentNavigation()?.extras.state;
      this.values = nav ? nav['values'] : {
        total: 0,
        discount: 0,
        totalWithDiscount: 0
      }
    }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cart = this.cartService.getCart();
    this.products = this.cart?.products;
  }

  goBack(): void {
    history.back()
  }
  
  goToCheckout(): void {
    
  }

}
