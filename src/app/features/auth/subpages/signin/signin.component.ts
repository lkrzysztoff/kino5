// import { Component, OnInit, inject } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import {   NonNullableFormBuilder,
//   Validators,
//   ValidatorFn,
//   AbstractControl,
//   FormGroup,
//   FormArray,
// FormBuilder, } from '@angular/forms';
// import { AuthService } from 'src/app/auth/signin/auth.service';
// import { emailValidator } from './validators';
// import { whitespaceValidator } from './validators';
// import { Store } from '@ngrx/store';
// import { loginRequest, loginFailure, loginSuccess } from 'src/state/authstate/auth.actions';
// import { User } from 'src/app/shared/ui/orders/order/user';
// import { AuthResponse, UserLogged } from '../../../../auth/signin/auth.interface';
// import { AuthActions } from '../../store/auth.actions';
// import { CookieService } from 'ngx-cookie-service';

// export interface UserLogin  { 
//   email: string,
//   password: string
// }

// @Component({
//   selector: 'app-signin',

//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.scss']
// })
// export class SigninComponent  {

//   private formBuilder = inject(NonNullableFormBuilder)
//   private store = inject<Store<AuthResponse>>(Store)
//   private cookies = inject ( CookieService)

//    visible = false;
//   loginForm = this.createLoginForm()


//   private createLoginForm() {
//     const form = this.formBuilder.group({
//       email: this.formBuilder.control('', [
//         Validators.required,
//         Validators.minLength(6),
//         Validators.maxLength(100),
//         whitespaceValidator,
//         emailValidator
//       ]),
//       password: this.formBuilder.control('', [
//         Validators.required,
//         Validators.minLength(6),
//         Validators.maxLength(100),
//         whitespaceValidator
//       ]),
//     });

//     return form;
//   }


// getErrorMessage(formControlName: string) {
//     const control = this.loginForm.get(formControlName);
//     if (control?.hasError('required')) {
//       switch (formControlName) {
//         case 'email':
//           return 'Pole wymagane';
//         case 'password':
//           return 'Pole wymagane';
//       }
//     }
//     if (control?.hasError('email') || control?.hasError('minlength') || control?.hasError('maxlength')) {
//       switch (formControlName) {
//         case 'email':
//           return 'Nieprawidłowy adres e-mail';
//       }
//     }
//     if (control?.hasError('whitespace') || control?.hasError('minlength') || control?.hasError('maxlength')) {
//       switch (formControlName) {
//         case 'password':
//           return 'Nieprawidłowe hasło';
//       }
//     }

//     return '';
//   }

//   togglePasswordVisibility() {
//     this.visible = !this.visible;
//   }



//   login() {
//     this.loginForm.markAllAsTouched();

//     if (this.loginForm.invalid) {
//       return;
//     }
//     this.store.dispatch(AuthActions.login({ loginData: this.loginForm.getRawValue() }));
//   }

// }



 
  
//   // private formBuilder = inject(NonNullableFormBuilder);
//   // public authService = inject ( AuthService)
//   // private Store = inject ( Store)

//   // visible = false;
//   // loginForm = this.createLoginForm();

//   // private createLoginForm() {
//   //   const form = this.formBuilder.group({
//   //     email: this.formBuilder.control('', [
//   //       Validators.required,
//   //       emailValidator,
//   //       whitespaceValidator,
//   //       Validators.minLength(10),
//   //       Validators.maxLength(100),
//   //     ]),
//   //     password: this.formBuilder.control('', [
//   //       Validators.required,
//   //       Validators.minLength(6),
//   //       Validators.maxLength(100),
//   //       whitespaceValidator,
//   //     ]),
//   //   });

//   //   return form;
//   // }

//   // getErrorMessage(formControlName: string) {
//   //   const control = this.loginForm.get(formControlName);
//   //   if (control?.hasError('required')) {
//   //     switch (formControlName) {
//   //       case 'email':
//   //         return 'Pole wymagane';
//   //       case 'password':
//   //         return 'Pole wymagane';
//   //     }
//   //   }
//   //   if (control?.hasError('email') || control?.hasError('minlength') || control?.hasError('maxlength')) {
//   //     switch (formControlName) {
//   //       case 'email':
//   //         return 'Nieprawidłowy adres e-mail';
//   //     }
//   //   }
//   //   if (control?.hasError('whitespace') || control?.hasError('minlength') || control?.hasError('maxlength')) {
//   //     switch (formControlName) {
//   //       case 'password':
//   //         return 'Nieprawidłowe hasło';
//   //     }
//   //   }

//   //   return '';
//   // }

//   // togglePasswordVisibility() {
//   //   this.visible = !this.visible;
//   // }

//   // login() {
//   //   this.loginForm.markAllAsTouched();

//   //   if (this.loginForm.invalid) {
//   //     return;
//   //   }
//   //   // this.Store.dispatch(loginRequest({credentials:  this.loginForm.getRawValue()}));
//   // }

//   // ngOnInit(): void {

//   // }
//   // async signinBtnClikced() : Promise<any> {
//   //   const credentials = {
//   //     email: this['user'].email,
//   //     password: this['password'].password
//   //   }
//   //   this.Store.dispatch(loginRequest({credentials}));
//   // }

  
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { AuthResponse } from '../../shared/auth.interfaces';
import { AuthActions } from '../../store/auth.actions';
import { emailMatchValidate, whitespaceValidator } from './validators';
import { emailValidator } from './validators';

@Component({
  selector: 'app-signin',
  standalone:true,
  imports:[FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, NgIf, MatInputModule, MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private store = inject<Store<AuthResponse>>(Store);

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

    this.store.dispatch(AuthActions.login({ loginData: this.loginForm.getRawValue() }));
  }
}

