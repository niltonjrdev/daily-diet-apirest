import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { db } from '../database'
import { checkUserId } from '../middlewares/check-user-id'
import { request } from 'http'
import { z } from 'zod'

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

  app.get(
    '/meals/:id',
    { preHandler: [checkUserId] },
    async (request, reply) => {
        const getMealParamsSchema = z.object({
        id: z.string().uuid(),
        })

        const { id } = getMealParamsSchema.parse(request.params)

        const userId = request.cookies.userId

        const meal = await db('meals')
        .where({
            id,
            user_id: userId,
        })
        .first()

        if (!meal) {
        return reply.status(404).send({
            error: 'Meal not found',
        })
        }

        return { meal }
    },
)

  app.put(
    '/meals/:id',
    { preHandler: [checkUserId] },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const bodySchema = z.object({
        name: z.string(),
        description: z.string(),
        meal_date_time: z.string(),
        is_on_diet: z.boolean(),
      })

      const { id } = paramsSchema.parse(request.params)
      const { name, description, meal_date_time, is_on_diet } =
        bodySchema.parse(request.body)

      const userId = request.cookies.userId

      const meal = await db('meals')
        .where({
          id,
          user_id: userId,
        })
        .first()

      if (!meal) {
        return reply.status(404).send({
          error: 'Meal not found',
        })
      }

      await db('meals')
        .where({
          id,
          user_id: userId,
        })
        .update({
          name,
          description,
          meal_date_time,
          is_on_diet,
        })

      return reply.status(204).send()
    },
  )


}