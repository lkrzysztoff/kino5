import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from 'src/app/core/env.token'
import { AuthResponse } from './shared/auth.interfaces'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.base_url}/login`, { email, password })
  }

}