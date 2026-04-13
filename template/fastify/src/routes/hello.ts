import { FastifyInstance } from 'fastify'
import { FastifyPluginOptions } from 'fastify/types/plugin'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions)=> {
  fastify.get('/', async (request, reply) => {
    return 'Hello World!'
  })
}
