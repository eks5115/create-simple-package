import path from 'path'
import { exec } from '@/exec'
import { addEslint, addJest, addTypescript, getTemplatePath } from '@/template/library'

const addApp = async (context: Context) => {
  await exec('pnpm add -D esbuild javascript-obfuscator pkg')
  await exec(`cp -a ${path.join(getTemplatePath(), 'app')}/ ./`)
  context.package.scripts['start'] = 'tsx src/index.ts'
  context.package.scripts['build:esbuild'] = 'tsx esbuild.config.ts'
  context.package.scripts['build:obf'] = 'pnpm build:esbuild && javascript-obfuscator dist/app.esbuild.js --output dist/app.obf.js'
  context.package.scripts['build:pkg'] = 'pnpm build:obf && pkg -t node18-macos-arm64 dist/app.obf.js --output dist/app'
}

export default (async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addApp(context)
}) as Template
