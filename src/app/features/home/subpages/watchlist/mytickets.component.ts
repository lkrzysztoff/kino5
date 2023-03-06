import { Component,inject } from '@angular/core';
import { FilmRepository } from 'src/app/model/film.repository';
import { MyticketslistService } from './myticketslist.service';
import { Cart } from 'src/app/test/cart-interface';


@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.scss']
})


export class MyticketsComponent {
ticketService = inject (MyticketslistService)
filmService = inject ( FilmRepository)
mytickets$ = this.ticketService.ticket$;

returnMovie(showId : number){
  this.filmService.getFilmByShow(showId)
}
getFullPrice(tickets: Cart[]) {
  let fullPrice = tickets.reduce((total, price) => {
    return (total += +price.seat.price);
  }, 0);
  return fullPrice;
}
}
