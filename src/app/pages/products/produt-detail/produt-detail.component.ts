import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
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

  constructor(private route: ActivatedRoute, private productService: ProductsService) {
    this.createForm();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProducts(this.id).subscribe(res => {
      this.product = res;
    })
  }

  createForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl()
  });
  }

}
