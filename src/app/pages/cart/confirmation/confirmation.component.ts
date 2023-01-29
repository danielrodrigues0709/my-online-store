import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  products: { product: Product; quantity: any; }[] = [];
  values: {
    total: number,
    discount: number,
    totalWithDiscount: number,
  };

  constructor(
    private router: Router
    ) {
    const nav = this.router.getCurrentNavigation()?.extras.state;
    this.values = nav ? nav['resume'].values : {
      total: 0,
      discount: 0,
      totalWithDiscount: 0
    }
    this.products = nav ? nav['resume'].products : [];
  }

  ngOnInit(): void {
  }

}
