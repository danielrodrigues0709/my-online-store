import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Cart } from 'src/app/shared/interfaces/cart';
import { Product } from 'src/app/shared/interfaces/product';
import { CartsService } from 'src/app/shared/services/carts.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  adressForm!: FormGroup;
  paymentForm!: FormGroup;
  cart!: Cart;
  products: { product: Product; quantity: any; }[] = [];
  values: any;
  nav: any;
  allowGoBack: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private cartService: CartsService,
    ) {
    this.createForm();
    this.nav = this.router.getCurrentNavigation()?.extras.state;
    this.values = this.nav ? this.nav['values'].values : {
      total: 0,
      discount: 0,
      totalWithDiscount: 0
    }
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.products = this.cart?.products;
  }

  createForm(): void {
    this.adressForm = this.formBuilder.group({
      adress: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip_code: ['', Validators.required],
    });
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      expiry_date: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  goBack(): void {
    this.router.navigate(['/cart/resume']);
  }

  canGoBack(route: string): boolean {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to leave this page?',
      reject: () => { this.allowGoBack = false; },
      accept: () => { 
        this.allowGoBack = true;
        this.router.navigate([route]);
      }
    });
    return this.allowGoBack;
  }

  submit(): void {
    if(this.adressForm.invalid || this.paymentForm.invalid) return;
    this.cartService.setCart({
      ...this.cart,
      products: []
    });
    this.router.navigate(['/cart/confirmation'], {state: { resume: {
      values: this.values,
      products: this.products
    }}});
  }

}
