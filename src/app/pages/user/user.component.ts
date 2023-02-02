import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
      this.createForm();
    }

  ngOnInit(): void {
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],

      gender: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: ['', Validators.required],

      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],

      zip_code: ['', Validators.required],
      adress: ['', Validators.required],
      number: ['', Validators.required],

      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  submit(): void {
    console.log(this.form.value)
  }

}
