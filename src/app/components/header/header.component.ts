import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Cart } from 'src/app/shared/interfaces/cart';
import { User } from 'src/app/shared/interfaces/user';
import { CartsService } from 'src/app/shared/services/carts.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: string = '0';
  cart!: Cart;
  user!: User;
  isLoggedIn!: boolean;

  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private cartService: CartsService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartUpdated.subscribe(res => {
      this.cart = res;
      this.items = (this.cart.products.length).toString();
    });
    this.loginService.loginUpdated.subscribe(res => {
      this.isLoggedIn = res;
    });
    this.usersService.getUsers('1').subscribe(res => {
      this.user = res;
    })
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  myAccount(): void {
    if(this.isLoggedIn) {
      this.router.navigate(['/my-account']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  signOut(): void {
    this.loginService.setLogin(false);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

}
