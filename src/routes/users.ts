import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { db } from '../database'
import { checkUserId } from '../middlewares/check-user-id'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const body = request.body as { name?: string } | undefined
    const name = body?.name || 'User'
    const userId = randomUUID()

    await db('users').insert({
      id: userId,
      name,
    })

    // ✅ CORREÇÃO #1: Cookie com segurança
    reply
      .setCookie('userId', userId, {
        path: '/',
        httpOnly: true,              
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        sameSite: 'lax',             
      })
      .status(201)
      .send()
  })

  app.get(
    '/me',
    { preHandler: [checkUserId] },
    async () => {
      return { ok: true }
    },
  )
}