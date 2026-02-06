import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'


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
})
 


