import {
  Component,
  Input,
  NO_ERRORS_SCHEMA,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
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
import { FilmRepository } from '../../../../model/film.repository';
import { Film } from '../../../../model/film.model';
import { Cart } from '../../../../model/cart.model';
import { CartLine } from '../../../../model/cart.model';
import { Seat } from '../../../../model/seat.model';
import { priceType } from '../../../../model/show.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from './user';
import { OrderManagmentService } from '../../../../order-managment.service';
import { Router } from '@angular/router';

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
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.orderService.userdata.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      surname: new FormControl(this.orderService.userdata.surname, [
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      email: new FormControl(this.orderService.userdata.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        Validators.email,
      ]),
      emailConfirm: new FormControl(this.orderService.userdata.emailConfirm, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.email,
      ]),
      phone: new FormControl(this.orderService.userdata.phone, [
        Validators.pattern('^\\d{9}$'),
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      discount: new FormControl(this.orderService.userdata.phone, []),
      payment: new FormControl(this.orderService.userdata.payment, [
        Validators.required
      ])
    });
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
  get payment(){
    return this.reactiveForm.get('payment')!;
  }

  public validate() {
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

  // przekazujemy zależności od obsługi koszyka
  // constructor(private fb: FormBuilder,
  //             public filmRepository : FilmRepository,
  //             public cart : Cart
  //   ) { }
  // userForm = this.fb.group(
  //   {

  //     name: this.fb.control('', {
  //       validators: [
  //         Validators.required,
  //         Validators.minLength(2),
  //         Validators.maxLength(50),
  //       ],
  //     }),
  //   }
  // );

  // userForm  = new FormGroup({
  //   name: new FormControl('',[
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.maxLength(20)
  //   ]),
  //   phone: new FormControl('',Validators.required),
  //   emailConfirm: new FormControl('',Validators.required),
  //   zgoda: new FormControl('',Validators.required),
  //   surname: new FormControl('',Validators.required),
  //   email: new FormControl('',Validators.required),
  //   discount: new FormControl('',Validators.required),
  // });

  // get uniqueFilms(){
  //   let arr = this.cart.getUniqueFilms();
  //   console.log( 'cartUniq');
  //   console.log( arr );
  //   return arr;
  // }
  // getSeats( show_id : number, date : string){
  //   let arr : any = this.cart.getFilmSeats( show_id ,date);
  //   console.log('Seats ' + show_id + ' ' + date);
  //   console.log( arr);
  //   return arr;
  // }
  // onSubmit(){
  //   console.log(this.userForm.value)
  //   submitted:false
  // }

  // }
  // get name () { return this.userForm.get('name'); }
  // get surname () { return this.userForm.get('name'); }

  // }
}
