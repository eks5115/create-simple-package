import path from 'path'
import { exec } from '@/exec'
import { addEslint, addJest, addTypescript, getTemplatePath } from '@/template/library'

const addFastify = async (context: Context) => {
  await exec('pnpm add fastify tsconfig-paths dotenv pino-pretty')
  await exec(`cp -a ${path.join(getTemplatePath(), 'fastify')}/ ./`)
  context.package.scripts['dev'] = 'tsx watch src/app.ts'
  context.package.scripts['serve'] = 'TS_NODE_BASEURL=./dist node -r tsconfig-paths/register dist/app.js'
}

export const fastifyTemplate = async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addFastify(context)
}

export default (async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addFastify(context)
}) as Template
