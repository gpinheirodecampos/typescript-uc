import { Correntista } from "./correntista";

export class Conta
{
    // Campos
    saldo: number = 0.0;
    numero: string = "";
    dono: Correntista;

    // Construtor
    constructor(numero: string, dono: Correntista)
    {
        this.numero = numero;
        this.dono = dono;
    }

    // Metodos
    credita(quantia: number): void
    {
        this.saldo += quantia;
    }

    debita(quantia: number): void
    {
        this.saldo -= quantia;
    }
}