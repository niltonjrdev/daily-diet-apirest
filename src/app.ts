import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import cookie from '@fastify/cookie'
import { mealsRoutes } from './routes/meals'
import { ZodError, z } from 'zod'


export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: 'Invalid request data',
      issues: z.treeifyError(error),
    })
  }

  return reply.status(500).send({
    error: 'Internal Server Error',
  })
})


app.register(usersRoutes)
app.register(cookie)
app.register(mealsRoutes)

app.get ('/health', () => {
    return "Status OK"
})

