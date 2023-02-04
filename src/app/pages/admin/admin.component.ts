import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/shared/interfaces/product';
import { User } from 'src/app/shared/interfaces/user';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ DialogService ]
})
export class AdminComponent implements OnInit {

  products: Product[] = [];
  users: User[] = [];
  admin!: boolean;
  ref!: DynamicDialogRef;

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    public dialogService: DialogService,
    private messageService: MessageService
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
      this.messageService.add({severity:'success', summary:'Success', detail:'Product removed!'});
    })
  }

  showModal(element?: Product) {
    this.ref = this.dialogService.open(ProductFormComponent, {
        header: 'Product',
        width: '70%',
        data: {
          element: element
        }
    })
    this.ref.onClose.subscribe((changes: boolean) => {
      if(changes) {
        this.products = [];
        this.getProducts();
      }
    });
  }
  
  onRoleChange(event: any, userSelected: User): void {
    let user = userSelected;
    user.admin = event.checked;
    this.usersService.updateUser(user, user.id).subscribe(() => {});
  }

}
