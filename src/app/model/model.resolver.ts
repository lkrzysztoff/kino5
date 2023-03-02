import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FilmRepository } from "./film.repository"
import { MainDataSource } from "./main.datasource.service"; 
import { Film } from "./film.model";

@Injectable()
export class ModelResolver {
    constructor(
        private filmRepository: FilmRepository,
        private dataSource: MainDataSource
    ) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Film[]> | null {
                return (this.filmRepository.getFilmsAll().length ==0 ? this.dataSource.getFilms() : null);    
    }
}
