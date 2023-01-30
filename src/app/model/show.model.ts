export interface priceType {
    type: string,
    price: number,
  }
export class Show {
    constructor(
        public id: number, //0,
        public hour: string, //"12.30",
        public screen: string, //"B", 
        public reservedSeats: string[], //["A3", "C4", "H5"],
        public priceList: priceType[],
        public filmId: number, //0
        ) {}
}
