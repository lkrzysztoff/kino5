import { NgModule } from "@angular/core";
import { SeatRepository } from "./seat.repository";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";
import { FilmRepository } from "./film.repository";
import { MainDataSource } from "./main.datasource";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service"; 
import { ModelResolver } from "./model.resolver";

@NgModule({
    imports: [HttpClientModule],
    providers: [FilmRepository, Cart, Order, OrderRepository,
        MainDataSource, AuthService, ModelResolver]
})
export class ModelModule {}
