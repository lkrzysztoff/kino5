import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {   NonNullableFormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormGroup,
  FormArray,
FormBuilder, } from '@angular/forms';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 
  

 

  onSubmit(){
    
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
