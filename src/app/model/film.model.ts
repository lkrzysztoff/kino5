export interface Film {
  
         id: number,
         img: string, //"wakanda_poster.jpg",
         title: string, //"Black Panther: Wakanda Forever",
         genre: string,  //"Action, Super hero",
         length: string, //"130 min",
         ageRest: string, //"PG-13",
         description: string, //"T’Challa, król Wakandy, jest śmiertelnie chory. Jego siostra Shuri wierzy, że można go uleczyć za pomocą ziela w kształcie serca, dlatego próbuje syntetycznie je odtworzyć po tym, jak zostało zniszczone przez Killmongera. Jednak nie udaje jej się to, a T’Challa umiera",
         score: string, //"8/10",
         director: string, //"Ryan Coogler",
         actors: string[], //["Maciek", "Janek", "Ktos", "Leszek"],
         boxOff: number, //200,
         premier: boolean // true          
}
