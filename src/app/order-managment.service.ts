import { Injectable } from '@angular/core';
import { User } from './shared/ui/orders/order/user';

@Injectable({
  providedIn: 'root'
})


export class OrderManagmentService {
  private favBooks  = [
    {title:'dupa'}
  ];

userdata : User = new User('','','','','','',false,false);

}



