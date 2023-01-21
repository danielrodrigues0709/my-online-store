import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    ) {
    this.createForm();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProducts(this.id).subscribe(res => {
      this.product = res;
      this.form.get('rating')?.patchValue(this.product.rating.rate);
    })
  }

  createForm(): void {
    this.form = new FormGroup({
      quantity: new FormControl(),
      rating: new FormControl()
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

}
