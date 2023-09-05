// Codigo realizado por Gabriel Pinheiro de Campos, RA 156315, Turma POO Noturno

import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

// Criando bicicletas
const bike1 = new Bike('caloi', 'irada', 123, 500, 500, 'desc', 5, []);
const bike2 = new Bike('oii', 'laa', 123, 500, 500, 'desc', 5, []);

// Criando usuarios
const user1 = new User('gabs', 'gabs@mail.com', 'daora');
const user2 = new User('Gustavo', 'gu@mail.com', '1234');

// Criando constantes dos dias
const today = new Date();
const twoDaysFromToday = new Date();
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const sevenDaysFromToday = new Date();
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);

// Criando primeiro aluguel de bicicleta
//const rent1 = Rent.create([], today, twoDaysFromToday, bike1, user1);

// Instanciando App e registrando usuarios
const app = new App();
var user1Id = app.registerUser(user1);
var user2Id = app.registerUser(user2);

// Registrando bicicletas
var bike1Id = app.registerBike(bike1);
var bike2Id = app.registerBike(bike2);

// Removendo usuario
app.removeUser(user1Id);

// Alugando bicicletas
app.rentBike(bike2Id, 'gu@mail.com', today, sevenDaysFromToday);
console.log('Antes do retorno', app.rents);

app.retornarBike(bike2Id, user2.email);
console.log('Depois do retorno', app.rents);

//console.log('bike2 :>> ', bike1);

// Programa atualizado com as correcoes vistas durante a aula

