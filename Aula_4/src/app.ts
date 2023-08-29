import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    users: User[] = [];
    bikes: Bike[] = [];
    rents: Rent[] = [];

    // Metodos
    addUser(user: User) : void {
        if (this.users.some(rUser => { return rUser.email == user.email })) {
            throw new Error('Duplicated user')
        }
        this.users.push(user);
    }
}