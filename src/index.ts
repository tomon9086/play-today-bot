import express from 'express'

const PORT = process.env.PORT ?? '8080'

const app = express()

app.get('/ping', (_, res) => {
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
