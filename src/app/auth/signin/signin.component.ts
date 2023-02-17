import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {   NonNullableFormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormGroup,
  FormArray,
FormBuilder, } from '@angular/forms';
import { emailValidator } from './validators';
import { whitespaceValidator } from './validators';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  {
 
  
  private formBuilder = inject(NonNullableFormBuilder);
  

  visible = false;
  loginForm = this.createLoginForm();

  private createLoginForm() {
    const form = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        emailValidator,
        whitespaceValidator,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        whitespaceValidator,
      ]),
    });

    return form;
  }

  getErrorMessage(formControlName: string) {
    const control = this.loginForm.get(formControlName);
    if (control?.hasError('required')) {
      switch (formControlName) {
        case 'email':
          return 'Pole wymagane';
        case 'password':
          return 'Pole wymagane';
      }
    }
    if (control?.hasError('email') || control?.hasError('minlength') || control?.hasError('maxlength')) {
      switch (formControlName) {
        case 'email':
          return 'Nieprawidłowy adres e-mail';
      }
    }
    if (control?.hasError('whitespace') || control?.hasError('minlength') || control?.hasError('maxlength')) {
      switch (formControlName) {
        case 'password':
          return 'Nieprawidłowe hasło';
      }
    }

    return '';
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    // this.store.dispatch(AuthActions.login({ loginData: this.loginForm.getRawValue() }));
  }

}
