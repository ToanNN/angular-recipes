import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { emailMatcher, ratingRange } from './email-matcher-validator';

@Component({
  selector: 'app-form-validations',
  templateUrl: './form-validations.component.html',
  styleUrls: ['./form-validations.component.css']
})
export class FormValidationsComponent implements OnInit {

  signUpForm: FormGroup;
  emailMessage: string;
  private validationMessages: ValidationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };
  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true
    });

    this.emailMessage = '';
    this.signUpForm.get('notification')?.valueChanges.subscribe(selectedNotificationMethod => this.setNotification(selectedNotificationMethod));

    let emailControl = this.signUpForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(debounceTime(500)).subscribe(emailValue => this.setEmailMessage(emailControl));

  }

  ngOnInit(): void {

  }
  save() {
    console.log(this.signUpForm);
    console.log('Saved: ' + JSON.stringify(this.signUpForm.value));
  }

  setNotification(notificationMethod: string): void {
    const phoneControl = this.signUpForm.get('phone');
    if (notificationMethod === 'text') {
      phoneControl?.setValidators([Validators.required, Validators.minLength(8)])
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }

  setEmailMessage(emailControl: AbstractControl | null): void {
    this.emailMessage = '';
    if ((emailControl?.touched || emailControl?.dirty) && emailControl?.errors) {
      let validationErrors = Object.keys(emailControl.errors as ValidationErrors).map((propertyName: string) => this.validationMessages[propertyName]);

      this.emailMessage = validationErrors.join(' ');
    }
  }

}

interface ValidationMessages {
  required: string;
  email: string;
  [key: string]: string
}


