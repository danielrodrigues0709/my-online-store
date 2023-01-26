import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  adressForm!: FormGroup;
  paymentForm!: FormGroup;
  products: { product: Product; quantity: any; }[] = [];
  values: {
    total: number,
    discount: number,
    totalWithDiscount: number,
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
    ) {
    const nav = this.router.getCurrentNavigation()?.extras.state;
    this.values = nav ? nav['values'] : {
      total: 0,
      discount: 0,
      totalWithDiscount: 0
    }
    this.createForm();
  }

  ngOnInit(): void {
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
    history.back()
  }

  submit(): void {
    if(this.adressForm.invalid || this.paymentForm.invalid) return;
    
    console.log(this.adressForm.value)
    console.log(this.paymentForm.value)
  }

}
