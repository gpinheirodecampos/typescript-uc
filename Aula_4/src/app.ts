import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

import crypto from "crypto"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        this.users.push(user)
    }

    // register bike
    // remove bike
    // rent bike
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date) {
        // recuperar a bike
        // recuperar o usuario
        // array somente com as reservas para a bike
        // tentar criar o rent com o array e as informações da reserva
        // adicionar a reserva ao array de reservas
    }
    // return bike

    registerBike(bike: Bike) {
        // Gerando ID da bicicleta
        bike.id = crypto.randomUUID();

        // Cadastrando a bicicleta no array
        this.bikes.push(bike);
        return bike.id;
    }

    removeBike(bikeId: string) : void {
        // Encontrando o index da bicicleta que ira ser removida
        var indexBike = this.bikes.findIndex(bike => bike.id === bikeId);
        
        // Se a bike não existe
        if (indexBike == -1) {
            throw new Error('Bike não encontrada.')
        }

        // Removendo
        this.bikes.splice(indexBike, 1);
    }
}