import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutDetailComponent } from './produt-detail/produt-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

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
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
    RatingModule,
    MessagesModule,
    ToastModule,
    CommonModule
  ],
  providers: [MessageService],
})
export class ProductsModule { }
