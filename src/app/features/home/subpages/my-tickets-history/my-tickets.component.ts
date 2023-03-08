import { Component, inject, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { map, Observable, tap, of, BehaviorSubject } from 'rxjs';
import { isThisQuarter } from 'date-fns';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mytickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyticketsComponent implements OnInit {
 private http = inject (HttpClient)
  orders$!: Observable<Cart[]> 
  orders$$ = new BehaviorSubject<Cart[]>([])
  ordersId$ !: Observable<number[]>;
  ordersId$$ = new BehaviorSubject<number[]>([])
  getFullPrice(tickets: Cart[]) {
    let fullPrice = tickets.reduce((total, price) => {
      return (total += +price.seat.price);
    }, 0);
    return fullPrice;
  }

  ngOnInit(): void {
    this.newOrders$ = this.newGetOrders() 
  }

  test(value:any){
    console.log()
  }












filterForObjects(orderHistory: { value: Cart; }[]){
  return
}



getId(value: any){
  return Object.values(value).length-1
}

returnIdByObject(value: any,arrayLength:number){
  return Object.values(value)[arrayLength]
}



newGetOrders(){
  return this.http.get<{value:Cart,id:number}[]>('http://localhost:3000/orders')
}
newOrders$ !: Observable<{value:Cart}[]>
}
