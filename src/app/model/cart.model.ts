import { Injectable } from "@angular/core";
import { Seat } from "./seat.model";

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;
    
    addLine(seat: Seat) {
        this.lines.push(new CartLine( seat ));
        this.recalculate();
    }
    removeLine( showId : number, name: string) {
        let index = this.lines.findIndex(line => ( line.seat.show_id == showId && line.seat.name == name)  );
        this.lines.splice(index, 1);
        this.recalculate();
    }

    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += 1;
            this.cartPrice += l.seat.price.price ;
        })
    }

    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    getUniqueFilms() : any
    {
        var unique : any  = [];
        
        this.lines.forEach( el => {
            let a = unique.filter( (dl : any)  => (dl.seat.show_id == el.seat.show_id && dl.seat.date == el.seat.date));
            if( !a.length) unique.push( el );
        });
        console.log( unique);
        return unique;
    }
    getFilmSeats( show_id : number,date :string) 
    {
         return this.lines.filter( (dl : any)  => (dl.seat.show_id == show_id && dl.seat.date == date));
    }

}

export class CartLine {
    constructor(public seat: Seat ) {}

    get lineTotal() {
        return this.seat.price.price;
    }
}
