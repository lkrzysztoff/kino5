import { NgModule } from "@angular/core";
import { SeatRepository } from "./seat.repository";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";
import { FilmRepository } from "./film.repository";
import { MainDataSource } from "./main.datasource.service";
import { HttpClientModule } from "@angular/common/http";
import { ModelResolver } from "./model.resolver";

@NgModule({
    imports: [HttpClientModule],
    providers: [FilmRepository, Cart, Order, OrderRepository,
        MainDataSource, ModelResolver]
})
export class ModelModule {}
