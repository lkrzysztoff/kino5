import { Injectable } from '@angular/core';
import { User } from './order/user';

@Injectable({
  providedIn: 'root'
})


export class OrderManagmentService {
  private favBooks  = [
    {title:'dupa'}
  ];

userdata : User = new User('','','','','','',false);

}



