import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', component: CartComponent }
];

@NgModule({
  declarations: [
    CartComponent,
    ResumeComponent,
    CheckoutComponent,
    ConfirmationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class CartModule { }
