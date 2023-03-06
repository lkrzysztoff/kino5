import { Component, OnInit, Input, inject } from '@angular/core';
import { CartLine } from '../../../../../model/cart.model';
import { FilmRepository } from 'src/app/model/film.repository';
import {
  MyticketslistService,
  orderHistory,
} from 'src/app/features/home/subpages/watchlist/myticketslist.service';
import { CartService } from 'src/app/test/cart.service';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/test/cart-interface';
import { MainDataSource } from 'src/app/model/main.datasource.service';
import { Film } from 'src/app/model/film.model';
import { Showtest } from 'src/app/test/test.component';

@Component({
  selector: 'app-order-details[data]',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  cartService = inject (CartService)
  service = inject(MainDataSource)

  cart$ !: Observable<Cart[]>
  films$ !: Observable<Film[]>
  shows$ !: Observable<Showtest[]>
  @Input() data!: orderHistory;

  // constructor(public cart: Cart, public filmRepository: FilmRepository) {}

  ngOnInit(): void {
    // console.log(this.cart.lines.values);
    this.cart$ = this.cartService.cart$;
    this.films$ = this.service.getFilms()
    this.shows$ = this.service.getShowtest()
  }
  // get uniqueFilms() {
  //   let arr = this.cart.getUniqueFilms();
  //   console.log('cartUniq');
  //   console.log(arr);
  //   return arr;
  // }
  // getSeats(show_id: number, date: string) {
  //   let arr: CartLine[] = this.cart.getFilmSeats(show_id, date);
  //   console.log('Seats ' + show_id + ' ' + date);
  //   console.log(arr);
  //   return arr;
  // }

returnShowById(shows: Showtest[],id:number){
  return shows.filter(shows=> shows.id == id)
}

returnFilmsById(films: Film[], id: number) {
  return films.filter((films) => films.id === id);
}

getFullPrice(tickets: Cart[]) {
  let fullPrice = tickets.reduce((total, price) => {
    return (total += +price.seat.price);
  }, 0);
  return fullPrice;
}

}
