import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.createForm();
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
    this.authService.getUserData(this.form.getRawValue()).subscribe(res => {
      this.authService.setUserData(res[0]);
    });
    setTimeout(() => {
      if(localStorage.getItem('token') && localStorage.getItem('token') != "undefined") {
        history.back();
      }
      else {
        this.messageService.add({severity:'warn', summary:'Attention', detail:'User does not exists!'});
        return;
      }
    }, 1000);
  }

}
