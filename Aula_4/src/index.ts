import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike1 = new Bike('caloi', 'irada', 123, 500, 500, 'desc', 5, []);
const bike2 = new Bike('oii', 'laa', 123, 500, 500, 'desc', 5, []);
const user = new User('gabs', 'gabs@mail.com', 'daora');
const today = new Date();
const twoDaysFromToday = new Date();
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const sevenDaysFromToday = new Date();
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);
const rent1 = Rent.create([], today, twoDaysFromToday, bike1, user);
const user2 = new User('Gustavo', 'gu@mail.com', '1234');

const app = new App();
app.registerUser(user);
app.registerUser(user2);
var bike1Id = app.registerBike(bike1);
var bike2Id = app.registerBike(bike2);
app.removeBike(bike1Id);
console.log(app.bikes);

