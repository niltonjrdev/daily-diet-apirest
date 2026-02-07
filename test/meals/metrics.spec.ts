import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('GET /meals', () => {
  let userCookie: string | undefined

  beforeAll(async () => {
    await app.ready()
  })

    beforeEach(async () => {
        const response = await request(app.server)
           .post('/users')
           .send({})
           
        const cookies = response.get('Set-Cookie')
    
        if (!cookies?.[0]) {
            throw new Error('Authentication cookie not set')
        }
    
    userCookie = cookies[0]

    })

    it('should not be able to get metrics without authentication', async () => {
        const response = await request(app.server)
            .get('/meals/metrics')
    
        expect(response.status).toBe(401)
    })

    it('should return metrics for the authenticated user', async () => {
    await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
            name: 'Breakfast',
            description: 'Eggs and toast',
            meal_date_time: '2024-01-01 08:00:00',
            is_on_diet: true,
        })

    await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
            name: 'Lunch',
            description: 'Chicken and rice',
            meal_date_time: '2024-01-01 12:00:00',
            is_on_diet: true,
        })

    await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
            name: 'Snack',
            description: 'Chocolate bar',
            meal_date_time: '2024-01-01 15:00:00',
            is_on_diet: false,
        })

    await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
            name: 'Dinner',
            description: 'Salad',
            meal_date_time: '2024-01-01 19:00:00',
            is_on_diet: true,
        })

    await request(app.server)
        .post('/meals')
        .set('Cookie', userCookie!)
        .send({
            name: 'Late Snack',
            description: 'Yogurt',
            meal_date_time: '2024-01-01 22:00:00',
            is_on_diet: true,
        })

    const response = await request(app.server)
        .get('/meals/metrics')
        .set('Cookie', userCookie!)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            totalMeals: 5,
            mealsOnDiet: 4,
            mealsOffDiet: 1,
            bestSequence: 2,
        })
    })
})