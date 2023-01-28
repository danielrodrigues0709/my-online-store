import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/interfaces/cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartsService } from 'src/app/shared/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: string = '0';
  cart!: Cart;
  user!: any;
  userDataStr = sessionStorage.getItem('userData');

  constructor(
    private authService: AuthService,
    private cartService: CartsService,
    private router: Router) {
      if(this.userDataStr != null) {
        this.user = JSON.parse(this.userDataStr);
      }
    }

  ngOnInit(): void {
    this.cartService.cartUpdated.subscribe(res => {
      this.cart = res;
      this.items = (this.cart.products.length).toString();
    });
    this.getUser();
  }

  getUser(): any {
    this.authService.userUpdated.subscribe(res => {
      this.user = res;
      return this.user;
    })
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  myAccount(): void {
    if(this.user) {
      this.router.navigate(['/my-account']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  signOut(): void {
    this.user = null;
    sessionStorage.clear();
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

}
