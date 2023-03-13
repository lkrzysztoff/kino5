import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of, switchMap, tap } from 'rxjs';


import { AuthActions } from './auth.actions';
import { AuthApiActions } from './auth.actions';
import { UserApiActions } from 'src/app/core/store/user.actions';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private cookieService = inject(CookieService);
  private authService = inject(AuthService);
  private router = inject(Router);


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ loginData }) => {
        const { email, password } = loginData;
        return this.authService.login(email, password).pipe(
          tap(({ accessToken }) => {
            this.cookieService.set('token', accessToken, 1, '/');
          }),
          map(({ user }) => {
            this.router.navigate(['']);
            return UserApiActions.getUserSuccess({ user });
          }),
          catchError(() => {
            alert('Zły login lub hasło')
            return of(AuthApiActions.loginFailure());
          })
        );
      })
    );
  });
}