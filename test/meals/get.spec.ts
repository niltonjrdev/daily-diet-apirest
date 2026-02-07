import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('GET /meals/:id', () => {
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

    userCookie = response.get('Set-Cookie')?.[0]
  })

    it('should not be able to get a meal without authentication', async () => {
        const response = await request(app.server)
            .get('/meals/00000000-0000-0000-0000-000000000000')
  
        expect(response.status).toBe(401)
    })

    it('should return 404 when trying to get a non-existing meal', async () => {
        const response = await request(app.server)
            .get('/meals/00000000-0000-0000-0000-000000000000')
            .set('Cookie', userCookie!)
    
        expect(response.status).toBe(404)
    })

    it('should not be able to get a meal from another user', async () => {
        const createResponse = await request(app.server)
            .post('/meals')
            .set('Cookie', userCookie!)
            .send({
                name: 'Lunch',
                description: 'Chicken',
                meal_date_time: '2024-01-01 12:00:00',
                is_on_diet: true,
            })
    
        expect(createResponse.status).toBe(201)
    
        const listResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userCookie!)
    
        const mealId = listResponse.body.meals[0].id
    
        const otherUserResponse = await request(app.server)
            .post('/users')
            .send()
    
        const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]
    
        const response = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Cookie', otherUserCookie!)
    
        expect(response.status).toBe(404)
    })

    it('should be able to get a specific meal of the authenticated user', async () => {
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
 
        const mealId = listResponse.body.meals[0].id
 
        const response = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Cookie', userCookie!)
 
            expect(response.status).toBe(200)
            expect(response.body.meal).toEqual(
                expect.objectContaining({
                id: mealId,
                name: 'Dinner',
            })
        )
    })
}) 