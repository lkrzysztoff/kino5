import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { inject, Injectable } from '@angular/core'
import { selectLoggedUser } from 'src/app/core/store/user.selectors'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RoleUserGuard implements CanActivate {
  private store = inject(Store)
  private router = inject(Router)

  loggedUser$ = this.store.select(selectLoggedUser)
  constructor(){}
  canActivate(): Observable<boolean> {
    return this.loggedUser$.pipe(
      map(user => {
        if (user.role === 'user') {
          return true
        } else {
          this.router.navigate(['/admin/adminpage'])
          return false
        }
      })
    )
  }

  
}