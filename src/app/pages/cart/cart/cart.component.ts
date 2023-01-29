import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/shared/interfaces/cart';
import { Coupon } from 'src/app/shared/interfaces/coupon';
import { Product } from 'src/app/shared/interfaces/product';
import { CartsService } from 'src/app/shared/services/carts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  protected ngUnsubscribe: Subject<any> = new Subject();
  cart!: Cart;
  form!: FormGroup;
  products: { product: Product; quantity: any; }[] = [];
  total!: number;
  discount!: number;
  totalWithDiscount!: number;
  applied: boolean = false;
  coupon!: Coupon;
  coupons!: Coupon[];

  constructor(
    private cartService: CartsService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getCart();
    this.cartService.getCoupons().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.coupons = res.data;
    });
  }

  getCart(): void {
    this.cart = this.cartService.getCart();
    this.products = this.cart?.products;
    this.getTotal();
    this.discount = 0;
    this.getTotalWithDiscount();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      coupon: [''],
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  goToResume(): void {
    if(!this.cart || this.cart?.products.length == 0) {
      this.messageService.add({severity:'warn', summary:'Attention', detail:'Your cart is empty!'});
      return;
    }
    this.router.navigate(['/cart/resume'], {state: { values: {
      total: this.total,
      discount: this.discount,
      totalWithDiscount: this.totalWithDiscount
    }}});
  }

  onChange(): void {
    if(this.applied) {
      this.discount = 0;
      this.applied = false;
    }
  }

  removeFromCart(product: any): void {
    let item = this.cart.products.find(p => p == product);
    let index = this.cart.products.indexOf(item);
    this.cart.products.splice(index, 1);
    this.messageService.add({severity:'success', summary:'Success', detail:'Product removed'});
    this.cartService.setCart(this.cart);
    this.getCart();
  }

  getTotal(): number {
    this.total = 0;
    this.cart?.products.forEach(prod => {
      this.total = this.total + prod.product.price * prod.quantity;
    })
    return this.total;
  }

  getTotalWithDiscount(): number {
    this.totalWithDiscount = this.total - this.discount;
    return this.totalWithDiscount;
  }

  applyDiscount(coupon: any): void {
    if(this.applied) return;
    let discount = this.coupons.find(cp => cp.name == coupon.value);
    if(discount) {
      this.discount = this.total*discount.offPercent/100
      this.messageService.add({severity:'success', summary:'Success', detail:'Discount applied'});
      this.totalWithDiscount = this.total - this.discount;
      this.applied = true;
    }
    else {
      this.discount = 0;
    }
  }
  
  onSubscriptionsDestroy(ngUnsubscribe: Subject<any>): void {
    ngUnsubscribe.next(true);
	  ngUnsubscribe.complete();
	  ngUnsubscribe.unsubscribe();
	}

	ngOnDestroy(): void {
	  this.onSubscriptionsDestroy(this.ngUnsubscribe);
	}

}
