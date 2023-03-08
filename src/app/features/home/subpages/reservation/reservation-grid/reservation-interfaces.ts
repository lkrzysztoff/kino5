import { priceType } from "src/app/shared/interfaces/show.interface";
export interface testFilm {
    title: string;
    id: number;
    genre: string;
  }
  export interface Screens {
    id: number;
    name: string; //"B",
    rows: number; //5,
    colu: number; //  specialSeats: string[] //["E4", "D4", "E5", "D5"]
  }
  
  export interface Showtest {
    id: number; //0,
    hour: string; //"12.30",
    screen: number; //"B",
    reservedSeats: string[]; //["A3", "C4", "H5"],
    priceList: priceType[];
    filmId: number; //0
  }
  