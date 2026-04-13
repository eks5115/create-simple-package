import { exec } from '@/exec'
import path from 'path'

export const getTemplatePath = () => {
  return path.resolve(__dirname, '../../template')
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

export const addWebpack = async (context: Context) => {
  await exec('pnpm add -D webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin copy-webpack-plugin')
  await exec(`cp -a ${path.resolve(__dirname, '../template/webpack')}/ ./`)
  context.package.scripts['serve'] = 'webpack serve --mode development'
  context.package.scripts['build'] = 'webpack --mode development'
}
