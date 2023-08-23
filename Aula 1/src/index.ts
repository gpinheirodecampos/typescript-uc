import { Correntista } from "./correntista";
import { Conta } from "./conta";

const gabriel = new Correntista('Gabriel', '12345-671');

const contaGabriel = new Conta('123', gabriel);

contaGabriel.credita(200);

let gabs: Correntista = new Correntista('ga', '1');

console.log('gabriel :>> ', gabriel);