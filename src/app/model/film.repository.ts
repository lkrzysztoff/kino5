import { Injectable, OnInit } from '@angular/core';
import { Seat } from './seat.model';
import { Film } from './film.model';
import { Screen } from './screen.model';
import { Show } from './show.model';
import { MainDataSource } from './main.datasource.service';

@Injectable()
export class FilmRepository implements OnInit {
  public films: Film[] = new Array<Film>();
  private shows: Show[] = [];
  private screens: Screen[] = [];

  constructor(public dataSource: MainDataSource) {
    this.dataSource.getFilms().subscribe((data) => (this.films = data));
    this.dataSource.getShows().subscribe((data) => (this.shows = data));
    this.dataSource.getScreens().subscribe((data) => (this.screens = data));
  }
  ngOnInit(): void {}
  getFilms(date: Date) {
    return this.films;
  }
  getFilmsAll() {
    return this.films;
  }

  isDataLoaded() {
    return this.films.length && this.shows.length && this.screens.length;
  }
  getFilmShows(filmId: number) {
    return this.shows.filter((show) => show.filmId == filmId);
  }
  getFilm(filmId: number) {
    return this.films.find((f) => f.id == filmId);
  }

  getShow(showId: number): any {
    return this.shows.find((sh) => sh.id == showId);
  }
  getScreen(screenName: string) : any {
    return this.screens.find((sc) => sc.name == screenName);
  }

  getFilmByShow(showId: number) {
    let show: any = this.shows.find((sh) => sh.id == showId);
    return this.getFilm(show.filmId);
  }
  getScreenByShow(showId: number)  {
    let show: Show | undefined = this.shows.find((sh) => sh.id == showId);
    return show ? this.getScreen(show.screen) : null;
  }

  /*
    getProducts(category: string = null): Product[] {
        return this.products
            .filter(p => category == null || category == p.category);
    }

    getProduct(id: number): Product {
        return this.products.find(p => p.id == id);
    }

    getCategories(): string[] {
        return this.categories;
    }
    saveProduct(product: Product) { 
        if (product.id == null || product.id == 0) { 
            this.dataSource.saveProduct(product) 
            .subscribe(p => this.products.push(p)); 
        } else { 
            this.dataSource.updateProduct(product) 
            .subscribe(p => { 
                this.products.splice(this.products. 
                findIndex(p => p.id == product.id), 1, product); 
            }); 
        } 
    } 
    deleteProduct(id: number) { 
        this.dataSource.deleteProduct(id).subscribe(p => { 
            this.products.splice(this.products. 
            findIndex(p => p.id == id), 1); 
        }) 
    }
    */
}
