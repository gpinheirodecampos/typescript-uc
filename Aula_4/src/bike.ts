import { Localizacao } from "./localizacao";

export class Bike
{
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public available: boolean,
        public ratings: number,
        public localizacao: Localizacao = new Localizacao(0.0, 0.0),
        public id?: string
     ) { }

}