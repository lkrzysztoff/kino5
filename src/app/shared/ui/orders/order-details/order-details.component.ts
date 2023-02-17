import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../../model/cart.model';
import { FilmRepository } from 'src/app/model/film.repository';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(public cart : Cart, public filmRepository : FilmRepository) { }

  ngOnInit(): void {
  }
  get uniqueFilms(){
    let arr = this.cart.getUniqueFilms();
    console.log( 'cartUniq');
    console.log( arr );
    return arr;
  }
  getSeats( show_id : number, date : string){
    let arr : any = this.cart.getFilmSeats( show_id ,date);
    console.log('Seats ' + show_id + ' ' + date);
    console.log( arr);
    return arr;
  }
}
