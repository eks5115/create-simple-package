#!/usr/bin/env node

import { program } from 'commander'
import { exec } from './exec'
import path from 'path'
import fs from 'fs-extra'
import { confirm } from '@inquirer/prompts'
import merge from 'deepmerge'

const addWebpack = async (name: string) => {
  await exec(`cp -a ${path.resolve(__dirname, '../template/webpack')}/ ./`)
  await exec('yarn add --dev webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin')
  const packagePath = `./${name}/package.json`
  let packageObject = await fs.readJson(packagePath)
  packageObject = merge(packageObject, {
    "scripts": {
      "serve": "webpack serve --mode development",
      "build": "webpack --mode development",
      "lint": "eslint ."
    }
  })
  await fs.writeJson(packagePath, packageObject, {
    spaces: 2,
  })
}

program
  .argument('name')
  .action(async (name: string) => {
    const isAddWebpack = await confirm({
      message: 'Add webpack',
      validate: value => false
    })

    try {
      if (fs.existsSync(name)) {
        throw new Error(`${name} always exists`)
      }
      // crate project dir
      await exec(`mkdir -p ${name}`)
      await exec('ls', {
        cwd: name,
        stdio: 'ignore'
      })
      await exec(`cp -a ${path.resolve(__dirname, '../template/root')}/ ./`)

      // yarn
      await exec('yarn init -y')
      await exec('yarn add --dev @typescript-eslint/parser@^5.0.0 @typescript-eslint/eslint-plugin@^5.0.0 eslint typescript')
      if (isAddWebpack) {
        await addWebpack(name)
      }

      // git
      await exec('git init -b master')
      await exec('git add ./')
      try {
        await exec('git commit -m "init"', {
          stdio: 'ignore'
        })
      } catch (e) {

      }
    } catch (e) {
      console.error(e)
    }
  })
program.parse()
