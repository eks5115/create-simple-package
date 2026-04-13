import { FastifyInstance } from 'fastify'
import { FastifyPluginOptions } from 'fastify/types/plugin'
import hello from './hello'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions)=> {
  fastify.register(hello)
}
