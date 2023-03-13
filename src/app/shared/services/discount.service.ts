import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Discount } from '../interfaces/discount-code-interface';
import { of,switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  checkIfDiscountCodeExist(value: {discount: string}) {
    return this.http
      .get<Discount[]>(`${this.apiUrl}/discount?code=${value.discount}`)
      .pipe(
        switchMap((result) => {
          return of(!!result.length);
        })
      );
  }

  getDiscountCode(value:string){
    return this.http
    .get<Discount[]>(`${this.apiUrl}/discount?code=${value}`)
  }

  deleteDiscountCodeFromDB(value: number) {
    return this.http.delete(`${this.apiUrl}/discount/${value}`);
  }

  constructor() { }
}
