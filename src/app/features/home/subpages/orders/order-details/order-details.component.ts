import { Component, OnInit, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { FilmService } from '../../movies/film-service/film-service';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from '../../reservation/reservation-grid/reservation-interfaces';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { Discount } from 'src/app/shared/interfaces/discount-code-interface';

@Component({
  selector: 'app-order-details[discount]',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnChanges {
  @Input() discount !: {discount:string};
  private cartService = inject(CartService);
  private service = inject(FilmService);
  private discountService = inject(DiscountService)


  cart$!: Observable<Cart[]>;
  films$!: Observable<Film[]>;
  shows$!: Observable<Showtest[]>;
  discount$ !: Observable<Discount[]>

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.films$ = this.service.getFilms();
    this.shows$ = this.service.getShowtest();
    // this.discount$ = this.discountService.getDiscountCode(this.discount.discount)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // let code = this.discount.discount
    // this.discountService.getDiscountCode(code).subscribe(
    //   value=> console.log(value)
    // )
    this.discount$ = this.discountService.getDiscountCode(this.discountUnpresent(this.discount))
     
  }

  discountUnpresent(value: {discount:string}){
    if(value){
      return value.discount;
    }
    else return ''
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
