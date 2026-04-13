import dotenv, { DotenvConfigOutput } from 'dotenv'

/**
 * env > *.local > .env
 */
export class BaseEnv {
  [key: string]: any;

  private static instance: BaseEnv | null = null

  static getConfigPaths(): string[] {
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'local'
      return ['.env.local', '.env']
    }
    return [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, '.env']
  }
  static getConfig(): DotenvConfigOutput {
    const config = dotenv.config({
      path: this.getConfigPaths(),
    }).parsed ?? {}

    dotenv.populate(process.env as dotenv.DotenvPopulateInput, config)
    return process.env as dotenv.DotenvPopulateInput
  }

  static getInstance<T extends BaseEnv>(): T {
    if (!BaseEnv.instance) {
      const env = new this()
      populate(env, BaseEnv.getConfig())
      BaseEnv.instance = env
    }
    return BaseEnv.instance as T
  }
}

const populate = <T extends BaseEnv>(env: T, config: Record<string, any>): T => {
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      const camelCaseKey = key.toLowerCase().replace(
        /_([a-z])/g,
        (_, letter) => letter.toUpperCase()
      )
      if (Object.prototype.hasOwnProperty.call(env, camelCaseKey)) {
        (env as any)[camelCaseKey] = config[key]
      }
    }
  }
  return env
}
