import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  login(): void {
    if (!this.form.valid) return;
    this.loginService.setLogin(true);
    this.router.navigate(['/home']);
  }

}
