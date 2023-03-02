import { Component, OnInit, inject } from '@angular/core';
import { Cart } from "../../../../model/cart.model";
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
faVideo = faVideo as IconProp;
faShoppingCart = faShoppingCart as IconProp;
  constructor( public cart : Cart) { }

private store = inject (Store)
private router = inject (Router)
private cookieService = inject (CookieService)
user$ = this.store.select(selectLoggedUser)

  ngOnInit(): void {
  }
  wyloguj() {
    this.router.navigate(['/']).then(
      () => {
        window.location.reload();
        this.cookieService.delete('token');
      }
    )
  }
log(){
  console.log(
    this.user$.subscribe(
      (data)=> console.log(data)
    )
  )
}
}
