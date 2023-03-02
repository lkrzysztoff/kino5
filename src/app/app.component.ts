import { Component, inject, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from './core/store/user.selectors';
import { CookieService } from 'ngx-cookie-service';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AleKino!';
  public store = inject(Store);
  user$ = this.store.select(selectLoggedUser);
  public cookieService = inject (CookieService)

 
}
