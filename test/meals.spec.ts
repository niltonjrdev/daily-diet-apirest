import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

beforeAll(async () => {
  await app.ready()

  execSync('npm run knex -- migrate:latest')
})

afterAll(async () => {
  await app.close()
})

describe('Meals routes', () => {
  it('should return 404 on unknown route', async () => {
    const response = await request(app.server).get('/route-that-does-not-exist')

    expect(response.status).toBe(404)
  })
})
