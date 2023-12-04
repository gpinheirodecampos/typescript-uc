import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register user route', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
    })

    it('registers a bike with valid data', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'caloi',
                type: 'nova',
                bodySize: 1,
                maxLoad: 1,
                rate: 4,
                description: 'top',
                ratings: 5,
                available: true,
                latitude: 5,
                longitude: 4
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })
})