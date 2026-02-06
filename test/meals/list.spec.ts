import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('GET /meals', () => {
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

  it('should not be able to list meals without authentication', async () => {
          const response = await request(app.server)
              .get('/meals')
  
          expect(response.status).toBe(401)
    })

  it('should list all meals of the authenticated user', async () => {
          await request(app.server)
              .post('/meals')
              .set('Cookie', userCookie!)
              .send({
                  name: 'Breakfast',
                  description: 'Eggs',
                  meal_date_time: '2024-01-01 08:00:00',
                  is_on_diet: true,
              })
  
          await request(app.server)
              .post('/meals')
              .set('Cookie', userCookie!)
              .send({
                  name: 'Lunch',
                  description: 'Chicken',
                  meal_date_time: '2024-01-01 12:00:00',
                  is_on_diet: true,
              })
  
          const response = await request(app.server)
              .get('/meals')
              .set('Cookie', userCookie!)
  
          expect(response.status).toBe(200)
          expect(response.body.meals).toHaveLength(2)
          expect(response.body.meals.map((m: { name: string }) => m.name)).toEqual(
              expect.arrayContaining(['Breakfast', 'Lunch'])
            )
    })

    it('should not list meals from another user', async () => {
            await request(app.server)
                .post('/meals')
                .set('Cookie', userCookie!)
                .send({
                    name: 'Dinner',
                    description: 'Salad',
                    meal_date_time: '2024-01-01 19:00:00',
                    is_on_diet: true,
                })
    
            const otherUserResponse = await request(app.server)
                .post('/users')
                .send()
    
            const otherUserCookie = otherUserResponse.get('Set-Cookie')?.[0]
    
            await request(app.server)
                .post('/meals')
                .set('Cookie', otherUserCookie!)
                .send({
                    name: 'Late Snack',
                    description: 'Yogurt',
                    meal_date_time: '2024-01-01 22:00:00',
                    is_on_diet: true,
                })
    
            const response = await request(app.server)
                .get('/meals')
                .set('Cookie', userCookie!)
    
            expect(response.status).toBe(200)
            expect(response.body.meals).toHaveLength(1)
            expect(response.body.meals[0].name).toBe('Dinner')
        })

}) 