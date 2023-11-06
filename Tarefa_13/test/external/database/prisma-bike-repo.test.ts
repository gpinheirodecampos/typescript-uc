import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"

describe('PrismaBikeRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('adds a bike in the database', async () => {
        const bikeToBePersisted = new Bike(
          'caloi',
          'irada',
          30,
          200,
          15,
          'caloi irada',
          8,
          ['caloi.jpg', 'caloi2.jpg'],
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(bikeId)
        expect(persistedBike.name).toEqual(
          bikeToBePersisted.name
        )
        expect(persistedBike.imageUrls.length).toEqual(2)
    })

    it('removes a bike from the database', async () => {
        const bikeToBePersisted = new Bike(
          'caloi',
          'irada',
          30,
          200,
          15,
          'caloi irada',
          7,
          ['caloi.png', 'caloi2.png'],
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        await repo.remove(bikeId)
        const removedBike = await repo.find(bikeId)
        expect(removedBike).toBeNull()
    })

    it('lists bikes in the database', async () => {
        const bike1 = new Bike(
          'caloi',
          'irada',
          30,
          200,
          15,
          'caloi irada',
          8,
          ['caloi.png', 'caloi2.png'],
        )
        const bike2 = new Bike(
          'caloi',
          'irada',
          30,
          200,
          15,
          'caloi irada',
          8,
          ['caloi.png', 'caloi2.png'],
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.add(bike2)
        const bikeList = await repo.list()
        expect(bikeList.length).toEqual(2)
    })

    it('should update bike availability in the database', async () => {
        const bikeToBePersisted = new Bike(
          'caloi',
          'irada',
          30,
          200,
          15,
          'caloi irada',
          8,
          ['caloi.png', 'caloi2.png'],
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        await repo.updateAvailability(bikeId, false)
        const updatedBike = await repo.find(bikeId)
        expect(updatedBike.available).toBeFalsy()
    })

    it('should update bike location in the database', async () => {
        const bikeToBePersisted = new Bike(
          'caloi',
          'irada',
          30,
          200,
          15,
          'caloi irada',
          8,
          ['caloi.png', 'caloi2.png'],
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        await repo.updateLocation(bikeId, 10.5, 20.5)
        const updatedBike = await repo.find(bikeId)
        expect(updatedBike.location.latitude).toEqual(10.5)
        expect(updatedBike.location.longitude).toEqual(20.5)
    })
})