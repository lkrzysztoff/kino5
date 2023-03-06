import {
  Component,
  Input,
  NO_ERRORS_SCHEMA,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  EmailValidator,
} from '@angular/forms';
import { FilmRepository } from '../../../../../model/film.repository';
import { Film } from '../../../../../model/film.model';
import { Cart } from '../../../../../model/cart.model';
import { CartLine } from '../../../../../model/cart.model';
import { Seat } from '../../../../../model/seat.model';
import { priceType } from '../../../../../model/show.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from './user';
import { OrderManagmentService } from '../../../../../order-managment.service';
import { Router } from '@angular/router';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { daneData } from './dane.interface';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/core/store/user.interfaces';
import {
  whitespaceValidator,
  emailValidator,
  emailMatchValidate,
} from 'src/app/features/auth/subpages/signin/validators';

submitted: false;

@Component({
  selector: 'app-first',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  // @Output() userFormData = new EventEmitter<User>

  @ViewChild('titleInput')
  titleInputReference!: ElementRef;

  reactiveForm!: FormGroup;

  constructor(
    public filmRepository: FilmRepository,
    public cart: Cart,
    public orderService: OrderManagmentService,
    public router: Router
  ) {}
  store = inject(Store);
  dane!: UserResponse;

  user$ = this.store.select(selectLoggedUser).subscribe((value) => {
    this.dane = value;
    console.log(value);
  });

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.dane.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        whitespaceValidator,
      ]),
      surname: new FormControl(this.dane.lastName, [
        Validators.minLength(2),
        Validators.maxLength(30),
        whitespaceValidator,
      ]),
      email: new FormControl(this.dane.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator,
      ]),
      emailConfirm: new FormControl(this.dane.email, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        emailValidator,
        emailMatchValidate
      ]),
      phone: new FormControl(this.dane.phone, [
        Validators.pattern('^\\d{9}$'),
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        
      ]),
      discount: new FormControl(this.orderService.userdata.phone, []),
      payment: new FormControl(this.orderService.userdata.payment, [
        Validators.required,
      ]),
    },
    { validators: [emailMatchValidate] }
    );
    // this.reactiveForm.setValidators([emailMatchValidate])
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get surname() {
    return this.reactiveForm.get('surname')!;
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get password() {
    return this.reactiveForm.get('password')!;
  }
  get emailConfirm() {
    return this.reactiveForm.get('emailConfirm')!;
  }
  get phone() {
    return this.reactiveForm.get('phone')!;
  }
  get payment() {
    return this.reactiveForm.get('payment')!;
  }

  public validate() {
    this.reactiveForm.markAllAsTouched()
    if (this.reactiveForm.valid) {
      this.router.navigate(['/order-completed']);
    } else if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.orderService.userdata = this.reactiveForm.value;

    console.info('imie:', this.orderService.userdata.name);
    console.info('nazwisko:', this.orderService.userdata.surname);
    console.info('Email:', this.orderService.userdata.email);
    console.info('Password:', this.orderService.userdata.phone);
    //
  }
}
