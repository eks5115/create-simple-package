import path from 'path'
import { exec } from '@/exec'
import { addEslint, addJest, addTypescript, getTemplatePath } from '@/template/library'

const addLib = async (context: Context) => {
  await exec(`cp -a ${path.join(getTemplatePath(), 'lib')}/ ./`)
  context.package.scripts['start'] = 'tsx src/index.ts'
  context.package.scripts['prepublishOnly'] = 'pnpm lint && pnpm build'
}

export default (async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addLib(context)
}) as Template
