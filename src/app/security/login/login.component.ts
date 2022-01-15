import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  pageTitle: string = 'Log in';

  loginForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value);
    }
  }
}
