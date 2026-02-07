import { beforeEach, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('POST /meals', () => {
  let userCookie: string | undefined

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    const response = await request(app.server)
      .post('/users')
      .send({})

    userCookie = response.get('Set-Cookie')?.[0]
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

  it('should be able to create a meal when authenticated', async () => {
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
})
