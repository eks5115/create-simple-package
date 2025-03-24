import dotenv from 'dotenv'

export const loadEnv = (nodeEnv?: string) => {
  if (nodeEnv === 'development' || process.env.NODE_ENV === 'development') {
    dotenv.config({
      path: ['.env', '.env.development', '.env.development.local'],
      override: true
    })
  } else if (nodeEnv === 'production' || process.env.NODE_ENV === 'production') {
    dotenv.config({
      path: ['.env', '.env.production', '.env.production.local'],
      override: true
    })
  } else {
    dotenv.config({
      path: ['.env', '.env.local'],
      override: true
    })
  }
}
