export class Forecast {
    constructor(
        public date: string,
        public temperature: string,
        public icon: string,
        public weekDay: string,
        public desc?: string,
        public humidity?: string,
    ) {}
}
