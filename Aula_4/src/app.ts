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

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID();
        this.users.push(user);
        return user.id;
    }

    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date) {
        // recuperar a bike
        const bikeProcurada = this.bikes.find(bike => bike.id == bikeId);
        //console.log(bikeProcurada);
        // this.bikes.forEach(element => {
        //     console.log(element);
        // });

        // recuperar o usuario
        const usuarioProcurado = this.users.find(user => user.email == userEmail);

        // array somente com as reservas para a bike
        const reservas = this.rents.filter(reserva => 
            reserva.bike.id == bikeProcurada.id && !reserva.dateReturned);

        // tentar criar o rent com o array e as informações da reserva
        const novaReserva = Rent.create(reservas, startDate, endDate, bikeProcurada, usuarioProcurado);

        // adicionar a reserva ao array de reservas
        this.rents.push(novaReserva);

        //console.log(novaReserva);
    }
    
    // return bike
    retornarBike(bikeId: string, userEmail: string) {
        const today = new Date();
        const reserva = this.rents.find(reserva =>
            reserva.bike.id == bikeId &&
            reserva.user.email == userEmail &&
            reserva.dateReturned  == undefined &&
            reserva.dateFrom <= today
        )
        if (reserva) {
            reserva.dateReturned = today;
            return
        }
        //console.log(reserva);
    }

    registerBike(bike: Bike) {
        // Gerando ID da bicicleta
        bike.id = crypto.randomUUID();

        // Cadastrando a bicicleta no array e retornando o ID
        this.bikes.push(bike);
        return bike.id;
    }

    removeUser(userId: string) : void {
        // Encontrando o index do usuario que ira ser removido
        var indexUser = this.users.findIndex(user => user.id === userId);
        
        // Se o usuario não existe
        if (indexUser == -1) {
            throw new Error('Bike não encontrada.')
        }

        // Removendo
        this.bikes.splice(indexUser, 1);
    }
}