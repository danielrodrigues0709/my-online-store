import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Address } from 'src/app/shared/interfaces/address';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  form!: FormGroup;
  addressData!: Address;
  
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private _usersService: UsersService,
    private messageService: MessageService
    ) {
      this.createForm();
    }

  ngOnInit(): void {
    if(this.config.data?.element) {
      this.form.patchValue(this.config.data.element);
    }
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      postalCode: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['US', Validators.required],
    });
  }

  onChangePostalCode(event: any): void {
    let value = event.target.value;
    this._usersService.getAddressByPostalCode(value).subscribe(res => {
      if(res.results[value]) {
        this.form.patchValue({
          address: res.results[value][0].address,
          city: res.results[value][0].city,
          state: res.results[value][0].state_code
        })
      }
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
    this.addressData = this.form.getRawValue();
    this.ref.close(this.addressData);
  }

}
