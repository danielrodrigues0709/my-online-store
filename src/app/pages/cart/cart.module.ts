import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckoutGuard } from './checkout/checkout.guard';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], canDeactivate: [CheckoutGuard] },
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard] },
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
    ToastModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ConfirmDialogModule,
    CommonModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class CartModule { }
