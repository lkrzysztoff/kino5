import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { selectLoggedUser } from "src/app/core/store/user.selectors";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {map } from 'rxjs'


@Injectable({
    providedIn:'root'
})

export class UnloggedGuard implements CanActivate {
    private store = inject(Store)
    private router = inject(Router)
  
    loggedUser$ = this.store.select(selectLoggedUser)
    constructor(){}
    canActivate(): Observable<boolean> {
      return this.loggedUser$.pipe(
        map(user => {
          if (user.role === 'user'&&user.id) {
            return true
          } else {
            this.router.navigate([''])
            return false
          }
        })
      )
    }}

