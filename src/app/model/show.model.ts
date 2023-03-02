export interface priceType {
    type: string,
    price: number,
  }
export interface Show {
    
         id: number, //0,
         hour: string, //"12.30",
         screen: string, //"B", 
         reservedSeats: string[], //["A3", "C4", "H5"],
         priceList: priceType[],
         filmId: number, //0
       
}
