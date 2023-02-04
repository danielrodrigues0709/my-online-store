import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { User } from 'src/app/shared/interfaces/user';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];
  users: User[] = [];
  role!: boolean;

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUsers();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe((res: any) => {
      res.forEach((element: Product) => {
        this.products.push(element);
      });
    })
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe((res: any) => {
      res.forEach((element: User) => {
        this.users.push(element);
      });
    })
  }

  removeProduct(product: Product): void {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.products = [];
      this.getProducts();
    })
  }

  editProduct(product: Product): void {
    
  }

  onRoleChange(event: any, userSelected: User): void {
    let user = userSelected;
    user.role = event.checked;
    this.usersService.updateUser(user, user.id).subscribe(res => {
      console.log(res);
      
    })
    
  }

}
