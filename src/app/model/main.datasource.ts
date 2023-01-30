import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Seat } from "./seat.model";
import { Film } from "./film.model";
import { Show } from "./show.model";
import { Screen } from "./screen.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { map } from "rxjs/operators"; 
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = "http";
const PORT = 3000;

@Injectable()
export class MainDataSource {
    baseUrl: string;
    auth_token?: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }
    getFilms(): Observable<Film[]> {
        return this.http.get<Film[]>(this.baseUrl + "films");
    }
    getShows(): Observable<Show[]> {
        return this.http.get<Show[]>(this.baseUrl + "show");
    }
    getScreens(): Observable<Screen[]> {
        return this.http.get<Screen[]>(this.baseUrl + "screen");
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }
    authenticate(user: string, pass: string): Observable<boolean> { 
        return this.http.post<any>(this.baseUrl + "login", { 
            name: user, password: pass 
        }).pipe(map(response => { 
            this.auth_token = response.success ? response.token : null; 
            return response.success; 
        })); 
    }
    getSeats(): [] { 
            return []; 
    } 

}
