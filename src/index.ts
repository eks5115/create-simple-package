#!/usr/bin/env node

import { program } from 'commander'
import { exec } from './exec'
import path from 'path'

program
  .argument('name')
  .action(async (name) => {
    // crate project dir
    await exec(`mkdir -p ${name}`)
    await exec(`cp -a ${path.resolve(__dirname, '../template')}/ ./`, {
      cwd: name
    })
    await exec('git init')
    await exec('yarn init -y')
    await exec('yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript')
  })
program.parse()
