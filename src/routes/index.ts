import express from 'express'

const Router = express.Router()

Router.get('/', () => {
  console.log('got route')
})

export default Router
