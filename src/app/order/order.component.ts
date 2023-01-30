import { Component, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import {   NonNullableFormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControl,
  FormGroup,
  FormArray,
FormBuilder,
EmailValidator, } from '@angular/forms';
import { FilmRepository } from '../model/film.repository';
import { Film } from '../model/film.model';
import { Cart } from "../model/cart.model";
import { CartLine } from "../model/cart.model";
import { Seat } from '../model/seat.model';
import { priceType } from "../model/show.model";


  submitted:false;


@Component({
  selector: 'app-first',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})



export class OrderComponent implements OnInit {
  
  // przekazujemy zależności od obsługi koszyka
  constructor(private fb: FormBuilder,
              public filmRepository : FilmRepository,
              public cart : Cart
    ) { }

    
  userForm = new FormGroup({
    name: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    emailConfirm: new FormControl('',Validators.required),
    zgoda: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    discount: new FormControl('',Validators.required),
  });
 
  get uniqueFilms(){
    let arr = this.cart.getUniqueFilms();
    console.log( 'cartUniq');
    console.log( arr );
    return arr;
  }
  getSeats( show_id : number, date : string){
    let arr : any = this.cart.getFilmSeats( show_id ,date);
    console.log('Seats ' + show_id + ' ' + date);
    console.log( arr);
    return arr;
  }
  onSubmit(){
    console.log(this.userForm.value)
    submitted:false
  }

  ngOnInit(): void {
 
  }
  get name () { return this.userForm.get('name'); }
  get surname () { return this.userForm.get('name'); }
  }


