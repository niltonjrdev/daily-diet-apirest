import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import cookie from '@fastify/cookie'
import { mealsRoutes } from './routes/meals'

export const app = fastify()

app.register(usersRoutes)

app.register(cookie)

app.register(mealsRoutes)

app.get ('/health', () => {
    return "Status OK"
})