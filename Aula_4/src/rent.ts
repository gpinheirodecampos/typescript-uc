import { Bike } from "./bike";
import { User } from "./user";

export class Rent
{
    constructor(
        public bike: Bike,
        public user: User,
        public dateFrom: Date,
        public dateTo: Date,
        public dateReturned?: Date
    ) {}

    // Metodos
    static canRent(rents: Rent[], startDate: Date, endDate: Date): boolean
    {
        for (const rent of rents) {
            if (startDate <= rent.dateTo && endDate >= rent.dateFrom) {
                return false;
            }
        }
        return true;
    }

    static create(rents: Rent[], startDate: Date, endDate: Date, bike: Bike, user: User): Rent
    {
        const canCreate = Rent.canRent(rents, startDate, endDate);
        if (canCreate) {
            return new Rent(bike, user, startDate, endDate);
        }
        throw new Error('Overlapping dates.');
    }
}