import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'


describe('Meals routes', () => {
    let userCookie: string | undefined

    beforeAll(async () => {
    await app.ready()
    })

     afterAll(async () => {
    await app.close()
     })

    beforeEach(async () => {
    const response = await request(app.server)
        .post('/users')
        .send()

     const cookies =  response.get('Set-Cookie')
     userCookie = cookies?.[0]
    })

    it('should allow access to protected routes with a valid user', async () => {
        expect(userCookie).toBeDefined()

    const response = await request(app.server)
      .get('/me')
      .set('Cookie', userCookie!)

    expect(response.status).toBe(200)
    })


    it('should not be able to create a meal without authentication', async () => {
    const response = await request(app.server)
        .post('/meals')
        .send({
        name: 'Lunch',
        description: 'Chicken and rice',
        meal_date_time: '2024-01-01 12:00:00',
        is_on_diet: true,
        })

    expect(response.status).toBe(401)
    })

    it('should not be able to create a meal without authentication', async () => {
    const response = await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
        name: 'Lunch',
        description: 'Chicken and rice',
        meal_date_time: '2024-01-01 12:00:00',
        is_on_diet: true,
        })

    expect(response.status).toBe(201)
    })

    it('should list the created meal for the authenticated user', async () => {
    await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
        name: 'Dinner',
        description: 'Salad',
        meal_date_time: '2024-01-01 19:00:00',
        is_on_diet: true,
        })

    const listResponse = await request(app.server)
        .get('/meals')
        .set('Cookie', userCookie!)

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.meals).toHaveLength(1)
    expect(listResponse.body.meals[0].name).toBe('Dinner')
    })


})
 


