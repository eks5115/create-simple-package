import { BaseEnv } from './baseEnv'

class Env extends BaseEnv {
  appName: string = ''
  loggerLevel: string = 'debug'
  serverHost: string = 'localhost'
  serverPort: number = 3000
}

const env = Env.getInstance<Env>()

export default env
