import { NgModule } from "@angular/core";
import { SeatRepository } from "./seat.repository";
import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";
import { MainDataSource } from "./main.datasource.service";
import { HttpClientModule } from "@angular/common/http";
import { ModelResolver } from "./model.resolver";

@NgModule({
    imports: [],
    providers: [ Order, OrderRepository,
        MainDataSource, ModelResolver]
})
export class ModelModule {}
