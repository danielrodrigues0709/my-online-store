import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/shared/interfaces/cart';
import { Product } from 'src/app/shared/interfaces/product';
import { CartsService } from 'src/app/shared/services/carts.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-produt-detail',
  templateUrl: './produt-detail.component.html',
  styleUrls: ['./produt-detail.component.scss']
})
export class ProdutDetailComponent implements OnInit {

  id!: string;
  form!: FormGroup;
  product!: Product;
  cart!: Cart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cartService: CartsService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
    ) {
    this.createForm();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProducts(this.id).subscribe(res => {
      this.product = res;
      this.form.get('rating')?.patchValue(this.product.rating.rate);
    });
    this.cart = this.cartService.getCart();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      quantity: [''],
      rating: ['']
    });
  }

  goBack(): void {
    history.back()
  }

  proceedToCart(): void {
    this.router.navigate(['/cart']);
  }

  addToCart(value: any): void {
    let products: { product: Product; quantity: any; }[] = [];
    this.cart?.products.forEach(prod => {
      products.push(prod);
    });

    let prod = this.cart?.products.find(p => p.product == this.product);
    if(prod) {
      prod.quantity = value;
    }
    else {
      products.push({
        product: this.product,
        quantity: value
      })
    }

    this.cart = {
      id: 1,
      date: new Date(),
      userId: 1,
      products: products
    };
    this.cartService.setCart(this.cart);
    this.messageService.add({severity:'success', summary:'Success', detail:'Product added to cart'});
  }

}
