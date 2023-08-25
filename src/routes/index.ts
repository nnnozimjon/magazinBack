import express, { Response, Request } from 'express'
// import System from '../controllers'
// import Api from '../constants'

const Router = express.Router()

Router.get('/', (req: Request, res: Response) => {
  res.send('Production!')
})

export default Router
