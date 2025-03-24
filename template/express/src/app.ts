import express from 'express'
import routes from './routes'
import { loadEnv } from './utils/env'

// load env
loadEnv()

const port = process.env.SERVER_PORT || 3000
const app = express()

app.use(express.json())
app.use('/', routes)

// @ts-expect-error ignore
app.use((err, req, res, next) => {
  console.error(err.stack)
  if (err.name === 'AssertionError') {
    res.status(500).json({
      message: 'Server Error',
    })
  } else {
    res.status(500).json({
      message: err.message || 'Server Error',
    })
  }
})

app.listen(port, async () => {
  console.log(`app listening on port ${port}`)
})
