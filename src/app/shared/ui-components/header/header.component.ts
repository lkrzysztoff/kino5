import { Component, OnInit, inject } from '@angular/core';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/core/store/user.selectors';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart } from 'src/app/shared/interfaces/cart-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faVideo = faVideo as IconProp;
  faShoppingCart = faShoppingCart as IconProp;
  constructor() {}

  private store = inject(Store);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  cartService = inject(CartService);
  user$ = this.store.select(selectLoggedUser);
  cart$!: Observable<Cart[]>;

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
  }
  logout() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
      this.cookieService.delete('token');
    });
  }
  
}
