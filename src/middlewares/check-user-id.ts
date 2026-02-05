// Deve ser possível identificar o usuário entre as requisições = Ok

import type { FastifyRequest, FastifyReply } from 'fastify'

export async function checkUserId(request: FastifyRequest, reply: FastifyReply,) {
  const userId = request.cookies.userId

  if (!userId) {
    return reply.status(401).send({
      error: 'User not authenticated',
    })
  }
}
