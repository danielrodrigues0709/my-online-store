import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private cartService: CartsService) {
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
    this.totalWithDiscount = this.total;
  }

  createForm(): void {
    this.form = new FormGroup({
      coupon: new FormControl(),
    });
  }

  goBack(): void {
    history.back()
  }

  removeFromCart(product: any): void {
    let item = this.cart.products.find(p => p == product);
    let index = this.cart.products.indexOf(item);
    this.cart.products.splice(index, 1);
    this.cartService.setCart(this.cart);
    this.getCart();
  }

  getTotal() {
    this.total = 0;
    this.cart?.products.forEach(prod => {
      this.total = this.total + prod.product.price * prod.quantity;
    })
    return this.total;
  }

  applyDiscount(coupon: any) {
    if(this.applied) return;
    let discount = this.coupons.find(cp => cp.name == coupon.value);
    this.discount = discount ? this.total*discount.offPercent/100 : 0;
    this.totalWithDiscount = this.total - this.discount;
    this.applied = true;
  }

}
