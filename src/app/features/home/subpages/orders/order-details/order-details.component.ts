import { Component, OnInit, Input, inject } from '@angular/core';
import { CartService } from 'src/app/test/cart.service';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/test/cart-interface';
import { MainDataSource } from 'src/app/model/main.datasource.service';
import { Film } from 'src/app/model/film.model';
import { Showtest } from 'src/app/test/test.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  cartService = inject(CartService);
  service = inject(MainDataSource);

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
