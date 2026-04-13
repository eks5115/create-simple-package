import fs from 'fs-extra'
import merge from 'deepmerge'

import app from './app'
import lib from './lib'
import fastify from './fastify'
import express from './express'

export const TEMPLATE: {
  [key: string]: Template
} = {
  app,
  lib,
  fastify,
  express,
}

export const getTemplateOptions = ():TemplateOption[] => {
  return fs.readdirSync(__dirname)
    .filter(item => !['index.ts', 'library.ts'].includes(item))
    .map(item => item.replace(/\.[^/.]+$/, ''))
    .map(item => {
      return {
        name: item,
        value: item,
      } as TemplateOption
    })
}

export const mergePackage = async (context: Context) => {
  const packagePath = `./${context.package.name}/package.json`
  let packageObject = await fs.readJson(packagePath)
  packageObject = merge(packageObject, context.package)
  await fs.writeJson(packagePath, packageObject, {
    spaces: 2,
  })
}
