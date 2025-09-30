import path from 'path'
import fs from 'fs-extra'
import merge from 'deepmerge'
import { exec } from './exec'
import type { Context } from './types'

const getTemplatePath = () => {
  return path.resolve(__dirname, '../template')
}

export const addTypescript = async (context: Context) => {
  await exec('pnpm add -D typescript ts-node')
  await exec(`cp -a ${path.join(getTemplatePath(), 'typescript')}/ ./`)
  context.package.scripts['build'] = 'pnpm clean && tsc'
}

export const addEslint = async (context: Context) => {
  await exec('pnpm add -D eslint @eslint/js typescript-eslint')
  await exec(`cp -a ${path.join(getTemplatePath(), 'eslint')}/ ./`)
  context.package.scripts['lint'] = 'eslint'
}

export const addJest = async (context: Context) => {
  await exec('pnpm add -D jest @types/jest ts-jest')
  await exec(`cp -a ${path.join(getTemplatePath(), 'jest')}/ ./`)
  context.package.scripts['test'] = 'jest'
}

export const addExpress = async (context: Context) => {
  await exec('pnpm add express tsconfig-paths dotenv')
  await exec('pnpm add -D ts-node-dev @types/express')
  await exec(`cp -a ${path.join(getTemplatePath(), 'express')}/ ./`)
  context.package.scripts['dev'] = 'ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/app.ts'
  context.package.scripts['serve'] = 'TS_NODE_BASEURL=./dist node -r tsconfig-paths/register dist/app.js'
}

export const addWebpack = async (context: Context) => {
  await exec('pnpm add -D webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin copy-webpack-plugin')
  await exec(`cp -a ${path.resolve(__dirname, '../template/webpack')}/ ./`)
  context.package.scripts['serve'] = 'webpack serve --mode development'
  context.package.scripts['build'] = 'webpack --mode development'
}

export const mergePackage = async (context: Context) => {
  const packagePath = `./${context.package.name}/package.json`
  let packageObject = await fs.readJson(packagePath)
  packageObject = merge(packageObject, context.package)
  await fs.writeJson(packagePath, packageObject, {
    spaces: 2,
  })
}

export const libTemplate = async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  context.package.scripts['prepublishOnly'] = 'pnpm lint && pnpm build'
}

export const expressTemplate = async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addExpress(context)
}
