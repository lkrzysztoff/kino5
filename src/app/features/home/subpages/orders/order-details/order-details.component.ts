import { Component, OnInit, Input, inject } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { FilmService } from '../../movies/film-service/film-service';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from '../../reservation/reservation-grid/reservation-interfaces';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  private cartService = inject(CartService);
  private service = inject(FilmService);

  cart$!: Observable<Cart[]>;
  films$!: Observable<Film[]>;
  shows$!: Observable<Showtest[]>;

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.films$ = this.service.getFilms();
    this.shows$ = this.service.getShowtest();
  }

  returnShowById(shows: Showtest[], id: number) {
    return shows.filter((shows) => shows.id == id);
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
