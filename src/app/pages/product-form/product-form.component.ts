import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [CurrencyPipe]
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  categories: any[] = [];
  product!: Product;
  value!: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private _productsService: ProductsService,
    private messageService: MessageService,
    private currencyPipe : CurrencyPipe
  ) {
    this.createForm();
    this.categories = [
      {name: "Jewelery", value: "jewelery"},
      {name: "Men's clothing", value: "men's clothing"},
      {name: "Women's clothing", value: "women's clothing"},
    ];
  }

  ngOnInit(): void {
    if(this.config.data?.element) {
      this.product = this.config.data.element;
      this.form.patchValue(this.product);
      this.form.get('price')?.patchValue(this.currencyPipe.transform(this.product.price, '$'));
    }
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      category: ['jewelery', Validators.required],
    });
  }

  transformCurrency(event: any): void {
    this.value = Number(event?.target?.value);
    this.form.get('price')?.patchValue(this.currencyPipe.transform(this.value, '$'));
  }

  submit(): void {
    if(this.form.invalid) {
      this.messageService.add({severity:'warn', summary:'Attention', detail:'Please fill out the form!'});
      return;
    };
    let formValue = this.form.value;
    formValue = {
      ...this.form.value,
      price: this.value,
      rating: {
        rate: 4,
        count: 100
      }
    }
    if(this.product) {
      this._productsService.updateProduct(formValue, this.product.id).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Product updated!'});
        this.ref.close(true);
      })
    }
    else {
      this._productsService.saveProduct(formValue).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Product saved!'});
        this.ref.close(true);
      })
    }
  }

}
