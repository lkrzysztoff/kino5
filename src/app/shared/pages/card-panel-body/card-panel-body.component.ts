import { Component, OnInit } from '@angular/core';
import { FilmRepository } from '../../../model/film.repository';
import { Film } from '../../../model/film.model';
import { CardComponent } from '../../ui/movies/card/card.component';
import { DatePanelComponent } from '../../ui/components/date-panel/date-panel.component';


@Component({
  selector: 'app-card-panel-body',
  templateUrl: './card-panel-body.component.html',
  styleUrls: ['./card-panel-body.component.css']
})
export class CardPanelBodyComponent implements OnInit {
  isReadMore = true;
  godziny = ['12:30','15:30','16:30'];
  selectedDate : Date = new Date();
  
  
  film! : Film[];
  constructor(private filmsRepository: FilmRepository) {
   
   }

   get films() : Film[] {
    return this.filmsRepository.getFilms( this.selectedDate );
}

showText() {
  this.isReadMore = !this.isReadMore

}  
dateImport( newDate : Date ) {
  this.selectedDate = newDate;
}
  ngOnInit(): void {
  
  }

}
