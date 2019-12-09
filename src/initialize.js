async function connectDatabase() {
  if (process.env.DISABLE_DATABASE) {
    console.log('DISABLE_DATABASE is set, skipping database connection')
  } else {
    const mongoose = require('mongoose')

    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const database = process.env.DB_DATABASE

    const endpoint = `mongodb+srv://${host}:${port}/${database}`

    await mongoose.connect(endpoint, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
}

async function createServer() {
  const cors = require('cors')
  const express = require('express')
  const path = require('path')
  const fs = require('fs')

  const hostname = process.env.APP_HOSTNAME || 'localhost'
  const port = process.env.APP_PORT || 3000

  const app = express()

  app.use(express.json())
  app.use(cors())

  const baseRoutePath = path.join(__dirname, 'routes')
  fs.readdirSync(baseRoutePath).forEach(filename => {
    if (path.extname(filename) === '.js') {
      app.use(require(path.join(baseRoutePath, filename)))
    }
  })

  app.listen(port, hostname, () => {
    console.log(`Express instance is running at http://${hostname}:${port}`)
  })
}

module.exports = async function initialize() {
  await connectDatabase()
  await createServer()
}
