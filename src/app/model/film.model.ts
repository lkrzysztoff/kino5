export class Film {
    constructor(
        public id: number,
        public img: string, //"wakanda_poster.jpg",
        public title: string, //"Black Panther: Wakanda Forever",
        public genre: string,  //"Action, Super hero",
        public length: string, //"130 min",
        public ageRest: string, //"PG-13",
        public description: string, //"T’Challa, król Wakandy, jest śmiertelnie chory. Jego siostra Shuri wierzy, że można go uleczyć za pomocą ziela w kształcie serca, dlatego próbuje syntetycznie je odtworzyć po tym, jak zostało zniszczone przez Killmongera. Jednak nie udaje jej się to, a T’Challa umiera",
        public score: string, //"8/10",
        public director: string, //"Ryan Coogler",
        public actors: string[], //["Maciek", "Janek", "Ktos", "Leszek"],
        public boxOff: number, //200,
        public premier: boolean // true        
        
    ) {}
}
