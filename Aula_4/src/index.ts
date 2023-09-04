// Codigo realizado por Gabriel Pinheiro de Campos, RA 156315, Turma POO Noturno

import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

// Criando bicicletas
const bike1 = new Bike('caloi', 'irada', 123, 500, 500, 'desc', 5, []);
const bike2 = new Bike('oii', 'laa', 123, 500, 500, 'desc', 5, []);

// Criando usuarios
const user = new User('gabs', 'gabs@mail.com', 'daora');
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
const rent1 = Rent.create([], today, twoDaysFromToday, bike1, user);

// Instanciando App e registrando usuarios
const app = new App();
app.registerUser(user);
app.registerUser(user2);

// Registrando bicicletas
var bike1Id = app.registerBike(bike1);
var bike2Id = app.registerBike(bike2);

// Removendo bicicleta
app.removeBike(bike2Id);

// Alugando bicicletas
app.rentBike(bike1Id, 'gabs@email.com', today, sevenDaysFromToday);

console.log('bike1 :>> ', bike1);

// Nao consegui finalizar o metodo rentBike na classe App.
// Problemas ao criar um array s

