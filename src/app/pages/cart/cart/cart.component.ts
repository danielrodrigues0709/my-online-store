import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/shared/interfaces/cart';
import { Coupon } from 'src/app/shared/interfaces/coupon';
import { Product } from 'src/app/shared/interfaces/product';
import { CartsService } from 'src/app/shared/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getCart();
    this.cartService.getCoupons().subscribe(res => {
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
    this.form = new FormGroup({
      coupon: new FormControl(),
    });
  }

  goBack(): void {
    history.back()
  }

  canGoBack(): boolean {
    confirm("Are you sure that you want to leave this page?");
    return true;
  }

  goToCheckout(): void {
    this.router.navigate(['/cart/checkout']);
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

}
