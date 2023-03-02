import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Film } from "./film.model";
import { Show } from "./show.model";
import { Screen } from "./screen.model";
import { Order } from "./order.model";
import { movie } from "../addmoviesadmin/movie.interface";
import { repertoire } from "../addshowsadmin/showform/showform.interface";
import { OrderManagmentService } from "../order-managment.service";
import { map, pipe } from "rxjs";
import { shareReplay } from "rxjs";

const PROTOCOL = "http";
const PORT = 3000;

@Injectable()
export class MainDataSource {
    baseUrl: string;
    auth_token?: string;
    dataService = inject(OrderManagmentService)

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



    // saveOrder(order: Order): Observable<Order> {
    //     return this.http.post<Order>(this.baseUrl + "orders", order);
    // }

    adminAddMovie(movie : movie){
        return this.http.post<movie>(this.baseUrl+"films",movie)
    }
    getRepertoire(){
        return this.http.get<repertoire[]>(this.baseUrl+"repertoire")
    }
    
    getSeats(): [] { 
            return []; 
    } 

    getFilmsByShowsId(id:number) : Observable<Film[]> {
         return this.http.get<Film[]>(this.baseUrl + "films/"+id)     
    }

}
