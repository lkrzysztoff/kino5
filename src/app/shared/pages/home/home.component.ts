import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FilmRepository } from '../../../model/film.repository';
import { Film } from '../../../model/film.model';
import { CardComponent } from '../../ui/movies/card/card.component';
import { DatePanelComponent } from '../../ui/components/date-panel/date-panel.component';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { filter } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../../ui/orders/order/user';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cs = inject (CookieService)
  ngOnInit(){
    
  }
}