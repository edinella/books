import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/src/Ignitor'

sourceMapSupport.install({ handleUncaughtExceptions: false })

const server = new Ignitor(__dirname)
  .httpServer()

server.start()
  .catch(console.error)

// Without it process won't die in container
process.on('SIGINT', () => {
  server.kill(10)
})
