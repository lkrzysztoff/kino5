import { Component, ComponentFactoryResolver, createComponent, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router"; 
import { FilmRepository } from '../model/film.repository';
import { Film } from '../model/film.model';
import { Cart } from "../model/cart.model";
import { CartLine } from "../model/cart.model";
import { Seat } from '../model/seat.model';
import { priceType } from "../model/show.model";
import { Observable, from } from "rxjs";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  selectedDate : Date = new Date();
  showId : number = 0;
  constructor(private filmsRepository: FilmRepository, private activeRoute: ActivatedRoute, public cart : Cart) { 

  }

  ngOnInit(): void {
    this.selectedDate = new Date( this.activeRoute.snapshot.params["selectedDate"] ); 
    this.showId = this.activeRoute.snapshot.params["showId"]; 

    this.letters = this.screen ? this.lettersSh.slice(0,( this.screen.rows - 1)) : this.lettersSh;
    this.numbers = this.screen ? this.numbersSh.slice(0,this.screen.colu - 1) : this.numbersSh;

    // obcinamy rzędzy foteli do wielkosci sali
    
    this.seatDisplay();
    this.checkButton();

  }

  // właściwości potrzebne do wyświetlenia wszystklich danych
  get film() : any {
    return this.filmsRepository.getFilmByShow( this.showId );
  }
  // z modelu Show trzeba pobrać miejsca już zarezerwowane
  // Show.reservedSeats
  get show() : any {
    return this.filmsRepository.getShow( this.showId );
  }
  // z modelu Screen trzeba pobrać miejsca specjalne i poszukamy zastosowania dla nich  
  // Screen.specialSeats
  get screen() : any {
    return this.filmsRepository.getScreenByShow( this.showId );
  }


  @ViewChild('ticketContainer',{read : ViewContainerRef }) container : any;
  display : boolean = false;
  letters : string[] = [];
  numbers : number[] = [];
  lettersSh = ["A","B","C","D","E","F","G","H"];
  numbersSh = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  seats : any = [];
  ticketCheck : boolean = false;
  selectedSeat = 0;
  selectedColumn = '';
  actualVal : any = '';
  check: boolean = false;
  reservationBuffer : any = false;

  seatReturn(i: number,a: number){
    console.log(this.letters[a],i+1);
    this.selectedColumn  = this.letters[a];
    this.selectedSeat = i+1;
    this.seats.push([this.selectedColumn,this.selectedSeat])
    console.log(this.seats);
    this.reservationBuffer = {
      name : this.letters[a]+ (i+1),
      show_id : this.showId,
      date :  this.selectedDate.toISOString().slice(0, 10),
      priceType : this.show.priceList[0].type+' '+this.show.priceList[0].price
    };
      //new seatBuffer(this.letters[a]+ (i+1),this.showId, this.selectedDate.toISOString().slice(0, 10), this.show.priceList[0].type+' '+this.show.priceList[0].price);
    console.log('Buffer');
    console.log( this.reservationBuffer);
  }

  addToReservationBuffer() {
    let priceTypeTemp : string[] = this.reservationBuffer.priceType.split(' ');
    let pType : priceType = {
      type : priceTypeTemp[0],
      price : Number(priceTypeTemp[1])
    };
    this.cart.addLine(new Seat(this.reservationBuffer.name,this.reservationBuffer.show_id, this.reservationBuffer.date, pType));
    this.clearReservationBuffer();
  }
  clearReservationBuffer(){
    this.reservationBuffer = false;
  }
  seatDisplay(){
    let testDate = this.selectedDate.toISOString().slice(0, 10);
    return this.cart.lines.filter( line => ( line.seat.show_id == this.showId && line.seat.date == testDate));
  }

ticket(){
this.ticketCheck = !this.ticketCheck;
}

dest(ix: number){
  this.seats.splice(ix,1);

}
priceTypeChange( value : any)
{
    this.reservationBuffer.priceType = value.target.value;
}
checkButton(){
  if(this.seats.length>0){
    this.check = true;
   }

}


}
export interface seatBuffer {
  name: string,
  show_id: number,
  date : string,
  priceType:  string
}