import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { db } from '../database'
import { checkUserId } from '../middlewares/check-user-id'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/meals',
    { preHandler: [checkUserId] },
    async (request, reply) => {
      const userId = request.cookies.userId

      const { name, description, meal_date_time, is_on_diet } =
        request.body as {
          name: string
          description: string
          meal_date_time: string
          is_on_diet: boolean
        }

      await db('meals').insert({
        id: randomUUID(),
        user_id: userId,
        name,
        description,
        meal_date_time,
        is_on_diet,
      })

      return reply.status(201).send()
    },
  )

  app.get(
    '/meals',
    { preHandler: [checkUserId] },
    async (request) => {
        const userId = request.cookies.userId

        const meals = await db('meals')
        .where('user_id', userId)
        .select('*')

        return { meals }
    },
  )

}