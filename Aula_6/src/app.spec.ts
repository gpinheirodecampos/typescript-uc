import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
import { UnavailableBikeError } from "./errors/unavailable-bike-error"
import { UserNotFoundError } from "./errors/user-not-found-error"
import { DuplicatedUserError } from "./errors/duplicated-user-error"
import { RentNotFoundError } from "./errors/rent-not-found"

describe('App', () => {
    // Testando registro de usuario duplicado
    it('should throw an expection when user is already registered', async () => {
        const user = new User("pinheiro", "pinheiro@gmail.com", "123");
        const app = new App();
        await app.registerUser(user);
        await expect(app.registerUser(user)).rejects.toThrow(DuplicatedUserError);        
    })

    it('should correctly register a user', async () => {
        const user = new User("pinheiro", "pinheiro@gmail.com", "123");
        const app = new App();
        await expect(app.registerUser(user)).resolves.toEqual(user.id);        
    })

    // Testando findUser
    it('should correctly find a user', async () => {
        const app = new App();
        const user = new User("pinheiro", "pinheiro@gmail.com", "123");
        await app.registerUser(user);
        const usuarioProcurado = app.findUser("pinheiro@gmail.com");
        expect(usuarioProcurado).toEqual(user);
    })

    // Testando erro usuario nao encontrado
    it('should throw an exception when user is not found', () => {
        const app = new App()
        expect(() => {
            app.findUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })

    // Testando autenticacao
    it('should correctly authenticates de users password', async () => {
         const user = new User("pinheiro", "pinheiro@gmail.com", "123");
         const app = new App();
         await app.registerUser(user);
         await expect(app.authenticate('pinheiro@gmail.com', '123')).resolves.toBeTruthy();
     })

    // Testando returnBike
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    // Testando moveBikeTo
    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    // Testando registrar bike não registrada
    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFoundError)
    })

    // Testando rentBike
    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    // Testando bike nao disponivel
    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })

    // Testando RentNotFound
    it('should throw rent not found', () => {
        const app = new App();
        expect(() => {
            app.findRent("uiuiui", "lala")
        }).toThrow(RentNotFoundError);
    })
})