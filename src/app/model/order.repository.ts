import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { MainDataSource } from "./main.datasource"; 

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded: boolean = false;

    constructor(private dataSource: MainDataSource) {}
    
    loadOrders() { 
        this.loaded = true; 
    }
}
