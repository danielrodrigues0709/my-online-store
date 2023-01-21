import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  jewelery: Product[] = [];
  mensClothing: Product[] = [];
  womensClothing: Product[] = [];

  items!: MenuItem[];

  constructor(
    private _productsService: ProductsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let jewelery$ = this._productsService.getProducts("category/jewelery");
    let mensClothing$ = this._productsService.getProducts("category/men's clothing");
    let womensClothing$ = this._productsService.getProducts("category/women's clothing");
    forkJoin([jewelery$, mensClothing$, womensClothing$]).subscribe((res: any) => {
      this.jewelery = res[0];
      this.mensClothing = res[1];
      this.womensClothing = res[2];

      this.products = [
        ...this.jewelery,
        ...this.mensClothing,
        ...this.womensClothing,
      ]
    })
  }

  onSelectProduct(event: any): void {
    this.router.navigate(['products/product-detail/', event.id]);
  }

}
