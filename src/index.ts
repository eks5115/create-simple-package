#!/usr/bin/env node

import path from 'path'
import { program } from 'commander'
import { input, select } from '@inquirer/prompts'
import { exec } from '@/exec'
import { getTemplateOptions, mergePackage, TEMPLATE } from '@/template'

program.action(async () => {
  const projectName = await input({
    message: 'Project name',
    required: true,
    default: 'example'
  })

  const template = await select({
    message: 'Template',
    choices: getTemplateOptions(),
  })

  // create context
  const context: Context = {
    package: {
      name: projectName,
      scripts: {
        'clean': 'rm -rf dist',
      }
    }
  }

  try {
    // if (fs.existsSync(name)) {
    //   throw new Error(`${name} always exists`)
    // }
    // crate project dir
    await exec(`mkdir -p ${projectName}`)
    await exec('ls', {
      cwd: projectName,
      stdio: 'ignore'
    })
    await exec(`cp -a ${path.resolve(__dirname, '../template/root')}/ ./`)

    // pnpm
    await exec('npm init -y')

    await TEMPLATE[template](context)

    // merge package.json
    await mergePackage(context)

    // git
    await exec('git init -b master')
    await exec('git add ./')
  } catch (e) {
    console.error(e)
  }
})
program.parse()
