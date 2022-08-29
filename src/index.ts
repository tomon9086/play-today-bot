import express from 'express'
import { isEnv } from './env'

const PORT = isEnv(['production']) ? 80 : 8080

const app = express()

app.get('/ping', (_, res) => {
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
