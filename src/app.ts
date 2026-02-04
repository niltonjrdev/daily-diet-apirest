import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(usersRoutes)

app.register(cookie)

app.get ('/health', () => {
    return "Status OK"
})