import { Component, inject } from '@angular/core';
import { MyticketslistService } from './my-tickets-service/myticketslist.service';
import { Cart } from 'src/app/test/cart-interface';

@Component({
  selector: 'app-mytickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyticketsComponent {
  ticketService = inject(MyticketslistService);
  mytickets$ = this.ticketService.ticket$;

  
  getFullPrice(tickets: Cart[]) {
    let fullPrice = tickets.reduce((total, price) => {
      return (total += +price.seat.price);
    }, 0);
    return fullPrice;
  }
}
