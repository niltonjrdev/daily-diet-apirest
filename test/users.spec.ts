import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Users routes', () => {
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

    expect(cookies?.[0]).toContain('userId=')
  })
})
