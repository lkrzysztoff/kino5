export interface Cart {
    showId:number;
    tickets:Partial<{ ticketType: string;}> | {},
    seat:string,
}