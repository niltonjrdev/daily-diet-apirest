import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { db } from '../database'
import { checkUserId } from '../middlewares/check-user-id' 

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const userId = randomUUID()

    await db('users').insert({
      id: userId,
      name: 'Usuário padrão',
    })

    reply
      .setCookie('userId', userId, {
        path: '/',
      })
      .status(201)
      .send()
  })

    app.get('/me',{ preHandler: [checkUserId] },async () => {
            return { ok: true }
        },
    )
}
