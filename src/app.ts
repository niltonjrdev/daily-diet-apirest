import fastify from 'fastify'

export const app = fastify()

app.get ('/health', () => {
    return "Status OK"
})