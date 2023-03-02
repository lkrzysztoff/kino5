import { Component, OnInit, Input, inject } from '@angular/core';
import { Cart } from '../../../../model/cart.model';
import { FilmRepository } from 'src/app/model/film.repository';
import { MyticketslistService, orderHistory } from 'src/app/shared/pages/mytickets/myticketslist.service';


@Component({
  selector: 'app-order-details[data]',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})


export class OrderDetailsComponent implements OnInit {
@Input() data! : orderHistory




  constructor(public cart : Cart, public filmRepository : FilmRepository) { }

  ngOnInit(): void {
    console.log(this.cart.lines.values);
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
