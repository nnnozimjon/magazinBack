import express from 'express'
import Router from './routes'
import cors from 'cors'
import http from 'http'

// relative paths
import * as Runner from './validators'

const App = express()
const server = http.createServer(App)

App.use(express.json({ limit: '10mb' }))
App.use(express.urlencoded({ extended: true }))
App.use(cors())
App.use(Router)

Runner.validate.database

export default server
