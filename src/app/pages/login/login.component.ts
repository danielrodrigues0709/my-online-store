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
  state!: {
    url: string;
  }
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.createForm();
    const nav = this.router.getCurrentNavigation()?.extras.state;
    this.state = nav ? nav['url'] : undefined;
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
    if(this.state) {
      this.router.navigate([this.state]);
    }
    else {
      history.back();
    }
  }

}
