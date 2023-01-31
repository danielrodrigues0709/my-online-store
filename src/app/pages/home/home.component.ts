import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  protected ngUnsubscribe: Subject<any> = new Subject();
  products: Product[] = [];
  jewelery: Product[] = [];
  mensClothing: Product[] = [];
  womensClothing: Product[] = [];
  selectedProduct: Product | undefined;

  items!: MenuItem[];

  constructor(
    private _productsService: ProductsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let jewelery$ = this._productsService.getProductsByCategory("jewelery");
    let mensClothing$ = this._productsService.getProductsByCategory("men's clothing");
    let womensClothing$ = this._productsService.getProductsByCategory("women's clothing");
    forkJoin([jewelery$, mensClothing$, womensClothing$]).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
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
  
  onSubscriptionsDestroy(ngUnsubscribe: Subject<any>): void {
    ngUnsubscribe.next(true);
	  ngUnsubscribe.complete();
	  ngUnsubscribe.unsubscribe();
	}

	ngOnDestroy(): void {
	  this.onSubscriptionsDestroy(this.ngUnsubscribe);
	}

}
