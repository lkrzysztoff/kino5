import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { Validators, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { OrderManagmentService } from '../../../../../order-managment.service';
import { Router } from '@angular/router';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/core/store/user.interfaces';
import {
  whitespaceValidator,
  emailValidator,
  emailMatchValidate,
} from 'src/app/features/auth/subpages/signin/validators';
import { CartService } from 'src/app/shared/services/cart.service';
import { DiscountService } from 'src/app/shared/services/discount.service';

submitted: false;

@Component({
  selector: 'app-first',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  private store = inject(Store);
  private cartService = inject(CartService)
  private formBuilder = inject(NonNullableFormBuilder)
  private discountService = inject(DiscountService)

  @ViewChild('titleInput')
  titleInputReference!: ElementRef;

  reactiveForm!: FormGroup;

  constructor(
    public orderService: OrderManagmentService,
    private router: Router
  ) {}

  user!: UserResponse;

  user$ = this.store.select(selectLoggedUser).subscribe((value) => {
    this.user = value;
  });

  ngOnInit(): void {
    this.reactiveForm = new FormGroup(
      {
        name: new FormControl(this.user.firstName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          whitespaceValidator,
        ]),
        surname: new FormControl(this.user.lastName, [
          Validators.minLength(2),
          Validators.maxLength(30),
          whitespaceValidator,
        ]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
          emailValidator,
        ]),
        emailConfirm: new FormControl(this.user.email, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
          emailValidator,
          emailMatchValidate,
        ]),
        phone: new FormControl(this.user.phone, [
          Validators.pattern('^\\d{9}$'),
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
        ]),
        discount: new FormControl(this.orderService.userdata.discount, []),
        payment: new FormControl(this.orderService.userdata.payment, [
          Validators.required,
        ]),
      },
      { validators: [emailMatchValidate] }
    );
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

  get discount() {
    return this.reactiveForm.get('discount')?.value!;
  }

  public validate() {
    this.reactiveForm.markAllAsTouched();
    if (this.reactiveForm.valid) {
      this.router.navigate(['/order-completed']);
      return this.discountService.getDiscountCode(this.discountValue.discount).subscribe(
        value => {
         return this.discountService.deleteDiscountCodeFromDB(value[0].id).subscribe()
        } 
     )
      
    } else if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
        
      }
      return;
    }

    return this.orderService.userdata = this.reactiveForm.value;
  }

    discountForm = this.createDiscountForm()

    createDiscountForm(){
      const form = this.formBuilder.group({
        discount: this.formBuilder.control('', [
          Validators.required,
          whitespaceValidator,
          Validators.minLength(10),
        ]),
    })
    return form;
    }
discountValue !: {discount:string}
discountId!: number
    onDiscountFormSubmit(){
        this.discountForm.markAllAsTouched()
        if(this.discountService.checkIfDiscountCodeExist(this.discountForm.getRawValue())){
          console.log(this.discountForm.getRawValue())
        this.discountValue = this.discountForm.getRawValue()
        return this.discountService.getDiscountCode(this.discountValue.discount)
        }
        else return;
        //  return this.discountValue = this.discountForm.getRawValue()
        
      }


    }
  
