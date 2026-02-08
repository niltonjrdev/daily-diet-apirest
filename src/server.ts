import { app } from './app'

const port = Number(process.env.PORT) || 3333

app.listen({
  port,
  host: '0.0.0.0',
}).then(() => {
  console.log(`🚀 Server running on port ${port}`)
})