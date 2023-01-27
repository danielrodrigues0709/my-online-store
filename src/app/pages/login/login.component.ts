import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private authService: AuthService,
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
    this.authService.getUserData(this.form.getRawValue());
    if(this.state) {
      this.router.navigate([this.state]);
    }
    else {
      history.back();
    }
  }

}
