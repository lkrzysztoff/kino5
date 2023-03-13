import { Film } from "src/app/shared/interfaces/film.interface";
import { Showtest } from "../../home/subpages/reservation/reservation-grid/reservation-interfaces";
import { movie } from "../pages/add-movies-admin/movie.interface";

export interface AdminFilmState {
  films: movie[];
}

export interface AdminShowState {
  shows: addShowInterface[]
}

export interface addShowInterface {
  hour: string;
  screen: number;
  reservedSeats: string[];
  priceList: { type: string; price: number }[];
  filmId: number;
  id?: number;
}