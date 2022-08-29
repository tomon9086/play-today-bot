import express from 'express'
import { registerSlashCommands } from './discord'

const PORT = process.env.PORT ?? '8080'

const app = express()

app.get('/ping', (_, res) => {
  res.send('pong')
})

const init = async () => {
  await registerSlashCommands()
}

const tryInit = () =>
  init()
    .then(() => console.log('app initialized'))
    .catch(() => {
      console.log('retrying...')
      setTimeout(() => {
        tryInit()
      }, 1000)
    })

tryInit()

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
