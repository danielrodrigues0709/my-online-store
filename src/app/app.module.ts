import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpInterceptorService } from './shared/interceptors/http.interceptor';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { AddressFormComponent } from './pages/address-form/address-form.component';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AddressFormComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    TabViewModule,
    CardModule,
    BadgeModule,
    AvatarModule,
    MessagesModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    SplitButtonModule,
    ButtonModule,
    ProgressSpinnerModule,
    TooltipModule,
    ToastModule,
    DropdownModule,
    AccordionModule,
    TableModule,
    CalendarModule,
    DynamicDialogModule,
    CheckboxModule,
    InputSwitchModule,
    InputTextareaModule
  ],
  providers: [HttpClient, MessageService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
