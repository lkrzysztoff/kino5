import { Component, inject, OnInit } from '@angular/core';
import { MyticketslistService } from './my-tickets-service/myticketslist.service';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-mytickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyticketsComponent implements OnInit {
  ticketService = inject(MyticketslistService);
  mytickets$ = this.ticketService.ticket$;
  orders$!: Observable<(number | Cart)[]>;
  getFullPrice(tickets: Cart[]) {
    let fullPrice = tickets.reduce((total, price) => {
      return (total += +price.seat.price);
    }, 0);
    return fullPrice;
  }

  ngOnInit(): void {
    this.orders$ = this.ticketService.getOrders().pipe(
      map((value) => {
        return value.map((value) => Object.values(value)).flat();
      })
    );
    this.orders$.subscribe(console.log);
  }
}
