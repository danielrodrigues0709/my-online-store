import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutDetailComponent } from './produt-detail/produt-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'product-detail', pathMatch: 'full' },
  { path: 'product-detail/:id', component: ProdutDetailComponent },
];

@NgModule({
  declarations: [
    ProdutDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ProductsModule { }
