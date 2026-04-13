import path from 'path'
import { exec } from '@/exec'
import { addEslint, addJest, addTypescript, getTemplatePath } from '@/template/library'

const addExpress = async (context: Context) => {
  await exec('pnpm add express tsconfig-paths dotenv')
  await exec('pnpm add -D @types/express')
  await exec(`cp -a ${path.join(getTemplatePath(), 'express')}/ ./`)
  context.package.scripts['dev'] = 'tsx watch src/app.ts'
  context.package.scripts['serve'] = 'TS_NODE_BASEURL=./dist node -r tsconfig-paths/register dist/app.js'
}

export default (async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addExpress(context)
}) as Template
