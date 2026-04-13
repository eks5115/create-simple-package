import Fastify from 'fastify'
import routes from './routes'
import env from './utils/env'

const port = Number.parseInt(process.env.SERVER_PORT || '3000')
const app = Fastify({
  logger: {
    level: env.loggerLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:yyyy-mm-dd"T"HH:MM:ss.lo',
        colorize: true,
      }
    }
  }
})

app.register(routes)

app.listen({
  host: env.serverHost,
  port: env.serverPort,
}, () => {
})
