import { Bicicleta } from "./bicicleta";

export class Cliente 
{
    bicicletaAlugada!: Bicicleta;
    
    constructor(
        public nome: string,
        public idade: number,
        public cpf: string,
        public alugou: boolean = false,
    ) { }

    aluga(bicicletaAlugada: Bicicleta) : boolean 
    {
        if (!this.alugou) {
            this.alugou = true;
            this.bicicletaAlugada = bicicletaAlugada;
            return true;
        }
        else {
            return false;
        }
    }

    
}