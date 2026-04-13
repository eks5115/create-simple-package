import path from 'path'
import fs from 'fs-extra'
import merge from 'deepmerge'
import { exec } from './exec'
import type { Context } from './types'

const getTemplatePath = () => {
  return path.resolve(__dirname, '../template')
}

export const addTypescript = async (context: Context) => {
  await exec('pnpm add -D typescript tsx')
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

export const addLib = async (context: Context) => {
  await exec(`cp -a ${path.join(getTemplatePath(), 'lib')}/ ./`)
  context.package.scripts['start'] = 'tsx src/index.ts'
  context.package.scripts['prepublishOnly'] = 'pnpm lint && pnpm build'
}

export const addFastify = async (context: Context) => {
  await exec('pnpm add fastify tsconfig-paths dotenv pino-pretty')
  await exec(`cp -a ${path.join(getTemplatePath(), 'fastify')}/ ./`)
  context.package.scripts['dev'] = 'tsx watch src/app.ts'
  context.package.scripts['serve'] = 'TS_NODE_BASEURL=./dist node -r tsconfig-paths/register dist/app.js'
}

export const addExpress = async (context: Context) => {
  await exec('pnpm add express tsconfig-paths dotenv')
  await exec('pnpm add -D @types/express')
  await exec(`cp -a ${path.join(getTemplatePath(), 'express')}/ ./`)
  context.package.scripts['dev'] = 'tsx watch src/app.ts'
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
  await addLib(context)
}

export const expressTemplate = async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addExpress(context)
}

export const fastifyTemplate = async (context: Context) => {
  await addTypescript(context)
  await addEslint(context)
  await addJest(context)
  await addFastify(context)
}
