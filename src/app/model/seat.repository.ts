import { Injectable } from "@angular/core";
import { Seat } from "./seat.model";
import { MainDataSource } from "./main.datasource"; 

@Injectable()
export class SeatRepository {
    private seats: Seat[] = [];
    private categories: string[] = [];
    
    constructor(private dataSource: MainDataSource) {
        this.seats = dataSource.getSeats();
    }
}
