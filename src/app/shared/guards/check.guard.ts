import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CheckGuard implements CanActivate {
  private cookieService = inject(CookieService)
  private router = inject(Router)

  canActivate() {
    if (!this.cookieService.check('token')) {
      return true
    } else {
      this.router.navigate(['/auth/signin']).then(
        () =>  window.location.reload(),
      ),
      this.cookieService.deleteAll()
      return false
    }
  }
}