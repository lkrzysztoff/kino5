import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from 'src/app/test/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  private router = inject(Router)
  cartService = inject(CartService)

  canActivate() {
    if (this.cartService.cart$$.value.length) {
      return true
    } else {
      this.router.navigate([''])
      return false
    }
  }
}