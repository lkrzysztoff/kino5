import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { API_URL } from '../env.token';
import { UserApiActions } from './user.actions';
import { UserResponse } from './user.interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private base_url = inject(API_URL);
  private store = inject(Store);
  private cookieService = inject (CookieService)

  getUser() {
    this.getMe().subscribe((response) => {
      console.log(response),
      this.store.dispatch(UserApiActions.getUserSuccess({ user: response }));
    });
  }

  getMe() {
    const accessToken = this.cookieService.get('token');
    return this.http.get<UserResponse>(`${this.base_url}/users/me`,{
      headers: { Authorization: `Bearer ${accessToken}` },
    }
    );
  }

  getAllUsers() {
    return this.http.get<UserResponse[]>(`${this.base_url}/users`);
  }

}
