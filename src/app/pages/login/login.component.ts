import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
    const nav = this.router.getCurrentNavigation()?.extras.state;
    this.state = nav ? nav['url'] : undefined;
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
