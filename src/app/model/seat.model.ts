import { priceType } from "./show.model";

export class Seat {
    constructor(
        public name: string,
        public show_id: number,
        public date : string,
        public price:  priceType
    ) {}
}
