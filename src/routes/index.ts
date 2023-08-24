import express, { Response, Request } from 'express'
import System from '../controllers'
import Api from '../constants'

const Router = express.Router()

Router.get('/', (req: Request, res: Response) => {
<<<<<<< HEAD
  res.send('Development!')
=======
  res.send('Production!')
>>>>>>> 536bbf2 (added index route)
})

export default Router
