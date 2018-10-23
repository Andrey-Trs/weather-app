export class TodayWeather {
    constructor(
        public city: string,
        public weatherIcon: string,
        public temperature: number,
        public humidity: number,
        public description: string,
        public country: string
    ) {}
}
