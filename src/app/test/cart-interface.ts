import { Seat } from "../model/seat.model";

export interface Cart {
    id: string;
    email:string,
    showId: number;
    movieTitle: string;
    date: string;
    hour: string;
    screen: number;
    seat: seats;
}

export interface seats {
    type: string;
    price: number;
    position:string
}