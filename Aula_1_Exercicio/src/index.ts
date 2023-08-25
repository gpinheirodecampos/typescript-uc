import { Cliente } from "./cliente";
import { Bicicleta } from "./bicicleta";
import prompt from 'prompt-sync';

/* Programa criado por Gabriel Pinheiro de Campos, RA: 156315 */ 

// Criando estoque de bicicletas
let bike1 = new Bicicleta("CALOI", "Nova", 700);
let bike2 = new Bicicleta("SENSE", "Usada", 400);
let bike3 = new Bicicleta("OGGI", "Nova", 600);
let bike4 = new Bicicleta("CALOI", "Nova", 1200);
let bike5 = new Bicicleta("CALOI", "Nova", 900);

// Armazenando em uma lista
let listaDeBicicletas: Bicicleta[] = [];
listaDeBicicletas.push(bike1, bike2, bike3, bike4, bike5);

// Cadastrando cliente
let teclado = prompt();
let option: number = 0;

while(option != 9) {
    console.log("+===== Sistema de Aluguel de Bikes =====+");
    console.log("|1. Mostrar estoque de bicicletas       |");
    console.log("|2. Alugar bicicleta                    |");
    console.log("|9. Sair                                |");
    console.log("+=======================================+");

    option = +teclado("Escolha uma opção: ");

    switch (option) {
        case 1:
            // Imprimindo lista de bicicletas
            console.log("+===== Lista de Bicicletas =====+")

            for (let bike of listaDeBicicletas) {
                console.log(bike);
            }

            teclado("");
            break;
        
        case 2:
            // Obtendo dados do cliente
            let nome: string;
            nome = teclado("Digite seu nome: ");
            let idade: number;
            idade = +teclado("Digite sua idade: ");
            let cpf: string;
            cpf = teclado("Digite seu CPF: ");
            const cliente1 = new Cliente(nome, idade, cpf);

            // Realizando o aluguel da bicicleta
            cliente1.aluga(bike1);

            // Removendo a bicicleta da lista
            const index = listaDeBicicletas.findIndex(bike1 => bike1);
            listaDeBicicletas.slice(index, 1);
            console.log("\n");
            break;
    
        default:
            break;
    }
}