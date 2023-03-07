import { Component, inject, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from './core/store/user.selectors';
import { CookieService } from 'ngx-cookie-service';
import { NgModel } from '@angular/forms';
import { UserService } from './core/store/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AleKino!';
  private store = inject(Store);
  private userService = inject(UserService)
  user$ = this.store.select(selectLoggedUser);
  private cookieService = inject (CookieService)

  constructor(){
    this.userService.getUser()
  }
 
}
