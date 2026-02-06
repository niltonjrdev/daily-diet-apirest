import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Users routes', () => {
  let userCookie: string | undefined

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  it('should be able to create a user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send()

    expect(response.status).toBe(201)

    const cookies = response.get('Set-Cookie')
    expect(cookies).toBeDefined()

    userCookie = cookies![0]
  })

  it('should not be able to access /me without cookie', async () => {
    const response = await request(app.server)
      .get('/me')

    expect(response.status).toBe(401)
  })

  it('should be able to access /me with cookie', async () => {
    const response = await request(app.server)
      .get('/me')
      .set('Cookie', userCookie!)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ ok: true })
  })
})
