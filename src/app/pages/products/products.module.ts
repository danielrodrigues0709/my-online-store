import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutDetailComponent } from './produt-detail/produt-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'product-detail', pathMatch: 'full' },
  { path: 'product-detail', component: ProdutDetailComponent },
];

@NgModule({
  declarations: [
    ProdutDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProductsModule { }
