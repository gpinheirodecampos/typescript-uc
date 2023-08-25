export class Bicicleta
{
    // Campos
    private _id: number;

    constructor(
        public modelo: string,
        public estado: string,
        public preco: number
    ) { 
        this._id = Math.floor(Math.random() * 100);
    }

    getId(): number {
        return this._id;
    }

}