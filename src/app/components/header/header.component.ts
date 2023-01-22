import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/interfaces/cart';
import { User } from 'src/app/shared/interfaces/user';
import { CartsService } from 'src/app/shared/services/carts.service';
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

  constructor(
    private usersService: UsersService,
    private cartService: CartsService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartUpdated.subscribe(res => {
      this.cart = res;
      this.items = (this.cart.products.length).toString();
    });

    this.usersService.getUsers('1').subscribe(res => {
      this.user = res;
    })
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

}
