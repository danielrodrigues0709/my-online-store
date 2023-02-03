import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Address } from 'src/app/shared/interfaces/address';
import { User } from 'src/app/shared/interfaces/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ DialogService, DatePipe ]
})
export class UserComponent implements OnInit {

  form!: FormGroup;
  user!: User;
  addresses: Address[] = [];
  ref!: DynamicDialogRef;
  genders: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    private messageService: MessageService,
    private usersService: UsersService,
    private datepipe: DatePipe
    ) {
      this.createForm();
      let userDataStr = localStorage.getItem('userData');
      if(userDataStr != null) this.user = JSON.parse(userDataStr);
      this.genders = [
        {name: 'Male', value: 'male'},
        {name: 'Female', value: 'female'}
      ];
    }

  ngOnInit(): void {
    this.form.patchValue(this.user);
    this.form.controls['confirm_password'].patchValue(this.user?.password);
    this.form.controls['birthDate'].patchValue(new Date(this.user?.birthDate));
    this.user?.address.forEach(ad => {
      this.addresses.push(ad);
    });
    this.addAddress();
  }

  addAddress(): void {
    this.usersService.addAddress.subscribe(res => {
      this.addresses.push(res);
    })
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: ['user'],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: [null]
    });
  }

  showModal(element?: Address) {
    this.ref = this.dialogService.open(AddressFormComponent, {
        header: 'Address Information',
        width: '70%',
        data: {
          element: element
        }
    })
    this.ref.onClose.subscribe((addressData: Address) => {
      this.usersService.setAddress(addressData);
    });
  }

  goBack(): void {
    history.back();
  }

  submit(): void {
    if(this.form.invalid) {
      this.messageService.add({severity:'warn', summary:'Attention', detail:'Please fill out the form!'});
      return;
    };
    if(this.form.get('password')?.value != this.form.get('confirm_password')?.value) {
      this.messageService.add({severity:'warn', summary:'Attention', detail:'Passwords do not match!'});
      return;
    }
    let formValue = this.form.value;
    formValue = {
      ...this.form.value,
      birthDate: this.datepipe.transform(this.form.get('birthDate')?.value, 'yyyy-MM-dd'),
      address: this.addresses
    }
    if(this.user) {
      this.usersService.updateUser(formValue, this.user.id).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'User updated!'});
      })
    }
    else {
      this.usersService.saveUser(formValue).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'User saved!'});
      })
    }
    history.back();
  }

}
