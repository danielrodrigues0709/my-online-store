import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CartGuard } from './cart/cart.guard';

const routes: Routes = [
  { path: '', component: CartComponent, canDeactivate: [CartGuard]},
  { path: 'resume', component: ResumeComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]  },
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard]  },
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
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    CommonModule
  ],
  providers: [MessageService],
})
export class CartModule { }
