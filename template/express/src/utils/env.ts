import dotenv from 'dotenv'
import fs from 'fs'

const mergeConfig = (configs: string[]) => {
  let config = {}
  for (const item of configs) {
    if (!fs.existsSync(item)) continue
    config = { ...config, ...dotenv.parse(fs.readFileSync(item)) }
  }
  return config
}

export const loadEnv = (nodeEnv?: string) => {
  let config = {}
  if (nodeEnv === 'development' || process.env.NODE_ENV === 'development') {
    config = mergeConfig(['.env', '.env.development', '.env.development.local'])
  } else if (nodeEnv === 'test' || process.env.NODE_ENV === 'test') {
    config = mergeConfig(['.env', '.env.test', '.env.test.local'])
  } else if (nodeEnv === 'pre' || process.env.NODE_ENV === 'pre') {
    config = mergeConfig(['.env', '.env.pre', '.env.pre.local'])
  } else if (nodeEnv === 'production' || process.env.NODE_ENV === 'production') {
    config = mergeConfig(['.env', '.env.production', '.env.production.local'])
  } else {
    process.env.NODE_ENV = 'local'
    config = mergeConfig(['.env', '.env.local'])
  }
  dotenv.populate(process.env as dotenv.DotenvPopulateInput, config)
}
