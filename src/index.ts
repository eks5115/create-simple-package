#!/usr/bin/env node

import { program } from 'commander'
import { exec } from './exec'
import path from 'path'
import fs from 'fs'

program
  .argument('name')
  .action(async (name) => {
    try {
      if (fs.existsSync(name)) {
        throw new Error(`${name} always exists`)
      }
      // crate project dir
      await exec(`mkdir -p ${name}`)
      await exec(`cp -a ${path.resolve(__dirname, '../template')}/ ./`, {
        cwd: name
      })
      await exec('yarn init -y')
      await exec('yarn add --dev @typescript-eslint/parser@^5.0.0 @typescript-eslint/eslint-plugin@^5.0.0 eslint typescript')
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
